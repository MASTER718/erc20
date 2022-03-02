<template>
  <div class="content">
    <div class="status">
      <div>
        <br />---------------------------------------------------
        <br />---------------------MyNft-------------------------
        <input type="button" value="get message" @click="Getnftmessage()" />
        <br />名字：
        <input type="text" :value="name" />
        <br />symbol:
        <input type="text" :value="symbol" />

        <br />---------------------------------------------------

        <br />查询地址：
        <input type="text" v-model="addr" />
        <br />拥有的NFTID：
        <input type="button" value="LIST" @click="Getidlist()" />
        <input type="text" :value="NFTID_LIST" />

        <br />账户余额：
        <input type="text" :value="addr_blance" />
        <input type="button" value="~~" @click="Getbalence()" />
        <br />mint：
        <input type="button" value="~~" @click="Getnft()" />
        <br />当前账户要授权的NftId、地址:
        <input type="text" v-model="Approve_ID" />
        <input type="text" v-model="Approve_operator" />
        <br /><input type="button" value="~~" @click="Approve()" />

        <br />---------------------------------------------------
        <br />查询此ID拥有者：
        <input type="text" v-model="ID" />
        <input type="button" value="~~" @click="GetownerofID_nfturi()" />
        <br />TokenUri：
        <input type="text" :value="nfturi" />
        <br />拥有者：
        <input type="text" :value="ID_owner" />
        <br />被授权的人：
        <input type="text" :value="ID_operator" />
        <input type="button" value="~~" @click="GetoperatorofID()" />
        <br />---------------------------------------------------
        <br />ID-URI对应表
        <div>
          <table
            border="1"
            cellpadding="3"
            cellspacing="0"
            style="width: 35%; margin: left"
          >
            <tr v-for="item in this.nfts" :key="item.nftId">
              <td>{{ item.nftId }}</td>
              <td>{{ item.nftURI }}</td>
            </tr>
          </table>
        </div>
        <br />~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        <br />~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        <br />|银行存取 |
        <br />----------------查询服务----------------------------
        <br />查询地址：
        <input type="text" v-model="bankaddr_search" />
        <br />余额为：
        <input type="text" :value="balance_addr" />
        <input type="button" value="查询" @click="search_balence()" />

        <br />----------------当前账户----------------------------

        <br />授权nftID
        <input type="text" v-model="deposit_nftid" />
        <input type="button" value="授权" @click="Approve_deposit()" />
        <br />存钱
        <!-- <input type="text" v-model="deposit_amount" />  -->
        <input type="button" value="存入" @click="Deposit()" />

        <br />想要取出的nftID：
        <input type="text" v-model="withdraw_nftid" />
        <input type="button" value="检查" @click="CheckIdstate()" />
        <br />检查是否存入：
        <input type="text" :value="id_bankstate" />
        <br />取出nft
        <input type="button" value="取出" @click="Withdraw()" />
      </div>
    </div>
  </div>
</template>



<script>
import { ethers } from "ethers";

