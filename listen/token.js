const wallet = require('./wallet')

const { ethers } = require('ethers')

const MyTokenJson = require('../artifacts/contracts/MyToken.sol/MyToken.json')

const dotenv = require('dotenv')

dotenv.config({path:"./listen/.env"})


const { Pool } = require('pg')

const pool = new Pool(
  {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  }
)



function wssConnect(tokenAddr, index) {
  let _wallet = wallet.wssMnemonicWallet(index)
}



//监听transfer事件,只读
async function approveEvent(tokenAddr) {
  let provider = new ethers.providers.WebSocketProvider('ws://127.0.0.1:7545/')
  let contract = new ethers.Contract(tokenAddr, MyTokenJson.abi, provider)
  console.log(process.env.PGUSER)

  contract.on('Transfer', async (owner,spender,amount,event) => {
    // event.txHash -> blockNo -> blockTime
    
    let blocknumber = null
  
    let txhash = event.transactionHash
    provider.getTransaction(txhash).then((tx)=>{
      
      // console.log(timestamp)
      blocknumber = tx.blockNumber
      return provider.getBlock(blocknumber);

    }).then((r) =>{

      console.log("blocknumber="+blocknumber+";timeStamp="+r.timestamp)


      insertTx(owner, spender, amount/10**4, txhash, blocknumber,r.timestamp)
    })
    
    // amount 为 BigNumber
    console.log('ower=' + owner + ';spender=' + spender + ';amount=' + amount)
  })
}

async  function insertTx(owner, spender, amount,txhash,blocknumber,blockTime) {


  
  let client = await pool.connect()
  // console.log(client)
  try {
     await client.query("insert into transactions(tx_from,tx_to,value,tx_hash,block_number,block_timestamp) values($1,$2,$3,$4,$5,$6)",
      [owner,spender,amount,txhash,blocknumber,blockTime]);
  } catch (error) {
    console.log(error)    
  }
  await client.release();
}






module.exports = {
  // balanceOf,
  // allowance,
  // decimals,
  // approve,
  // transfer,
  // transferFrom,
  approveEvent
}
