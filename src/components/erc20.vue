<template>
  <div class="content">
    <!-- <h3> 新书众筹</h3>
    <span>以最低的价格获取我的新书 </span>-->

    <!-- 众筹的总体状态  -->
    <div class="status">
      <!-- <div v-if="!closed">已众筹资金：<b>{{ total }} ETH </b></div>
    <div v-if="closed"> 众筹已完成 </div>
      <div>众筹截止时间：{{ endDate }}</div>-->

      <div>
        <!-- 账户余额
        <input type="text" :value="balance" />
        <br />查询余额
         类型 input 改成了 button -->
        <!-- 账户余额
        <input type="button" @click="getbalance()" />
        <br />目标地址
        <input type="text" v-model="recipient" />
        <br />转账金额(MT)
        <input type="text" v-model="amout" />
        <br /> -->
        <!-- <input type="button" value="转账" @click="transfer()" /> -->
        <br />-----------------------------------------------------
       
    
        <!-- <br />_name:
        <input type="text" :value="name" />
        <br />_symbol:
        <input type="text" :value="symbol" />
        <br />_decimals:
        <input type="text" :value="decimals" />
        <br />total_supply:
        <input type="text" :value="total_supply" />
        <br />----------------------------------------------------- -->

        <!--
        <br />授权地址:
        <input type="text" v-model="address_authorized" />
         <br />授权数量:
        <input type="text" v-model="amount_authorized" />
        <br />授权
        <input type="button" @click="authorized()" />
        <br />查看授权的数量
        <input type="button" @click="check()" />
         <br />----------------------------------------------------- -->

         
       <!-- <input type="text" v-model="giveaddress" />
         <br />转入:
        <input type="text" v-model="money" />
        <input type="button" value= "~转入"  @click="authorizedd_transfer()" /> -->

         <br />-----------------------------------------------------
         <br />查询地址:
          <input type="text" v-model="addr" />  
          <br />当前账户MT余额:
          <input type="text"  :value="amount_MT" /> 
          <input type="button" @click="showmt()" />
          <br />当前账户金库余额:
          <input type="text" :value="amount_bankblance" /> 
          <input type="button" @click="show_bankblance()" />
          <br />-----------------------------------------------------

          
          <br/>授权金额：
          <input type="text" v-model="author_banknumber"  />
          <input type="button" @click="authorbank()" />
          <br/>查看授权数量：
          <input type="text" :value="allowance_bank"  />
          <input type="button" @click="show_allowancebank()" />

          
          <br />转入金库金额:
          <input type="text" v-model="amount_depositbank" />
          <input type="button" value= "转入金库"  @click="deposit_bank()">
          <br />转出金库金额:
          <input type="text" v-model="amount_withdrawbank" />
          <input type="button" value= "转出金库"  @click="withdraw_bank()">
          <br />-----------------------------------------------------    

      
      </div>
    </div>
  </div>
</template>

<!-- 会导出一个全局的变量: ethers -->
<!--
  <script src="https://cdn.ethers.io/scripts/ethers-v4.min.js"
          charset="utf-8"
          type="text/javascript">
  </script>
-->
<script>

import { ethers } from 'ethers'

