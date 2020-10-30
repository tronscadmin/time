<template>
<v-app>
    <header class="container-fluid container-lg">
        <div class="row">
            <div class="col-md-2 col-lg-2">
                <v-app-bar-nav-icon style="position=relative" class="hidden-md-and-up" large @click.stop="drawer = !drawer" dark></v-app-bar-nav-icon>
                <a href="/" class="logo" data-aos="fade-down" data-aos-delay="600">
                    <img src="./assets/images/DefiStakingPlatform_logo_transparent-v3.png" alt="DSP Logo" />
                </a>

            </div>

            <div class="col-md-10 col-lg-10">

                <ul class="menu">
                    <li>
                        <!-- <a href="Stake">Stake</a> -->
                        <router-link :to="{name: 'Stake'}">Stake</router-link>
                    </li>
                    <li>
                        <!-- <a href="Auction">Auction</a> -->
                        <router-link to="/auction">Auction</router-link>
                    </li>

                    <li>
                        <!-- <a href="Referral">Referral</a> -->
                        <router-link to="/referral">Referral</router-link>
                    </li>
                    <li>
                        <a href="https://tronscan.org/#/contract/TUCjCMAwbpmeACMBkedFh9N5u3fUmpCrQ7">Contract</a>
                    </li>
                    <countdown :time="countdownTime" :transform="transform">
                        <template slot-scope="props"> <a class="btn-circle-address" style="background: linear-gradient(272.25deg, rgba(81, 36, 255, 0.15) 0.08%, rgba(130, 98, 255, 0.15) 95.38%, rgba(138, 113, 234, 0.15) 95.38%);border: 1px solid #8161ff">Auction Ends {{ props.hours }} : {{ props.minutes }} : {{ props.seconds }}</a></template>
                    </countdown>
                    <li>
                        <a class="btn-circle-address" style="background: linear-gradient(272.25deg, rgba(81, 36, 255, 0.15) 0.08%, rgba(130, 98, 255, 0.15) 95.38%, rgba(138, 113, 234, 0.15) 95.38%); border: 1px solid #8161ff">{{myAccAdd}}</a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
    <v-navigation-drawer v-model="drawer" absolute right temporary>
        <v-list nav dense>
            <v-list-item-group active-class="deep-purple lighten-3">
                <router-link to="/">
                    <v-list-item>Home</v-list-item>
                </router-link>
                <router-link to="/stake">
                    <v-list-item>Stake</v-list-item>
                </router-link>
                <router-link to="/auction">
                    <v-list-item>Auction</v-list-item>
                </router-link>
                <router-link to="/referral">
                    <v-list-item>Referral</v-list-item>
                </router-link>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
    <v-main>
        <router-view></router-view>
    </v-main>
    <div>
        <footer>
            <div class="container-fluid">
                <div class="row footer-wrapper">
                    <div class="col-md-5">
                        <div class="logo-wrapper">
                            <img src="./assets/images/DefiStakingPlatform_logo_transparent-v3.png" alt="DeFi Staking Platform Logo" />
                        </div>

                        <div class="social-wrapper">
                            <ul class="social-links gray">
                                <li>
                                    <a href="https://t.me/dsptokenchat" target="_blank">
                                        <i class="fab fa-telegram-plane"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/StakingDefi" target="_blank">
                                        <i class="fab fa-twitter"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <ul class="footer-menu">
                            <li>
                                <router-link v-bind:to="'/stake'">Stake</router-link>
                                <!-- <a href="./Stake">Stake</a> -->
                            </li>
                            <li>
                                <router-link v-bind:to="'/auction'">Auction</router-link>
                                <!-- <a href="./Auction">Auction</a> -->
                            </li>
                            <li>
                                <router-link v-bind:to="'/referral'">Referral</router-link>
                                <!-- <a href="./Referral">Referral</a> -->
                            </li>
                            <li>

                                <a href="https://tronscan.org/#/contract/TUCjCMAwbpmeACMBkedFh9N5u3fUmpCrQ7">Contract</a>
                            </li>
                        </ul>
                    </div>
                    <!-- connectTron(); -->
                </div>

                <!-- <p class="copyright">&copy; 2020 - DeFiStakingPlatform.app</p> -->
            </div>
        </footer>
    </div>
</v-app>
</template>

<script>
/* eslint-disable no-unused-vars */
import moment from "moment-timezone";
import { contractAddress, zeroAddress } from "./config";

let holder,
    clcD1 = true,
    clcD2 = true;

