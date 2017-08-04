import React from 'react'
import {connect} from 'react-redux'
import {parseDicom} from 'dicom-parser'
import * as actionCreators from '../action_creators'
import {uploadFile} from '../data-interface'

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
			let width = dataSet.uint16('x00280011')
      let height = dataSet.uint16('x00280010')
			let pixelDataElement = dataSet.elements.x7fe00010
			let pixelData = new Uint8Array(dataSet.byteArray.buffer,
        pixelDataElement.dataOffset, pixelDataElement.length)
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
    let content = {
      disease: this.state.disease,
      prescription: this.state.prescription,
      description: this.state.description
    }

    if (this.state.dicomFile !== null) {
      uploadFile(this.state.dicomFile, (e, r) => {
        if (e) {
          alert('Failed to save DICOM on IFPS: ' + e)
          this.setState({requested: false})
          return
        }

        content.dicomFileHash = r

        this.uploadHashToBlockchain(this.state.patientEmail, content, (e, r) => {
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
      this.uploadHashToBlockchain(this.state.patientEmail, content, (e, r) => {
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
    }
  }

  uploadHashToBlockchain(patientEmail, content, next) {
    let web3 = this.props.web3
    web3.personal.unlockAccount(web3.eth.coinbase, "")

    this.props.contracts.ctrMap.get(patientEmail, {from: web3.eth.coinbase}, (e, r) => {
      if (e) {return next(e)}

      if (r === '0x0000000000000000000000000000000000000000') {
        return next(new Error('Cannot find a controller for the user account'))
      }

      var patientControllerAddr = r
      console.log('Controller: ' + patientControllerAddr)

      let patientController = this.props.contracts.Controller.at(patientControllerAddr)
      let patientAccount = patientController.getProxy()

      fetch('http://localhost:3000/history', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patient: {
            email: patientEmail,
            account: patientAccount,
          },
          author: {
            email: this.props.email,
            account: this.props.account,
            priKey: this.props.priKey
          },
          content
        })
      })
      .then((r) => r.json())
      .then((o) => {
        console.log(o)
        return next(null, o)
      })
      .catch((error) => {
        return next(error)
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
            <div className='form-group'>
              <label>Patient's Email Address</label>
              <input type='text'
                id='patientEmail'
                className='form-control'
                placeholder="Patient's Email Address"
                value={this.state.patientEmail}
                onChange={event => this.setState({patientEmail: event.target.value})}
              />
            </div>
            <div className='form-group'>
              <label>Disease Name</label>
              <input type='text'
                id='diseaseName'
                className='form-control'
                placeholder='Disease'
                value={this.state.disease}
                onChange={event => this.setState({disease: event.target.value})}
              />
            </div>
            <div className='form-group'>
              <label>Prescription</label>
              <textarea className='form-control'
                id='prescription'
                placeholder="Prescription"
                value={this.state.prescription}
                onChange={event => this.setState({prescription: event.target.value})} />
            </div>
            <div className='form-group'>
              <label>Detailed Description</label>
              <textarea className='form-control'
                id='description'
                placeholder="Description"
                value={this.state.description}
                onChange={event => this.setState({description: event.target.value})} />
            </div>
            <div className='form-group'>
              <label>Appending Image (DICOM)</label>
              <input type='file'
                accept='.dcm'
                id='dicomFile'
                className='form-control'
                ref={(input) => {this.fileUpload = input}}
                onChange={(e) => this.handleImageChange(e)} />
                <canvas id='image' ref={(canvas) => {this.canvas = canvas}} />
            </div>
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
