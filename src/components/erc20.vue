<template>
<div class="content">
  <!-- <h3> 新书众筹</h3>
  <span>以最低的价格获取我的新书 </span> -->

  <!-- 众筹的总体状态  -->
  <div class="status">
    <!-- <div v-if="!closed">已众筹资金：<b>{{ total }} ETH </b></div>
    <div v-if="closed"> 众筹已完成 </div>
    <div>众筹截止时间：{{ endDate }}</div> -->

    <div>
      账户余额<input type="text" :value="balance"><br/>
      查询余额<input  type="button" @click="getbalance()"><br/>
      目标地址<input type="text" v-model="recipient"><br/>
      转账金额<input type="text" v-model="amout"><br/>
      <input type="button" value="转账" @click="transfer">
    </div>
  </div>


</div>
</template>

<script>
import Web3 from "web3";
import contract from "truffle-contract";
import crowd from '../../build/contracts/MyToken.json';
// import axios from 'axios'

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

    }
  },

    // 当前Vue组件被创建时回调的hook 函数
  async created() {
    await this.initWeb3Account()
    await this.initContract()
  },

  methods: {

    // 初始化 web3及账号
    async initWeb3Account() {
      if (window.ethereum) {
        this.provider = window.ethereum;
        try {
          await window.ethereum.enable();
        } catch (error) {
          //   console.log("User denied account access");
        }
      }
      this.web3 = new Web3(this.provider);

      this.web3.eth.getAccounts().then(accs  => {
        this.account = accs[0]
      })
    },

    //  初始化合约实例
    async initContract() {
      const crowdContract = contract(crowd)
      crowdContract.setProvider(this.provider)
      this.crowdFund = await crowdContract.deployed()
    },

    getbalance(){
      console.log(this.crowdFund)
      this.crowdFund.balanceOf(this.account).then(

        r =>{

          this.balance = r/10**4
        }
      )

    },

    transfer() {


      this.crowdFund.transfer(this.recipient, this.amout*10**4, {

        from: this.account
      }).then(() => {

      })
    this.getbalance();
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 5px;
  padding: 11px;
  margin: 10px;
}


</style>