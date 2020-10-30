const { CronJob } = require('cron');
const asyncLib = require('async');
const rax = require('retry-axios');
const axios = require('axios');
rax.attach();

const onTickTock = async () => {
  try {
    const Event = require('../models/event')
    const noOfEventsInDB = await Event.countDocuments();
    console.log('no of records in DB==>>>', noOfEventsInDB)

    let allEvents = [];
    let nextLink = `${process.env.VUE_APP_TRON_FULL_HOST}/v1/contracts/${process.env.VUE_APP_CONTRACT_ADDRESS}/events?event_name=StakeEnd&only_confirmed=true&limit=200`;
    await asyncLib.doWhilst(async () => {
      try {
        // res = await axios.get("https://api.trongrid.io/v1/contracts/THsSSczBw9RRMJWYL5j2MtcgaPasL2xPGP/events?event_name=StakeEnd&only_confirmed=false&min_block_timestamp=2020-06-01T23%3A09&limit=200");
        const res = await axios.get(nextLink);
        //res2 = await axios.get("https://api.trongrid.io/v1/contracts/THsSSczBw9RRMJWYL5j2MtcgaPasL2xPGP/events?event_name=StakeEnd&only_confirmed=false&min_block_timestamp=2020-06-01T23%3A09&max_block_timestamp=2020-09-04T23%3A09&limit=200");
        //res = await axios.get("https://shasta.tronscan.org/v1/contracts/TEvNRAUUG8ZiYuUH42MKHnBKpmCtS3JvKJ/events?event_name=StakeStart&only_confirmed=true&min_block_timestamp=2020-06-01T23%3A09&max_block_timestamp=2020-09-04T23%3A09&limit=200");

        allEvents = allEvents.concat(res.data.data);
        nextLink = res.data.meta.links && res.data.meta.links.next;
        console.log("Data====>", res.data.data.length, 'nexxx==>>>', nextLink);
        return Boolean(nextLink);
      } catch (err) {
        console.log('an err occurred==>>>', err.response.data);
      }
    }, (hasMoreData, cb2) => {
      cb2(null, hasMoreData);
    });
    console.log('all eventsssss from API==>>>', allEvents.length)
    const insertRes = await Event.insertMany(allEvents, { ordered: false });
    console.log('all recordsss inserted==>>>', insertRes.length);
  } catch (err) {
    console.log('an err occurred==>>>', err);
  }
}



const job = new CronJob(
  '*/5 * * * *',
  onTickTock,
  null,
  false,
  'America/New_York'
);

module.exports = job;
