const router = require('express').Router();
const axios = require('axios');
const TronWeb = require('tronweb');
const {abbreviateNumber} = require('../utils');

router.post('/message', async (req, res) => {
    const tronWeb = new TronWeb({
        fullHost: process.env.VUE_APP_TRON_FULL_HOST,
    })
    const contractAddress = process.env.VUE_APP_CONTRACT_ADDRESS;
    tronWeb.setAddress(contractAddress);
    const contract = await tronWeb.contract().at(contractAddress);

    try {
        let { message } = req.body;
        if (message) {
            const keyword = message.text.toLowerCase();
            let text = 'Not a keyword!';
            switch (keyword) {
                case '/divs': {
                    const currentDayResp = await contract.currentDay().call();
                    const currentDay = tronWeb.fromSun(currentDayResp._hex) * 1000000;
                    const xfLobbyResp = await contract.xfLobby(currentDay).call({ shouldPollResponse: true });
                    text = abbreviateNumber(tronWeb.fromSun(xfLobbyResp._hex), 2) + " TRX";
                }
            }
            await axios.post('https://api.telegram.org/bot1362538970:AAHRf2X4X54xdCBbGT6pDreJeUP8z7WoPrc/sendMessage', {
                chat_id: message.chat.id,
                text
            });
        } else {
            return res.end();
        }

        console.log('Message posted')
        res.end('ok');
    } catch (err) {
        console.log('errrr ===>>>', err)
        res.status(500).send(err);

    }
});

module.exports = router;