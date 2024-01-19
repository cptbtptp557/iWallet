import express from 'express';
import Web3 from "web3";
import Moralis from "moralis";

const app = express();

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
})

app.listen(3000, () => {
    console.log('服务器在3000端口启动！！！');
});