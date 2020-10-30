<template>
<v-app-bar color="accent-4" dark>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <!-- <a href="/" class="logo" data-aos="fade-down" data-aos-delay="600">
                    <img src="" alt="UniTrade Logo" />
                </a> -->
    <v-img class="mx-2" src="../assets/images/DefiStakingPlatform_logo_transparent-adjusted.png" max-height="275" max-width="275" contain></v-img>

    <v-spacer></v-spacer>

    <v-switch v-model="isDark" v-on:click="setTheme"></v-switch>

    <v-tabs right>
        <v-tab to="Stake">Stake</v-tab>
        <v-tab to="Auction">Auction</v-tab>
        <v-tab>Dividends</v-tab>
        <v-tab>Referral</v-tab>
        <v-tab>FAQ</v-tab>
    </v-tabs>
    {{isDark}}
</v-app-bar>
</template>

<script>
export default {
    data: () => ({
        isDark: true,

    }),
    method: {
        setTheme() {
            if (this.isDark) {
                this.$vuetify.theme.dark = true
            } else {
                this.$vuetify.theme.dark = false

            }
        }

    }

}
</script>