export default {
    name: "App",
    data: () => ({
        countdownTime: null,
        group: null,
        drawer: false,
        events: [],
        stVal1: null,
        stVal12: null,
        stVal8: null,
        myEndedStakesList: null,
        stakeData: {
            entered_amount: 0,
            entered_days: 0,
            currentDay: void 0,
            stakingShare: void 0,
            clc_1: 0,
            clc_2: 0,
            shareRate: 0,
        },
        myAccAdd: "",
        mainContract: null,
        currentDay: null,
        yourTokenBalanceHd: "",
        user: {
            address: null,
            balance: null,
            referrer: zeroAddress,
        },
    }),
    watch: {
        group() {
            this.drawer = false;
        },
    },
    methods: {
        transform(props) {
            Object.entries(props).forEach(([key, value]) => {
                // Adds leading zero
                const digits = value < 10 ? `0${value}` : value;

                // uses singular form when the value is less than 2
                const word = value < 2 ? key.replace(/s$/, '') : key;

                props[key] = `${digits}`;
            });

            return props;
        },
        accessCookie(_0xe5a7x3a) {
            let _0xe5a7x3b = _0xe5a7x3a + "=";
            let _0xe5a7x3c = document["cookie"]["split"](";");
            for (
                let _0xe5a7x3d = 0; _0xe5a7x3d < _0xe5a7x3c["length"]; _0xe5a7x3d++
            ) {
                let _0xe5a7x3e = _0xe5a7x3c[_0xe5a7x3d]["trim"]();
                if (_0xe5a7x3e["indexOf"](_0xe5a7x3b) == 0) {
                    return _0xe5a7x3e["substring"](
                        _0xe5a7x3b["length"],
                        _0xe5a7x3e["length"]
                    );
                }
            }
            return "";
        },

        validateAddress(_0xe5a7x40) {
            if (typeof _0xe5a7x40 !== "string") {
                return false;
            }
            if (_0xe5a7x40[0] === "T" && _0xe5a7x40["length"] == 34) {
                return true;
            }
            return false;
        },
        updateHeadAddress() {
            const abrAddress = this.user["address"]["slice"](34 - 5);
            this.myAccAdd = this.user["address"]["slice"](0, 5) + "..." + abrAddress;
        },
        setUpContracts(address) {
            if (!contractAddress && !address) {
                return null;
            }
            window.tronWeb["contract"]()["at"](
                contractAddress || address,
                (data1, data2) => {
                    if (!data1) {
                        this.mainContract = data2;
                        //this.$store.commit('mainContract', data2);
                        this.mainContract.stakeLists().call({
                            address: this.user.address,
                        });
                        //console.log('mainn==>>>', )
                        this.contractLoaded();
                    } else {
                        console.error("data1 error==>>", data1);
                    }
                }
            );
        },
        contractLoaded() {
            if (!this.user.address) {
                return;
            }
            this.getUserBalance();
            setInterval(() => {
                this.getUserBalance();
            }, 1000 * 6);
            this.getCurrentDay();
            const _0xe5a7x1c = setInterval(() => {
                if (this.currentDay) {
                    clearInterval(_0xe5a7x1c);
                    // console.log('run_Stake==>>>', typeof run_Stake, 'run_Auction==>>', typeofrun_Auction, 'run_Dividends')
                    if (typeof this.run_Stake === "function") {
                        this.run_Stake();
                    }
                    if (typeof this.run_Auction === "function") {
                        //run_Auction();
                    }
                    if (typeof this.run_Dividends === "function") {
                        //run_Dividends();
                    }
                }
            }, 100);
        },
        getUserBalance() {
            this.mainContract
                .balanceOf(this.user.address)
                .call({
                    shouldPollResponse: false,
                })
                .then((_0xe5a7x3) => {
                    this.user["balance"] =
                        parseFloat(window.tronWeb.fromSun(_0xe5a7x3)) / 100;
                    this.yourTokenBalanceHd =
                        "Your D2X balance: " + this.user["balance"]["toLocaleString"]();
                });
        },
        getCurrentDay() {
            this.mainContract
                .globalInfo()
                .call({
                    shouldPollResponse: true,
                })
                .then((_0xe5a7x3) => {
                    this.currentDay =
                        window.tronWeb.fromSun(_0xe5a7x3[4]._hex) * this.SUN;
                });
        },
        run_Stake(nIrstRn) {
            console.log("in run_Stake==>>>");
            this.mainContract
                .globalInfo()
                .call({
                    shouldPollResponse: true,
                })
                .then((res) => {
                    this.stakeData.stakingShare =
                        window.tronWeb.fromSun(res[2]["_hex"]) * this.SUN;
                    this.stVal1 = this.currentDay + 1;

                    this.stakeData.shareRate =
                        (100000 / this.stakeData.stakingShare) * 100000000;
                    this.stVal12 =
                        this.abbreviate_number(this.stakeData.shareRate, 2) + "/D2X";
                });

            this.mainContract
                .xfLobby(this.currentDay)
                .call({
                    shouldPollResponse: true,
                })
                .then((res) => {
                    this.stVal8 =
                        this.abbreviate_number(window.tronWeb.fromSun(res._hex), 2) +
                        " TRX";
                });

            if (nIrstRn) return;

            this.getMyEndedStakes();
            // getDaysData();
            // estimateNextDay();
        },
        abbreviate_number(_0xe5a7x20, _0xe5a7x21) {
            let _0xe5a7x22 = parseFloat(_0xe5a7x20);
            // if (_0xe5a7x22 === null) {
            //     return null;
            // }
            // if (_0xe5a7x22 === 0) {
            //     return "0";
            // }
            // _0xe5a7x21 = !_0xe5a7x21 || _0xe5a7x21 < 0 ? 0 : _0xe5a7x21;
            // const _0xe5a7x23 = _0xe5a7x22["toPrecision"](2)["split"]("e"),
            //     _0xe5a7x24 =
            //     _0xe5a7x23["length"] === 1 ?
            //     0 :
            //     Math["floor"](Math["min"](_0xe5a7x23[1]["slice"](1), 14) / 3),
            //     _0xe5a7x25 =
            //     _0xe5a7x24 < 1 ?
            //     _0xe5a7x22["toFixed"](0 + _0xe5a7x21) :
            //     (_0xe5a7x22 / Math["pow"](10, _0xe5a7x24 * 3))["toFixed"](
            //         1 + _0xe5a7x21
            //     ),
            //     _0xe5a7x26 = _0xe5a7x25 < 0 ? _0xe5a7x25 : Math["abs"](_0xe5a7x25),
            //     response = _0xe5a7x26 + ["", "K", "M", "B", "T"][_0xe5a7x24];
            // return response;
            return _0xe5a7x22;
        },

        async getMyEndedStakes() {},
        renderMyEndedStakes(data) {},
    },
    mounted() {

        this.countdownTime = moment.utc().add(1, 'day').startOf("day").tz("Etc/UTC").valueOf() - moment.utc().tz("Etc/UTC").valueOf();

        if (this.accessCookie("ref")["length"] > 0) {
            if (this.validateAddress(this.accessCookie("ref"))) {
                this.user["referrer"] = this.accessCookie("ref");
            }
        }
    },
    async created() {
        console.log("created in app");
        const loginPromise = new Promise((resolve, reject) => {
                if (window["tronWeb"] && window["tronWeb"]["ready"]) {
                    resolve(true);
                } else {
                    window["addEventListener"]("load", () => {
                        let poller = setInterval(() => {
                            if (window["tronWeb"] && window["tronWeb"]["ready"]) {
                                resolve(true);
                            }
                            clearInterval(poller);
                        }, 200);
                        setTimeout(() => {
                            clearInterval(poller);
                        }, 10000);
                    });
                }
            })
            .then(() => {
                console["log"]("Tronweb installed and logged in");
                return true;
            })
            .catch((e) => {
                console["error"]("Error while detecting tronweb", e);
                return false;
            });

        await loginPromise["then"]((data2) => {
            return new Promise((resolve, reject) => {
                const userAddress = window["tronWeb"]["defaultAddress"]["base58"];
                if (!userAddress) {
                    return resolve(false);
                }
                this.user.address = userAddress;
                let formatToHexAddress = window.tronWeb.address.toHex(userAddress);
                formatToHexAddress = "0x" + formatToHexAddress.slice(2);
                this.updateHeadAddress();
                setInterval(() => {
                    if (
                        window["tronWeb"] &&
                        this.user["address"] !==
                        window["tronWeb"]["defaultAddress"]["base58"]
                    ) {
                        location["reload"]();
                    }
                }, 700);
            });
        });
    },
};
</script>

<style>
@import "./assets/css/styles.css";
@import "./assets/css/all.min.css";

#app {
    background-color: var(--v-background-base);
    background-image: url("./assets/images/brilliant.png");
    background-repeat: repeat;
}

ul,
li,
a,
p {
    color: #888888 !important;
}

.button {
    background: #8262ff;
    background: linear-gradient(90deg, #8262ff 0%, #5124ff 100%);
    border-radius: 100px;
    color: #ffffff !important;
    display: block;
    padding: 1.25em;
    text-align: center;
    font-weight: bold;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

</style>
