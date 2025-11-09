<script setup>
import { ref, reactive } from 'vue'
import { currentTab, stats, changeTab, formatDollars } from './services/utils.js'
import './services/common.js'

import Home from './tabs/home.vue'
import Road from './tabs/road.vue'
import Work from './tabs/work.vue'
import Bank from './tabs/bank.vue'
import Casino from './tabs/casino.vue'

</script>

<template>
    <div class="content">
        <div v-if="currentTab == 'start-screen'" id="start-screen">
            <h1>Gamble V2</h1>
            <button @click="changeTab('home')">Play</button>
        </div>

        <div v-if="currentTab == 'home'">
            <Home></Home>
        </div>

        <div v-if="currentTab == 'road'">
            <Road></Road>
        </div>

        <div v-if="currentTab == 'work'">
            <Work></Work>
        </div>

        <div v-if="currentTab == 'bank'">
            <Bank></Bank>
        </div>

        <div v-if="currentTab == 'casino'">
            <Casino></Casino>
        </div>
    </div>

    <div class="sidebar">
        <h3>Stats</h3>
        <p>Money: <span>{{ formatDollars(stats.money) }}</span></p>
        <p>Day: <span>{{ stats.day }}</span></p>
        <p>Energy Points: <span>{{ "⚡".repeat(stats.energyPoints) }}</span></p>
    </div>
</template>

<style scoped>
#start-screen button {
    font-size: 2rem;
    padding: 30px;
}
</style>