export default {
  name: 'erc20',
  // 定义上面HTML模板中使用的变量
  data() {
    return {
      //   price: null,
      //   total: 0,
      //   closed: true,
      //   joinPrice: null,
      //   joined: false,
      //   endDate: "null",
      //   isAuthor: true,
      //   joinList: [],
      recipient: null,
      amout: null,
      balance: null,

      name: null,
      symbol:null,
      decimals:null,
      total_supply:null,
      contractname:null,
      address_authorized:null,
      amount_authorized:null,
       
      
      money:null,
      giveaddress:null,
      amount_depositbank:null,
      amount_withdrawbank:null,
      amount_bankblance:null,
      addr:null,
      amount_MT:null,
      allowance_bank:null,
      author_banknumber:null,

    }
  },

  // 当前Vue组件被创建时回调的hook 函数
  async created() {
    // await this.initWeb3Account()
    await this.initAccount()
    await this.initContract()
    await this.getbalance()
    await this.get_erc20token()
  
  },

  methods: {
    // 初始化账户
    async initAccount(){
      if(window.ethereum)
      {
        console.log(window.ethereum)
        try{
          this.accounts = await window.ethereum.enable()
          // console.log("accounts:" + this.accounts);
          this.account = this.accounts[0];

          //  this.provider = new ethers.providers.Web3Provider(window.ethereum);

          this.provider = window.ethereum;
          
          this.signer = new ethers.providers.Web3Provider(this.provider).getSigner()
           //.log("this.sigenr",this.signer.addres
           //console.log(this.provider)
          // this.networks = await this.provider.getNetwork()
          // console.log('network ->'+this.network)

          this.chainId = parseInt(await window.ethereum.request({ method: 'eth_chainId' }));
        }catch(error){
          console.log("User denied account access", error)
        }
      }else{
        console.log("Need install MetaMask")
      }
        console.log("验证accounts")
        console.log(this.accounts.toString())
    },

    getContract(ContractName){

      // 获取abi和地址 
      const addr = require(`../../deployments/${this.chainId}/${ContractName}.json`);
      const abi = require(`../../deployments/abi/${ContractName}.json`);
    

     
      // 输出地址以及abi二进制接口
      // console.log("addr ->"+addr.address)
      // console.log("abi ->"+abi)

      // const contractAddress = require(`../../deployments/${this.network.chainId}/${ContractName}.json`);
      // const abi = require(`../../deployments/abi/${ContractName}.json`);

      //初始化定义contract合约对象
      // console.log('provide'+ this.provider)
      // console.log('new ethers.providers.Web3Provider(this.provider)'+ new ethers.providers.Web3Provider(this.provider))
      // console.log('getSigner'+ new ethers.providers.Web3Provider(this.provider).getSigner())
    
      this.erc20_contarct = new ethers.Contract(addr.address, abi, new ethers.providers.Web3Provider(this.provider).getSigner())
        
      // console.log('address '+ addr.address)
      // console.log('abi' +abi)
      // console.log('pro ',new ethers.providers.Web3Provider(this.provider).getSigner())
      let xx ;
      try{
        xx = new ethers.erc20_contarct(addr.address, abi, this.signer);
      }catch(err){
        console.error('xxxxxxx', err)

      }
      //console.log('contractxxxx', xx)
      return xx;
    },

    //  初始化合约实例
    async initContract() {
      this.recent_signer =  new ethers.providers.Web3Provider(this.provider).getSigner()


      //修改
      const addr_storehouse = require(`../../deployments/${this.chainId}/Storehouse.json`);
      const abi_storehouse = require(`../../deployments/abi/Storehouse.json`);

      this.store_contarct = new ethers.Contract(addr_storehouse.address, abi_storehouse, new ethers.providers.Web3Provider(this.provider).getSigner())

      // const crowdContract = erc20_contarct(crowd)
      // crowdContract.setProvider(this.provider)
      // this.crowdFund = await crowdContract.deployed()
      this.mytoken = this.getContract("MyToken")                 //?有什么用  this.mytoken
      // console.log(this.mytoken)
      // this.getBalance();

      // console.log('provider' + this.provider)
      // const contractAddress = require(`../../deployments/${this.network.chainId}/${ContractName}.json`);
      // const abi = require(`../../deployments/abi/${ContractName}.json`);

      // this.erc20_contarct = new ethers.erc20_contarct(contractAddress, abi, new ethers.providers.Web3Provider(this.provider).getSigner())
      // console.log('321 erc20_contarct.address' + erc20_contarct.address)
    },

    async getbalance() {
      console.log("this.account[0]:"+this.accounts[0])
       this.balance =  await this.erc20_contarct.balanceOf(this.accounts[0])
       
      console.log(this.balance.toString())
       
      // this.balance = this.account[0].balance
      // this.balance = await this.account[0].balance;
    },

    //得到代币名称
    async get_erc20token() {
       this.name         = await  this.erc20_contarct.name()
       this.symbol       = await  this.erc20_contarct.symbol()
       this.decimals     = await  this.erc20_contarct.decimals()
       this.total_supply = await  this.erc20_contarct.totalSupply()

       console.log(this.name.toString())
       console.log(this.symbol.toString())
       console.log(this.decimals.toString())
       console.log(this.total_supply.toString())
    },

    async authorized() {
     
     console.log("开始授权")
     console.log(this.address_authorized)
      await this.erc20_contarct.approve(this.address_authorized,this.amount_authorized)
     console.log("执行成功")

    },

    async check() {   
        //转换为字符串bigbumber
        let a = await this.erc20_contarct.allowance(this.accounts[0],this.address_authorized)
        console.log(a.toString())
    },

    async authorizedd_transfer() {
      console.log("转账")
      console.log(this.accounts[0].toString())
      console.log(this.giveaddress.toString())
      console.log(this.money.toString())

       //this.signer = new ethers.providers.Web3Provider(this.provider).getSigner()
       await this.erc20_contarct.connect(this.recent_signer).transferFrom(this.accounts[0],this.giveaddress,this.money)   
       console.log("转账成功")

    },
   
    async transfer() {
      //   this.crowdFund.transfer(this.recipient, this.amout*10**4, {
      //     from: this.account
      //   }).then(() => {
      //   })
      // this.getbalance();
      await this.erc20_contarct.transfer(this.recipient, ethers.BigNumber.from(this.amout).mul(ethers.BigNumber.from(10)).pow(ethers.BigNumber.from(18)))
      this.getbalance()
    },

    async  deposit_bank(){

      console.log("开始转入金库",this.amount_depositbank, this.store_contarct.address)              
      await this.store_contarct.deposit(this.amount_depositbank)
      console.log("收款成功")

    
    },
   
    async withdraw_bank(){
           
        await this.store_contarct.withdraw(this.amount_withdrawbank)
        console.log("转走成功")


    },

    async show_bankblance(){

     console.log("add",this.addr)
     this.amount_bankblance =   await this.store_contarct.showmoney(this.addr)
     console.log("amount",this.amount_bankblance)
    },

    async showmt(){

      this.amount_MT = await this.erc20_contarct.balanceOf(this.addr)
    },

    async authorbank(){   

      await this.erc20_contarct.approve(this.store_contarct.address,this.author_banknumber)
      console.log("授权成功")

    },

    async show_allowancebank(){
      console.log(this.store_contarct.address)
      console.log("当前用户：", await this.recent_signer.getAddress())
      this.allowance_bank = await this.erc20_contarct.allowance( await this.recent_signer.getAddress(),this.store_contarct.address)
      // this.allowance_bank = await this.store_contarct.get_allowancebank(this.addr)
      
    },

  }

}
</script>

<style scoped>
.content {
  font-size: 187 px;
  
}

.status {
  margin: 20px;
}

.card-bkg {
  margin: 10px;
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 5px;
  padding: 11px;
}

.award-des {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.award-des span {
  font-size: 12px;
}

.award-des b {
  font-size: 16px;
}

button {
  display: inline-block;
  line-height: 1;
  border-radius: 4px;
  padding: 12px 20px;
  white-space: nowrap;
  font-weight: 500;
  border: 1px solid #dcdfe6;
}

.box {
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 5px;
  padding: 11px;
  margin: 10px;
}
</style>