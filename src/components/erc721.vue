<template>
  <div class="content">
    <div class="status">

      <div>
          <br/>---------------------------------------------------
          <br/>-----MyNft
         <input type="button" value= "get message"  @click="Getnftmessage()">
          <br/>名字：
          <input type="text" :value="name" />
          <br/>计量单位：
          <input type="text" :value="symbol" /> 
          
          <br/>---------------------------------------------------

          <br/>查询地址：
          <input type="text" v-model="addr" /> 
          <br/>拥有的NFTID：
          <input type="button" value= "LIST"  @click="Getidlist()">
          <input type="text" :value="NFTID_LIST" />

          <br/>账户余额：
          <input type="text" :value="addr_blance" />
          <input type="button" value= "~~"  @click="Getbalence()">
          <br/>当前账户得到nft：
          <input type="button" value= "~~"  @click="Getnft()">
          <br/>当前账户要授权的NftId、地址:
          <input type="text" v-model="Approve_ID" />
          <input type="text" v-model="Approve_operator" />
          <br/><input type="button" value= "~~"  @click="Approve()">


          <br/>---------------------------------------------------
          <br/>查询此ID拥有者：
          <input type="text" v-model="ID" /> 
          <input type="button" value= "~~"  @click="GetownerofID_tokenuri()">
          <br/>TokenUri：
          <input type="text" :value="tokenuri" /> 
          <br/>拥有者：
          <input type="text"  :value="ID_owner" /> 
          <br/>被授权的人：
          <input type="text"  :value="ID_operator" />
          <input type="button" value= "~~"  @click="GetoperatorofID()">




 
        </div>
    </div>
  </div>
</template>

<script>



import {ethers}  from 'ethers'

export default {

    name:'erc721',
    data(){
        //html用到的变量
       return {
          name:null,
          symbol:null,
          tokenuri:null,
          addr:null,
          addr_blance:null,
          ID:null,
          ID_owner:null,
          ID_operator:null,
          Approve_ID:null,
          Approve_operator:null,
          NFTID_LIST:null,
          nums:null,




       }

    },

     async created(){
      let ContractName = "MyNft"
      await this.Initaccount()
      const addr = require(`../../deployments/${this.chainId}/${ContractName}.json`);
      const abi = require(`../../deployments/abi/${ContractName}.json`);
      this.nft_contract = new ethers.Contract(addr.address, abi, new ethers.providers.Web3Provider(this.provider).getSigner())
      
    },

    methods:{

      async Initaccount(){
        if(window.ethereum)
        {
          console.log(window.ethereum)
          try{

            this.accounts = await window.ethereum.enable()
            this.account = this.accounts[0];
            this.provider = window.ethereum; 
            this.signer = new ethers.providers.Web3Provider(this.provider).getSigner()
            this.chainId = parseInt(await window.ethereum.request({ method: 'eth_chainId' }));
            // 修改？
          }catch(error){
            console.log("User denied account access", error)
          }
        }else{
          console.log("Need install MetaMask")
        }
          console.log("验证accounts")
          console.log(this.accounts.toString())

      },
    
  

      async Getbalence(){
          this.addr_blance =await this.nft_contract.balanceOf(this.addr)
                
      },  

      async Getnft(){
          await   this.nft_contract.mint()

      },

      async GetownerofID_tokenuri(){
          this.ID_owner = await this.nft_contract.ownerOf(this.ID)
          console.log("ID_owner:",this.ID_owner)
          this.tokenuri = await this.nft_contract.tokenURI(this.ID)
        

      },

      async GetoperatorofID(){
        console.log("开始查询")
        console.log('=======', this.nft_contract)
        this.ID_operator = await this.nft_contract.getApproved(this.ID)
        

        // if (this.ID_operator ==null){

        //   this.ID_operator=0;
        // }
      },

      async Approve(){

         await this.nft_contract.approve(this.Approve_operator,this.Approve_ID)
         console.log("授权成功")

      },

      async Getnftmessage(){

           this.name = await this.nft_contract.name()
           this.symbol = await this.nft_contract.symbol()


      },
      async Getidlist(){
       

       //使用this可以接收？
       this.nums = await this.nft_contract.total()
       console.log("NUMS:",this.nums)
       let list=[]
       if(this.nums==0){
            list = 0
       }else{

       for(let i=1;i<=this.nums;i++) {

         let add = await this.nft_contract.ownerOf(i)
          if(add == this.addr){
          
           list.push(i)

          }
              
      }
      }
      this.NFTID_LIST = list


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