import express from 'express';
import * as bip39 from 'bip39';
import Moralis from "moralis";
import pkg from "ethereumjs-wallet";

const app = express();
const {hdkey} = pkg;
let thisMnemonic = [];

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
(async () => {
    await Moralis.start({
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImZlMDBiOTIyLWUxNjUtNDUxZi04NGVmLTU0OTQyNThkOTYwYiIsIm9yZ0lkIjoiMzczMTI4IiwidXNlcklkIjoiMzgzNDYyIiwidHlwZUlkIjoiODNhMzQ2NjEtNTZjYy00ODBiLWIyNDItZDM1YWI1OTI2YzE1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDU2MzUyNzcsImV4cCI6NDg2MTM5NTI3N30.Wd6kfJnAF-2Hr1vT9483qzVpdCerbPwC82TNdNT7wYQ",
    });
})();
//const web3 = new Web3(Web3.givenProvider || "https://goerli.infura.io/v3/7a79903a40a64814a9cd0b9b899e5434");

// 获取账户历史交易记录
app.get('/transactions', async (req, res) => {
    const data = req.query;

    try {
        await Moralis.EvmApi.transaction.getWalletTransactions({
            "chain": "0x5",
            "address": data.thisPublicKey,
        })
            .then((lists) => {
                res.json({lists})
            })
    } catch (err) {
        console.error(err);
        res.status(500).json({err: '获取交易失败!!!'})
    }
});

// 获取助记词
app.get('/generateMnemonic', (req, res) => {
    try {
        const mnemonic = bip39.generateMnemonic();
        thisMnemonic = mnemonic;
        res.json({mnemonic});
    } catch (err) {
        console.error(err);
    }
})

app.get('/generateAccountLists', (req, res) => {
    const data = req.query.password;
    console.log(data);
    try {
        bip39.mnemonicToSeed(thisMnemonic)
            .then((seed) => {
                const hdWallet = hdkey.fromMasterSeed(seed);
                const keys = hdWallet.derivePath("m/44'/60'/0'/0/0");

                // 获取钱包对象
                const wallet = keys.getWallet();
                // 获取公钥
                const getPublicKey = wallet.getChecksumAddressString();
                // 获取私钥
                const getPrivateKey = "0x" + wallet.getPrivateKey().toString('hex');
                res.json({getPrivateKey, getPublicKey});
            })
    } catch (err) {
        console.error(err);
    }
})

app.listen(3000, () => {
    console.log('服务器在3000端口启动！！！');
});