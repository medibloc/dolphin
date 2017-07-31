import React from 'react'
import {connect} from 'react-redux'
import {parseDicom} from 'dicom-parser'
import * as actionCreators from '../action_creators'
import {upload, uploadFile} from '../data-interface'
const etx = require('ethereumjs-tx')

export class Main extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      patientEmail: '',
      disease: '',
      prescription: '',
      description: '',
      requested: false,
      dicomFile: null
    }
  }

  handleImageChange(e) {
    const reader = new FileReader()
    const file = e.target.files[0]

    let canvas = this.canvas

    reader.onload = (e) => {
      this.setState({dicomFile: e.target.result})

      let dicomArray = new Uint8Array(e.target.result)
			let dataSet = parseDicom(dicomArray)
			let width = dataSet.uint16('x00280011'), height = dataSet.uint16('x00280010')
			let pixelDataElement = dataSet.elements.x7fe00010
			let pixelData = new Uint8Array(dataSet.byteArray.buffer, pixelDataElement.dataOffset, pixelDataElement.length)
			canvas.width = width
			canvas.height = height
			var context = canvas.getContext('2d')
			let imageData = context.getImageData(0, 0, width, height)
			let data = imageData.data
			for (let i = 3, k = 0 ; i < data.byteLength ; i=i+4, k=k+2) {
				let result = ((pixelData[k + 1] & 0xFF) << 8) | (pixelData[k] & 0xFF)
				result = (result & 0xFFFF) >> 8
				data[i] = 255-result
			}
			context.putImageData(imageData, 0, 0)
			canvas.style.display = 'block'
    }

    reader.readAsArrayBuffer(file)
  }

  isFormFilled() {
    return (this.state.patientEmail.length > 0 && this.state.disease.length > 0 &&
      this.state.prescription.length > 0 && this.state.description.length > 0)
  }

  uploadHistory() {
    this.setState({requested: true})
    let data = {
      disease: this.state.disease,
      prescription: this.state.prescription,
      description: this.state.description
    }

    if (this.state.dicomFile === null) {
      let fileName = 'mbh_' + this.state.patientEmail + '_' + Date.now() + '.json'
      upload(data, fileName, (e, r) => {
        if (e) {
          alert('Failed to save data on IPFS: ' + e)
          this.setState({requested: false})
          return
        }

        let dataHash = r
        this.uploadHashToBlockchain(this.state.patientEmail, dataHash, (e, r) => {
          if (e) {
            alert('Error occurred: ' + e)
            this.setState({requested: false})
            return
          }

          console.log('Data upload succeeded: ' + r)
          this.setState({
            patientEmail: '',
            disease: '',
            prescription: '',
            description: '',
            requested: false,
            dicomFile: null
          })
        })
      })
    } else {
      uploadFile(this.state.dicomFile, (e, r) => {
        if (e) {
          alert('Failed to save DICOM on IFPS: ' + e)
          this.setState({requested: false})
          return
        }

        data.dicomFileHash = r
        let fileName = 'mbh_' + this.state.patientEmail + '_' + Date.now() + '.json'
        upload(data, fileName, (e, r) => {
          if (e) {
            alert('Failed to save data on IPFS: ' + e)
            this.setState({requested: false})
            return
          }

          let dataHash = r
          this.uploadHashToBlockchain(this.state.patientEmail, dataHash, (e, r) => {
            if (e) {
              alert('Error occurred: ' + e)
              this.setState({requested: false})
              return
            }

            console.log('Data upload succeeded: ' + r)
            this.setState({
              patientEmail: '',
              disease: '',
              prescription: '',
              description: '',
              requested: false,
              dicomFile: null
            })
          })
        })
      })
    }
  }

  uploadHashToBlockchain(patientEmail, ipfsHash, next) {
    let web3 = this.props.web3
    web3.personal.unlockAccount(web3.eth.coinbase, "")

    console.log('IPFS Hash got: ' + ipfsHash)

    this.props.contracts.ctrMap.get(this.props.email, {from: web3.eth.coinbase}, (e, r) => {
      if (e) {return next(e)}

      if (r === '0x0000000000000000000000000000000000000000') {
        return next(new Error('Cannot find a controller for the user account'))
      }

      var controllerAddr = r
      console.log('Controller: ' + controllerAddr)

      let controller = this.props.contracts.Controller.at(controllerAddr)

      this.props.contracts.historyMap.get(patientEmail, (e, r) => {
        if (e) {return next(e)}

        let historyContract = this.props.contracts.History.at(r)

        let historyUpdateData = historyContract.update.getData(ipfsHash)

        let controllerForwardData = controller.forward.getData(historyContract.address, 0x00, historyUpdateData)
        let keyBuffer = new Buffer(this.props.priKey, 'hex')

        let rawTx = {
          data: controllerForwardData,
          nonce: web3.toHex(web3.eth.getTransactionCount(this.props.account)),
          to: controllerAddr.toString(),
          from: this.props.account,
          gasPrice: web3.toHex(web3.eth.gasPrice),
          gasLimit: '0x47E7C4',
          value: '0x00'
        }

        var tx = new etx(rawTx)
        tx.sign(keyBuffer)

        var serializedTx = tx.serialize()
        var stx = '0x' + serializedTx.toString('hex')

        console.log('Signed tx: ' + stx)
        console.log('Type of stx: ' + typeof stx)

        var gasEstimate = web3.toWei(0.2, 'ether')

        web3.eth.sendTransaction({
          from: web3.eth.coinbase,
          to: this.props.account,
          value: gasEstimate
        }, (e, r) => {
          if (e) {
            console.log('Error while transfering gas fee to user: ' + e)
            return next(e)
          }

          if (e) {
            console.log('Error while transfering gas fee to controller: ' + e)
            return next(e)
          }

          let controllerForwarded = controller.Forwarded({data: historyUpdateData})
          controllerForwarded.watch((e, r) => {
            if (e) {
              console.log('********** [Controller] <<<Error>>> occurred in forwarding: ' + e)
            } else {
              console.log('********** [Controller] Fowarding result: ' + r)
            }
            controllerForwarded.stopWatching()
          })

          var ret = {}
          controller.getProxy((e, r) => {
            let proxy = this.props.contracts.ProxyContract.at(r)
            let forwarded = proxy.Forwarded({data: historyUpdateData})
            forwarded.watch((e, r) => {
              if (e) {
                console.log('********** [Proxy] <<<Error>>> occurred in forwarding: ' + e)
                return next(e)
              } else {
                console.log('********** [Proxy] Fowarding result: ' + r)
              }
              forwarded.stopWatching()
              return next(null, ret)
            })

            web3.eth.sendRawTransaction(stx, (e, r) => {
              if (e) {
                console.log('Error while processing update transaction: ' + e)
                return next(e)
              }
              console.log('Transaction Hash: ', r)

              ret.tx = r
            })
          })
        })
      })
    })
  }

  componentDidMount() {
    if (this.props.contracts.ctrMap === undefined) {
      this.props.history.push('/setup')
    } else if (this.props.loggedIn !== true) {
      this.props.history.push('/login')
    }
  }

  render() {
    if (this.state.requested === true) {
      return (
        <div className='container'>
          <div className='col-md-6' style={{display: 'flex'}}>
            <div style={{flex: 1, fontSize: '32px'}}>
              Uploading data...
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='container'>
          <div className='col-md-6 col-md-offset-3'>
            <input type='text'
              className='form-control'
              placeholder="Patient's Email Address"
              value={this.state.patientEmail}
              onChange={event => this.setState({patientEmail: event.target.value})}
            />
            <input type='text'
              className='form-control'
              placeholder='Disease'
              value={this.state.disease}
              onChange={event => this.setState({disease: event.target.value})}
            />
            <textarea className='form-control'
              placeholder="Prescription"
              value={this.state.prescription}
              onChange={event => this.setState({prescription: event.target.value})} />
            <textarea className='form-control'
              placeholder="Description"
              value={this.state.description}
              onChange={event => this.setState({description: event.target.value})} />
            <input type='file'
              className='form-control'
              ref={(input) => {this.fileUpload = input}}
              onChange={(e) => this.handleImageChange(e)} />
            <canvas id='image' ref={(canvas) => {this.canvas = canvas}} />
            <button className='btn btn-primary'
              disabled={!this.isFormFilled()}
              onClick={() => this.uploadHistory()}
              >Upload</button>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.get('loggedIn'),
    contracts: state.get('contracts').toJS(),
    web3: state.get('web3'),
    account: state.get('account'),
    email: state.get('email'),
    priKey: state.get('priKey'),
  }
}

export const MainContainer = connect(
  mapStateToProps,
  actionCreators
)(Main)

export default Main
