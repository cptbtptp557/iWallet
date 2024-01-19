import axios from 'axios';
import {defineStore} from "pinia";
import Web3 from "web3";

export const getAccountLists = defineStore('accountLists', {
    state: () => ({
        thisTransactionHistory: [], //历史交易数据
    }),
    actions: {
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
                    if (list.data.lists.result[i].from_address === cookie.toLowerCase()) {
                        list.data.lists.result[i].tradingResults = '收款';
                    } else {
                        list.data.lists.result[i].tradingResults = '付款';
                    }
                }
                this.thisTransactionHistory = list.data.lists.result;
                console.log(this.thisTransactionHistory)
            } catch (err) {
                console.error(err);
            }
        }
    },
})