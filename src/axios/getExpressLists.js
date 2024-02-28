import axios from 'axios';
import {defineStore} from "pinia";
import Web3 from "web3";

export const getAccountLists = defineStore('accountLists', {
    state: () => ({
        thisTransactionHistory: [], //历史交易数据
        thisMnemonic: [], //助记词
        thisAccountLists: [], //新创建账户数据
        thisPublicKey: '', //当前账户的私钥
    }),
    actions: {
        // 获取账户历史交易记录
        async getTransactionHistory(thisPublicKey) {
            try {
                const list = await axios.get('http://localhost:3000/transactions', {
                    params: {
                        'thisPublicKey': thisPublicKey,
                    }
                });
                let cookie = document.cookie.split(';').find(item => item.trim().startsWith('publicKey=')).split('=')[1];
                for (let i = 0; i < list.data.lists.result.length; i++) {
                    list.data.lists.result[i].value = Web3.utils.fromWei(list.data.lists.result[i].value, "ether");
                    if (list.data.lists.result[i].input !== "0x" && list.data.lists.result[i].input !== "0x0000") {
                        list.data.lists.result[i].tradingResults = '合约部署';
                    } else {
                        if (list.data.lists.result[i].from_address === cookie.toLowerCase()) {
                            list.data.lists.result[i].tradingResults = '收款';
                        } else {
                            list.data.lists.result[i].tradingResults = '付款';
                        }
                    }
                }
                this.thisTransactionHistory = list.data.lists.result;
            } catch (err) {
                console.error(err);
            }
        },

        // 获取助记词
        async generateMnemonic() {
            try {
                await axios.get('http://localhost:3000/generateMnemonic')
                    .then(res => {
                        this.thisMnemonic = res.data.thisMnemonic.split(' ');
                    })
            } catch (err) {
                console.error(err);
            }
        },

        async getGenerateAccountLists(password) {
            try {
                await axios.get('http://localhost:3000/generateAccountLists', {
                    params: {
                        'password': password,
                    }
                })
                    .then(res => {
                        this.thisAccountLists = res.data;
                    })
            } catch (err) {
                console.error(err);
            }
        },

        async showPrivateKey(PublicKey) {
            try {
                await axios.get('http://localhost:3000/showPriKey', {
                    params: {
                        'thisPublicKey': PublicKey
                    }
                })
                    .then((data) => {
                        this.thisPublicKey = data.data.privateKey;
                        console.log(data)
                    })
            } catch (err) {
                console.error(err);
            }
        }
    },
})