export default {
  name: "erc721",
  data() {
    //html用到的变量
    return {
      name: null,
      symbol: null,
      nfturi: null,
      addr: null,
      addr_blance: null,
      ID: null,
      ID_owner: null,
      ID_operator: null,
      Approve_ID: null,
      Approve_operator: null,
      NFTID_LIST: null,
      nums: null,
      number: null,
      nfts: null,
      deposit_amount: null,
      //withdraw_amount:null,
      bankaddr_search: null,
      balance_addr: null,
      deposit_nftid: null,
      withdraw_nftid: null,
      id_bankstate: null,

      // nfts: [
      // {nftId:1, nftURI:'xxx'},
      // {nftId:2, nftURI:'xxx'},

      // ]
    };
  },

  async created() {
    let ContractName = "MyNft";
    await this.Initaccount();
    const addr = require(`../../deployments/${this.chainId}/${ContractName}.json`);
    const abi = require(`../../deployments/abi/${ContractName}.json`);
    this.nft_contract = new ethers.Contract(
      addr.address,
      abi,
      new ethers.providers.Web3Provider(this.provider).getSigner()
    );

    this.addr1 = require(`../../deployments/${this.chainId}/StoreNft.json`);
    const abi1 = require(`../../deployments/abi/StoreNft.json`);
    this.nftstore_contract = new ethers.Contract(
      this.addr1.address,
      abi1,
      new ethers.providers.Web3Provider(this.provider).getSigner()
    );

    setInterval(async () => {
      await this.Getalllist();
    }, 3000);
  },

  methods: {
    async Initaccount() {
      if (window.ethereum) {
        console.log(window.ethereum);
        try {
          this.accounts = await window.ethereum.enable();
          this.account = this.accounts[0];
          this.provider = window.ethereum;
          this.signer = new ethers.providers.Web3Provider(
            this.provider
          ).getSigner();
          this.chainId = parseInt(
            await window.ethereum.request({ method: "eth_chainId" })
          );
          // 修改？
        } catch (error) {
          console.log("User denied account access", error);
        }
      } else {
        console.log("Need install MetaMask");
      }
      console.log("验证accounts");
      console.log(this.accounts.toString());
    },

    async Getbalence() {
      this.addr_blance = await this.nft_contract.balanceOf(this.addr);
    },

    async Getnft() {
      await this.nft_contract.mint();
      console.log(this.nfts);
      await this.Getalllist();
    },

    async GetownerofID_nfturi() {
      this.ID_owner = await this.nft_contract.ownerOf(this.ID);
      console.log("ID_owner:", this.ID_owner);
      this.nfturi = await this.nft_contract.tokenURI(this.ID);
    },

    async GetoperatorofID() {
      console.log("开始查询");
      console.log("=======", this.nft_contract);
      this.ID_operator = await this.nft_contract.getApproved(this.ID);

      // if (this.ID_operator ==null){

      //   this.ID_operator=0;
      // }
    },

    async Approve() {
      await this.nft_contract.approve(this.Approve_operator, this.Approve_ID);
      console.log("授权成功");
    },

    async Getnftmessage() {
      this.name = await this.nft_contract.name();
      this.symbol = await this.nft_contract.symbol();
    },
    async Getidlist() {
      //使用this可以接收？
      this.nums = await this.nft_contract.total();
      console.log("NUMS:", this.nums);
      let list = [];
      if (this.nums == 0) {
        list = 0;
      } else {
        for (let i = 1; i <= this.nums; i++) {
          let add = await this.nft_contract.ownerOf(i);
          if (add == this.addr) {
            list.push(i);
          }
        }
      }
      this.NFTID_LIST = list;
    },
    async Getalllist() {
      let list = [];
      this.number = await this.nft_contract.total();

      if (this.number == 0) {
        list = [];
      } else {
        for (let i = 1; i <= this.number; i++) {
          let nftURI = await this.nft_contract.tokenURI(i);
          list.push({ nftId: i, nftURI: nftURI });
        }
      }
      this.nfts = list;
    },

    async CheckIdstate() {
      console.log("开始检查状态");

      let a = await this.nftstore_contract.oldownerNft(this.withdraw_nftid);
      if (a == (await this.signer.getAddress())) {
        this.id_bankstate = "yes";
      } else {
        this.id_bankstate = "no";
      }
      console.log("-------------------------");
    },

    async Approve_deposit() {
      console.log("授权银行nftid");
      await this.nft_contract.approve(this.addr1.address, this.deposit_nftid);
      console.log("授权银行完成");
      console.log("-------------------------");
    },

    async Deposit() {
      console.log("开始存入");
      await this.nftstore_contract.deposit(this.deposit_nftid);
      console.log("存入完成");
      console.log("-------------------------");
    },

    async Withdraw() {
      console.log("开始取出");
      await this.nftstore_contract.withdraw(this.withdraw_nftid);
      console.log("取出完成");
      console.log("-------------------------");
    },

    async search_balence() {
      console.log("开始查询");
      this.balance_addr = await this.nftstore_contract.balanceNft(
        this.bankaddr_search
      );
      console.log("查询完成");
      console.log("-----------------------");
    },
  },
};
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