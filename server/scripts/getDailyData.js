const { CronJob } = require('cron');
const TronWeb = require('tronweb');
const Bottleneck = require('bottleneck');

const tronWeb = new TronWeb({
    fullHost: process.env.VUE_APP_TRON_FULL_HOST,
    //privateKey: 'your private key'
})
const limiter = new Bottleneck({ maxConcurrent: 1, minTime: 30 });
const contractAddress = process.env.VUE_APP_CONTRACT_ADDRESS;
tronWeb.setAddress(contractAddress);
//curl -F "url=https://e96c1d075bab.ngrok.io/api/message"  https://api.telegram.org/bot1362538970:AAHRf2X4X54xdCBbGT6pDreJeUP8z7WoPrc/setWebhook

const onTick = async () => {
    try {
        const Day = require('../models/day');
        const contract = await tronWeb.contract().at(contractAddress);
        const res = await contract.currentDay().call();
        console.log("CurrentDayyyy===>", tronWeb.fromSun(res._hex) * 1000000)
        const currentDay = tronWeb.fromSun(res._hex) * 1000000;
        let daysData = await Promise.all(
            Array.from(Array(currentDay).keys())
                .reverse()
                .map((i) => {
                    return limiter.schedule(async () => {
                        const res = await contract.dailyData(i).call({
                            shouldPollResponse: false,
                        });

                        const dayPayoutTotal = parseFloat(
                            tronWeb.fromSun(res.dayPayoutTotal._hex)
                        );
                        const dayDividends = parseFloat(
                            tronWeb.fromSun(res.dayDividends._hex)
                        );
                        const dayStakeSharesTotal = parseFloat(
                            tronWeb.fromSun(res.dayStakeSharesTotal._hex)
                        );
                        return {
                            day: i,
                            totalDividends: dayDividends,
                            stakeSharesTotal: dayStakeSharesTotal,
                            payoutTotal: dayPayoutTotal,
                        };
                    });
                })
        );

        daysData = daysData.reverse();
        daysData = daysData.slice(1);
        await Day.deleteMany();
        //socket.emit('newRecords', daysData);
        console.log('all recordsss to insert==>>>', daysData)
        const insertRes = await Day.insertMany(daysData)
        console.log('all recordsss inserted==>>>', insertRes.length)
    } catch (err) {
        console.log('an err occurred==>>>', err);
    }
}

onTick();

const job = new CronJob(
    '*/2 * * * *',
    onTick,
    null,
    false,
    'America/New_York'
);

module.exports = job;
