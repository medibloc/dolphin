import {fromJS} from 'immutable'
const Web3 = require('web3')

const abi = {
  CtrMap: [{"constant":false,"inputs":[{"name":"email","type":"string"},{"name":"controller","type":"address"}],"name":"update","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"email","type":"string"}],"name":"get","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"}],
  HistoryMap: [{"constant":false,"inputs":[{"name":"email","type":"string"},{"name":"history","type":"address"}],"name":"update","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"email","type":"string"}],"name":"get","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"}],
  Profiles: [{"constant":false,"inputs":[{"name":"hash","type":"string"}],"name":"update","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"profiles","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"}],
  Doctors: [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"lastTimeVerified","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isQualified","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"approve","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"},{"indexed":false,"name":"time","type":"uint256"}],"name":"Approved","type":"event"}],
  MediBlocToken: [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"decimalUnits","type":"uint8"},{"name":"tokenSymbol","type":"string"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"}],
  Controller: [{"constant":false,"inputs":[],"name":"getVersion","outputs":[{"name":"version","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_user","type":"address"}],"name":"changeUser","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"recoveryAddr","type":"address"},{"name":"proxyAddr","type":"address"}],"name":"initialize","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getRecovery","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getUser","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getProxy","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"destination","type":"address"},{"name":"value","type":"uint256"},{"name":"data","type":"bytes"}],"name":"forward","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_user","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"destination","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"data","type":"bytes"}],"name":"Forwarded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"user","type":"address"}],"name":"Initialized","type":"event"}],
  ProxyContract: [{"constant":false,"inputs":[{"name":"_owner","type":"address"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"destination","type":"address"},{"name":"value","type":"uint256"},{"name":"data","type":"bytes"}],"name":"forward","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"controllerAddr","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"destination","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"data","type":"bytes"}],"name":"Forwarded","type":"event"}],
  History: [{"constant":false,"inputs":[{"name":"dataHash","type":"string"}],"name":"update","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getAll","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"isOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"get","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"proxy","type":"address"}],"payable":false,"type":"constructor"}]
}

export function setupContracts(state, addresses) {
  var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

  const CtrMap = web3.eth.contract(abi.CtrMap)
  const ctrMap = CtrMap.at(addresses.ctrMap)

  const HistoryMap = web3.eth.contract(abi.HistoryMap)
  const historyMap = HistoryMap.at(addresses.historyMap)

  const Profiles = web3.eth.contract(abi.Profiles)
  const profiles = Profiles.at(addresses.profiles)

  const Doctors = web3.eth.contract(abi.Doctors)
  const doctors = Doctors.at(addresses.doctors)

  const MediBlocToken = web3.eth.contract(abi.MediBlocToken)
  const mediBlocToken = MediBlocToken.at(addresses.mediBlocToken)

  const Controller = web3.eth.contract(abi.Controller)
  const ProxyContract = web3.eth.contract(abi.ProxyContract)
  const History = web3.eth.contract(abi.History)

  return state.set('web3', web3).set('contracts', fromJS({
    ctrMap,
    historyMap,
    profiles,
    doctors,
    mediBlocToken,
    Controller,
    ProxyContract,
    History
  }))
}

// function compile(contract, imported) {
//   let output = undefined
//
//   if (imported === undefined || imported === null) {
//     const input = fs.readFileSync('../../cameleon/contracts/' + contract + '.sol')
//     output = solc.compile(input.toString(), 1)
//     var findContract = ':' + contract
//   } else {
//     let inputs = {
//       [imported + '.sol']: fs.readFileSync('../../cameleon/contracts/' + imported + '.sol').toString(),
//       [contract + '.sol']: fs.readFileSync('../../cameleon/contracts/' + contract + '.sol').toString()
//     }
//     output = solc.compile({sources: inputs}, 1)
//     var findContract = contract + '.sol:' + contract
//   }
//   if (output.errors !== undefined) {
//     console.log('Compile error for ' + contract + ': ' + output.errors)
//   } else {
//     console.log('Just compiled ' + contract)
//   }
//   const abi = JSON.parse(output.contracts[findContract].interface)
//   const bytecode = output.contracts[findContract].bytecode
//
//   return {abi: abi, bytecode: '0x' + bytecode}
// }
