import {h, ref} from "vue";
import Web3 from 'web3';
import {ElNotification} from "element-plus";
import {getAccountLists} from "../../axios/getExpressLists.js"

export const home = () => {
    const isCollapse = ref(false);
    const publicKey = ref(document.cookie.split(';').find(item => item.trim().startsWith('publicKey=')).split('=')[1]); //公钥
    const balance = ref(); //余额
    const transactionHistory = ref([]); //历史交易记录
    const amountTransaction = ref(); //交易金额
    const moreLists = ref(false); //更多数据栏状态
    const key = ref(null); //点击行的数据

    const web3 = new Web3(Web3.givenProvider || "https://goerli.infura.io/v3/7a79903a40a64814a9cd0b9b899e5434");
    // 获取余额
    web3.eth.getBalance(publicKey.value)
        .then((res) => {
            balance.value = parseFloat(Web3.utils.fromWei(res, "ether")).toFixed(2);
        })
        .catch((err) => {
            console.error(err);
        });
    // 获取账户所有交易记录
    (async () => {
        await getAccountLists().getTransactionHistory(publicKey.value)
            .then(() => {
                transactionHistory.value = getAccountLists().thisTransactionHistory;
            })
    })()

    // 复制
    const copy = async (thisData) => {
        navigator.clipboard.writeText(thisData)
            .then(() => {
                ElNotification({
                    title: '提示',
                    message: h('i', {style: 'color: teal'}, '复制成功'),
                })
            })
            .catch((err) => {
                console.error('复制失败', err);
            })
    }

    const refreshPage = () => {
        location.reload();
    }

    // 获取点击行数据
    const getThisKey = (now) => {
        key.value = now;
        console.log(key.value)
    }

    const thisPublicKeyFormer = ref(publicKey.value.slice(0, 7));
    const thisPublicKeyAfter = ref(publicKey.value.slice(publicKey.value.length - 4));

    return {
        isCollapse,
        balance,
        publicKey,
        copy,
        refreshPage,
        thisPublicKeyFormer,
        thisPublicKeyAfter,
        transactionHistory,
        amountTransaction,
        moreLists,
        key,
        getThisKey
    }
}