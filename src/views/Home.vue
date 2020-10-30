<template>
  <div>
    <HomeHero />
    <HomeBenefits />
    <HomeCommunity class="mt-5" />

  </div>
</template>



<script>
// eslint-disable-next-line no-unused-vars

import HomeHero from "@/components/HomeHero";
import HomeBenefits from "@/components/HomeBenefits";
import HomeCommunity from '@/components/HomeCommunity'

export default {
  components: {
    HomeHero,
    HomeBenefits,
     HomeCommunity
  },
  mounted() {
    const referrerAddress = this.$route.query.ref;
    if (referrerAddress) {
      localStorage.setItem("referrerAddress", referrerAddress);
    }
  },
  
};
</script>


