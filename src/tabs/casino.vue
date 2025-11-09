<script setup>
import { currentTab, stats, changeTab, showWinnings } from '../services/utils'
import { ref } from 'vue';

const currentGamblingTab = ref("plinko")

import Plinko from '../casino-components/plinko.vue';


</script>

<template>
    <h1>Lotta MONEY Casino</h1>
    <h3>Not affiliated with Lotta MONEY Bank</h3>
    <button @click="changeTab('bank')">Cross Skybridge</button>
    <div id="gamble-tabs">
        <button @click="currentGamblingTab = 'plinko'">Plinko</button>
        <button @click="currentGamblingTab = 'mines'">Mines</button>
        <button @click="currentGamblingTab = 'crash'">Crash</button>
        <button @click="currentGamblingTab = 'ladder'">Ladder</button>
    </div>
    <div v-if="currentGamblingTab = 'plinko'">
        <Plinko></Plinko>
    </div>
    <h3>We hope you had a pleasant stay!</h3>
    <button @click="changeTab('road')">Exit Casino</button>
</template>

<style scoped>
#gamble-tabs {
    margin-top: 10px;
    display: flex;
    background-color: var(--color-surface0);
    padding: 10px;
    border-radius: 15px;
}

button {
    margin-right: 10px;
}
</style>