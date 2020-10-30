<template>
<div>
         <div id="hero" class="mb-3">
            <h1 data-aos="fade-up" data-aos-delay="200">DeFi Staking Platform built on <span>Tron</span></h1>
            <h2 data-aos="fade-up" data-aos-delay="400">Daily Auction Lobby, Daily Tron Dividends, Lucrative Staking System, Completely Decentralized.</h2>
            <div class="button-holder">
                <!-- <a href="./Auction" class="button arrow" >Auction Lobby</a>
                <a  href="./Stake" class="button arrow" target="_blank">Staking Lounge</a> -->
                <router-link  class="button" style="linear-gradient(272.25deg, rgba(81, 36, 255, 0.15) 0.08%, rgba(130, 98, 255, 0.15) 95.38%, rgba(138, 113, 234, 0.15) 95.38%);" to="/auction">Auction Lobby</router-link>
                <router-link  class="button" style="linear-gradient(272.25deg, rgba(81, 36, 255, 0.15) 0.08%, rgba(130, 98, 255, 0.15) 95.38%, rgba(138, 113, 234, 0.15) 95.38%);" :to="{name: 'Stake'}">Staking Lounge</router-link>
            </div>

            <p><b>Stake it till you make it - </b>Longer and Bigger Pays Better!</p>


        </div>
         <div class="bg-img-1" style="background-image: url('./assets/images/header_dots_circle.png')"></div>
        <div class="bg-img-2" style="background-image: url('images/header_dots_square.png')"></div>
        </div>
</template>

