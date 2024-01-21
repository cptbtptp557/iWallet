import {h, ref} from "vue";
import Web3 from 'web3';
import {ElNotification} from "element-plus";
import {getAccountLists} from "../../axios/getExpressLists.js"

export const home = () => {
    let iji = ref('0x50ed20287ceb13a5d1ec4406df825721a1dbf535ff31f0e7c88ce11466fc11f4');
    const isCollapse = ref(false);
    const publicKey = ref(document.cookie.split(';').find(item => item.trim().startsWith('publicKey=')).split('=')[1]); //公钥
    const balance = ref(); //余额
    const thisPublicKeyFormer = ref(publicKey.value.slice(0, 7));
    const thisPublicKeyAfter = ref(publicKey.value.slice(publicKey.value.length - 4));
    const transactionHistory = ref([]); //历史交易记录
    const amountTransaction = ref(); //交易金额
    const moreLists = ref(false); //更多数据栏状态
    const key = ref(null); //点击行的数据
    const transferMenu = ref(false);
    const amountTransferred = ref(); //转账金额
    const toPublicKey = ref(); //收款方公钥
    const tradeHash = ref(); //查询当前交易地址

    const web3 = new Web3(Web3.givenProvider || "https://goerli.infura.io/v3/7a79903a40a64814a9cd0b9b899e5434");
    // 获取余额
    web3.eth.getBalance(publicKey.value)
        .then((res) => {
            balance.value = parseFloat(Web3.utils.fromWei(res, "ether")).toFixed(4);
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
        tradeHash.value = 'https://goerli.etherscan.io/tx/' + key.value.hash;
    }

    // 提交转账
    const submitTransfer = async () => {
        transferMenu.value = false;
        const nonce = await web3.eth.getTransactionCount(toPublicKey.value);
        const gasPrice = await web3.eth.getGasPrice();
        const value = web3.utils.toWei(amountTransferred.value, "ether");
        try {
            let rawTx = {
                gasPrice,
                data: "0x0000",
                from: web3.eth.accounts.privateKeyToAccount(iji.value).address,
                to: toPublicKey.value,
                value: value,
                nonce,
            };
            console.log(nonce)

            const signedTx = await web3.eth.accounts.signTransaction(rawTx, iji.value);
            web3.eth.sendSignedTransaction(signedTx.rawTransaction)
                .then((receipt) => {
                    console.log('交易Hash:', receipt.transactionHash);
                    console.log(`https://goerli.etherscan.io/tx/${receipt.transactionHash}`);
                    location.reload();
                })
                .catch((err) => {
                    console.error(err);
                });
        } catch (err) {
            console.error(err);
        }
    }

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
        getThisKey,
        transferMenu,
        amountTransferred,
        toPublicKey,
        submitTransfer,
        tradeHash
    }
}