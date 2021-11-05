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
        账户余额
        <input type="text" :value="balance" />
        <br />查询余额
        <input type="button" @click="getbalance()" />
        <br />目标地址
        <input type="text" v-model="recipient" />
        <br />转账金额
        <input type="text" v-model="amout" />
        <br />
        <input type="button" value="转账" @click="transfer" />
      </div>
    </div>
  </div>
</template>

<!-- 会导出一个全局的变量: ethers -->
<script src="https://cdn.ethers.io/scripts/ethers-v4.min.js"
        charset="utf-8"
        type="text/javascript">
</script>

<script>
import Web3 from 'web3'
import contract from 'truffle-contract'
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
      balance: null
    }
  },

  // 当前Vue组件被创建时回调的hook 函数
  async created() {
    await this.initWeb3Account()
    await this.initContract()
    await this.getbalance()
  },

  methods: {
    // 初始化 web3及账号
    async initWeb3Account() {
      console.log('window.etherum' + window.ethereum)
      if (window.ethereum) {
        this.provider = window.ethereum
        try {
          await window.ethereum.enable()
        } catch (error) {
          //   console.log("User denied account access");
        }
      }
      this.web3 = new Web3(this.provider)

      this.account = await this.web3.eth.getAccounts()
      console.log("this.accout:",this.account)
    },

    //  初始化合约实例
    async initContract() {
      // const crowdContract = contract(crowd)
      // crowdContract.setProvider(this.provider)
      // this.crowdFund = await crowdContract.deployed()
      console.log('provider' + this.provider)
      let abi = [
        {
          inputs: [],
          stateMutability: 'nonpayable',
          type: 'constructor'
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'owner',
              type: 'address'
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'spender',
              type: 'address'
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'value',
              type: 'uint256'
            }
          ],
          name: 'Approval',
          type: 'event'
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: 'from',
              type: 'address'
            },
            {
              indexed: true,
              internalType: 'address',
              name: 'to',
              type: 'address'
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: 'value',
              type: 'uint256'
            }
          ],
          name: 'Transfer',
          type: 'event'
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address'
            },
            {
              internalType: 'address',
              name: 'spender',
              type: 'address'
            }
          ],
          name: 'allowance',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'spender',
              type: 'address'
            },
            {
              internalType: 'uint256',
              name: 'value',
              type: 'uint256'
            }
          ],
          name: 'approve',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool'
            }
          ],
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'account',
              type: 'address'
            }
          ],
          name: 'balanceOf',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [],
          name: 'decimals',
          outputs: [
            {
              internalType: 'uint8',
              name: '',
              type: 'uint8'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [],
          name: 'name',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [],
          name: 'symbol',
          outputs: [
            {
              internalType: 'string',
              name: '',
              type: 'string'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [],
          name: 'totalSupply',
          outputs: [
            {
              internalType: 'uint256',
              name: '',
              type: 'uint256'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'recipient',
              type: 'address'
            },
            {
              internalType: 'uint256',
              name: 'amout',
              type: 'uint256'
            }
          ],
          name: 'transfer',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool'
            }
          ],
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'sender',
              type: 'address'
            },
            {
              internalType: 'address',
              name: 'recipient',
              type: 'address'
            },
            {
              internalType: 'uint256',
              name: 'amount',
              type: 'uint256'
            }
          ],
          name: 'transferFrom',
          outputs: [
            {
              internalType: 'bool',
              name: '',
              type: 'bool'
            }
          ],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ]
      let contractAddress = '0xD45C2D6C01C4d1A9a39c6d3Fe413e1CDA7b417e0'
      this.contract = new ethers.Contract(contractAddress, abi, new ethers.providers.Web3Provider(this.provider).getSigner())
      console.log('contract.address' + contract.address)
    },

    async getbalance() {
      console.log("执行了getbalance方法")
      console.log("this.account[0]:",this.account[0])
      this.balance = await this.contract.balanceOf(this.account[0])
      console.log("this.balance:",this.balance)
    },

    async transfer() {
      //   this.crowdFund.transfer(this.recipient, this.amout*10**4, {

      //     from: this.account
      //   }).then(() => {

      //   })
      // this.getbalance();
      await this.contract.transfer(this.recipient, this.amout * 10 ** 4)
      this.getbalance()
    }
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