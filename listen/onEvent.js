const token = require('./token.js')

const tokenAddr = '0xcd0bDA09622FeaE8AA76b3ec841194b78dB57F49'

token.approveEvent(tokenAddr)
console.log('正在监听事件中........')
