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

const onTick = async () => {
    try {
        const dataPoints = require('../models/datapoints');
        const contract = await tronWeb.contract().at(contractAddress);
        const res = await contract.currentDay().call();
        const currentDay = tronWeb.fromSun(res._hex) * 1000000;
        // eslint-disable-next-line no-unused-vars
        let data = await Promise.all(
            Array.from(Array(currentDay-1).keys())
                .reverse()
                .map((i) => {
                    return limiter.schedule(async () => {
                        const res = await contract.xfLobby(i).call({
                            shouldPollResponse: false,
                        });

                        let dp = (parseFloat(tronWeb.fromSun(res)) / 1000000)
                        //console.log("dppppppp===>>>",dp);
                        return{
                            day: i,
                            datapoint: dp,
                        };
                    });
                })
        );
       

        await dataPoints.deleteMany();
        console.log('all recordsss to insert==>>>', data.length)
        const insertRes = await dataPoints.insertMany(data)
        console.log('all recordsss inserted==>>>', insertRes.length)
    } catch (err) {
        console.log('an err occurred==>>>', err);
    }
}

const job = new CronJob(
    '*/2 * * * *',
    onTick,
    null,
    false,
    'America/New_York'
);

module.exports = job;
