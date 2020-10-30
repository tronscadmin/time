//you need to import both vue and vuex, as both are used here
import Vue from "vue";
import Vuex from "vuex";
//then you use Vuex
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        mainContract: {},
        walletAddress: null,
        walletAddressFromHex: null,
        DESI: 100000000,
        SUN: 1000000,
        LPB: 1820,
        LPB_MAX_DAYS: 3640,
        BPB_MAX_HEARTS: 7 * 1000000 * 100000000,
        BPB: (((7 * 1000000 * 100000000)) * 100) / 10,


},
    mutations: {
    mainContract: (state, contract) => { state.mainContract = contract; },
    walletAddress: (state, address) => { state.walletAddress = address; },
    walletAddressFromHex: (state, address) => { state.walletAddressFromHex = address; }
}
});