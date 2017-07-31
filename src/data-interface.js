var ipfsAPI = require('ipfs-api')
const concat = require('concat-stream')

// connect to ipfs daemon API server
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})

export function upload(data, fileName, callback) {
  if (typeof data === 'object') {
    data = JSON.stringify(data)
  }
  const arr = []
  const filePair = {
    path: fileName,
    content: data
  }

  console.log('Data to upload to IPFS: ' + data)
  console.log('IPFS file path: ' + fileName)

  arr.push(filePair)
  ipfs.files.add(arr, (e, r) => {
    if (e) {return callback(e)}
    console.log('IPFS Result: ' + r)
    let file = r[0]
    callback(null, file.hash)
  })
}

export function uploadFile(data, callback) {
  let ipfsId
  const buffer = Buffer.from(data)
  ipfs.files.add(buffer)
  .then((r) => {
    ipfsId = r[0].hash
    console.log('IPFS Hash: ' + ipfsId)
    callback(null, ipfsId)
  })
}

export function get(hash, type='string', callback) {
  ipfs.files.get(hash, (err, stream) => {
    if (stream === undefined) {
      console.log(err)
      callback(err, '')
    } else {
      stream.on('data', (file) => {
        file.content.pipe(concat((content) => {
          let result
          switch (type) {
            case 'binary':
              result = content
              break
            case 'object':
              result = JSON.parse(content.toString())
              break
            case 'string':
            default:
              result = content.toString()
          }
          callback(err, result)
        }))
      })
    }
  })
}
