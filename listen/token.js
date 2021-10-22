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
async function transferEvent(tokenAddr) {
  let provider = new ethers.providers.WebSocketProvider('ws://127.0.0.1:7545/')
  let contract = new ethers.Contract(tokenAddr, MyTokenJson.abi, provider)
  console.log(process.env.PGUSER)
  await getlastandhistory(tokenAddr)


  contract.on('Transfer', async (owner,spender,amount,event) => {
    // event.txHash -> blockNo -> blockTime
    
    let blocknumber = null
  
    let txhash = event.transactionHash
    provider.getTransaction(txhash).then((tx)=>{
      
      console.log(tx)
      blocknumber = tx.blockNumber
      return provider.getBlock(blocknumber);

    }).then((r) =>{

      console.log("blocknumber="+blocknumber+";timeStamp="+r.timestamp)


      insertTx(owner, spender, amount/10**4, txhash, blocknumber,r.timestamp)
    })
    
    // amount 为 BigNumber
    console.log('ower=' + owner + ';spender=' + spender + ';amount=' + amount)
  })

  console.log("****这行代码只会执行一次****");


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




async function getlastandhistory(tokenAddr){
  let client = await pool.connect()
  let sql = "select MAX(block_number) as max from transactions"
  
  // client.query(sql,(err,result)=>{
  //     if (err){
  //       console.log(err)
  //     }
  //     console.log("*********"+result.rows[0].max)
  //     loadhistory(tokenAddr,result.rows[0].max)
  // })
  let res = await client.query(sql)
  console.log("*********"+res.rows[0].max)
  await loadhistory(tokenAddr,res.rows[0].max)
  console.log("这一行会在前面")
  // console.log("result的值为"+result)
  // console.log(result)
  client.release()
  // return result.rows[0].max; 
}


async function loadhistory(tokenAddr,fromBlock){
  let provider = new ethers.providers.WebSocketProvider('ws://127.0.0.1:7545/')
  let contract = new ethers.Contract(tokenAddr, MyTokenJson.abi, provider)
  // console.log("contract获取")
  let filterAll = contract.filters.Transfer()      
  // let fromBlock = getlast() 
  // console.log(fromBlock)  
  let endBlock = await contract.provider.getBlockNumber() 
  console.log("**********"+endBlock) 
  let eventAll = await contract.queryFilter(filterAll,fromBlock,endBlock)

  // console.log("eventAll获取")
  for (let i=0;i<eventAll.length;i++){
    console.log(eventAll[i])
    let from = eventAll[i].args.from
    let to = eventAll[i].args.to
    let value = String((eventAll[i].args.value)/10**4)
    let blocknumber = eventAll[i].blockNumber
    let txhash = eventAll[i].transactionHash
    let timestamp = (await provider.getBlock(blocknumber)).timestamp
    insertTx(from,to,value,txhash,blocknumber,timestamp)
    console.log("插入"+blocknumber+"号区块进数据库")
  }
}





module.exports = {
  // balanceOf,
  // allowance,
  // decimals,
  // approve,
  // transfer,
  // transferFrom,
  transferEvent,
  loadhistory,
  getlastandhistory,
}
