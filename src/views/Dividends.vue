<template>
  <div>
    <v-card class="mx-auto" flat>
      <v-card-title>TRON Dividends</v-card-title>
      <v-card-text>One of the benefits of Staking DSP is TRON dividends. At the end of each day a TRON dividends pool will be calculated and allocated to all the open stakes based on their stake amount. The TRON dividends pool comes from the total daily entry of auction lobby.The only way to receive TRON Dividends is having open stakes</v-card-text>
      <v-row class="ml-4 mr-4">
        <v-card-subtitle>Current Dividends Pool</v-card-subtitle>
        <v-text-field v-model="TRXDividends" outlined class="px-4" label required></v-text-field>
      </v-row>

      <!-- <v-card ><v-card-subtitle>Referral History</v-card-subtitle></v-card> -->
    </v-card>

    <v-card min-height="1375" class="mx-auto">
      <v-card-title>Dividend History</v-card-title>

      <line-chart :data="valuesObj"></line-chart>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import { contractAddress, zeroAddress} from '../config.js'

export default {
  data() {
    return {
      // charSettingsLt: {
      //     low: 0,
      //     showArea: true,
      //     width: '100%',
      //     height: '50vh',
      //     chartPadding: 50,
      //     labelOffset: 50,
      // },
      // chartDatLt: {
      //     // eslint-disable-next-line no-undef
      //     labels: days,
      //     series: [
      //         // eslint-disable-next-line no-undef
      //         values
      //     ]
      // },
      snackbar: false,
      values: [],
      valuesObj: [],
      text: "",
      auctionBtn: "Enter",
      currentItemIndex: -1,
      currentItem: null,
      TRXDividends: null,
      dialog: false,
      amountToStake: null,
      myObj: [],
      anotherObj: [],
      tempdata: {
        day: null,
      },
      user: {
        address: null,
        balance: null,
        referrer: zeroAddress,
      },
      day: null,
      amount: null,
      mainContract: {},
      endedStatesHeaders: [],
      currentDay: null,
      daysToStake: null,
      headers: [
        { text: "day", value: "day" },
        { text: "DSP Pool", value: "amount" },
        { text: "DSP/TRON", value: "ratio" },
        { text: "State", value: "state" },
        { text: "DSP Received", value: "received" },
        { text: "Your Entry", value: "entry" },
        { text: "Daily Entry", value: "dayEntry" },
        { text: "Status", value: "status" },
      ],
    };
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    const loginPromise = new Promise((resolve, reject) => {
      if (window.tronWeb && window.tronWeb.ready) {
        resolve(true);
      } else {
        window.addEventListener("load", () => {
          let timer = setInterval(() => {
            if (window.tronWeb && window.tronWeb.ready) {
              resolve(true);
            }
            clearInterval(timer);
          }, 200);
          setTimeout(() => {
            clearInterval(timer);
          }, 10000);
        });
      }
    })
      .then(() => {
        console.log("Tronweb installed and logged in");
        return true;
      })
      .catch((e) => {
        console.error("Error while detecting tronweb", e);
        return false;
      });

    // eslint-disable-next-line no-unused-vars
    loginPromise["then"]((data2) => {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        const userAddress = window.tronWeb.defaultAddress.base58;
        if (!userAddress) {
          return resolve(false);
        }
        this.user.address = userAddress;

        // eslint-disable-next-line no-unused-vars
        await this.setUpContracts();

        try {
          setInterval(() => {
            if (
              window.tronWeb &&
              this.user.address !== window.tronWeb.defaultAddress.base58
            ) {
              location.reload();
            }
          }, 700);
        } catch (err) {
          console.log("err==>>", err);
        }
      });
    });
  },
  methods: {
    setUpContracts(address) {
      return new Promise((resolve, reject) => {
        if (!contractAddress && !address) {
          return resolve(null);
        }
        window.tronWeb
          .contract()
          .at(contractAddress || address, async (err, data) => {
            if (!err) {
              this.mainContract = data;
              const res = await this.getCurrentDay();
              this.currentDay = window.tronWeb.fromSun(res._hex) * 1000000;
              //await this.runDividends();
              await this.getDivChartData();

              resolve();
            } else {
              console.error("data1 error==>>", err);
              reject(err);
            }
          });
      });
    },
    async getDivChartData() {
      try {
        // eslint-disable-next-line no-unused-vars

        const { data } = await axios.get(`/api/datapoints`);
        //this.valuesObj = Obje( [...data.map(d => ({day: d.day, point: d.datapoint}))]);
        this.valuesObj = data.reduce((a, b) => Object.assign(a, {[b.day]: b.datapoint}), {});
        console.log("chart data===>",this.valuesObj);
      } catch (err) {
        console.log("an err occurred==>>>", err);
      }
      // eslint-disable-next-line no-unused-vars
    },

    async runDividends() {
      this.mainContract
        .xfLobby(this.currentDay)
        .call({
          shouldPollResponse: true,
        })
        .then((_0x451ex2) => {
          // eslint-disable-next-line no-unused-vars
          this.TRXDividends =
            this.abbreviate_number(
              window.tronWeb["fromSun"](_0x451ex2._hex),
              2
            ) + " TRX";
          console.log("DIVs===>", this.TRXDividends);
        });
    },
    getCurrentDay: function () {
      return this.mainContract.currentDay().call({
        shouldPollResponse: true,
      });
    },

    abbreviate_number(item, precision) {
      let floatNum = parseFloat(item);
      if (floatNum === null) {
        return null;
      }
      if (floatNum === 0) {
        return "0";
      }
      precision = !precision || precision < 0 ? 0 : precision;
      const _0xe5a7x23 = floatNum["toPrecision"](2)["split"]("e"),
        _0xe5a7x24 =
          _0xe5a7x23["length"] === 1
            ? 0
            : Math["floor"](Math["min"](_0xe5a7x23[1]["slice"](1), 14) / 3),
        _0xe5a7x25 =
          _0xe5a7x24 < 1
            ? floatNum["toFixed"](0 + precision)
            : (floatNum / Math["pow"](10, _0xe5a7x24 * 3))["toFixed"](
                1 + precision
              ),
        _0xe5a7x26 = _0xe5a7x25 < 0 ? _0xe5a7x25 : Math["abs"](_0xe5a7x25),
        response = _0xe5a7x26 + ["", "K", "M", "B", "T"][_0xe5a7x24];
      return response;
    },
  },
};
</script>
