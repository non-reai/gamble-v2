<script setup>
import { ref } from 'vue'
import { currentTab, stats, changeTab, showWinnings, formatDollars, wait, showToast } from '../services/utils'

function sellFurniture(index) {
    const furniture = stats.home.furniture.splice(index, 1)[0]
    stats.money += Math.floor(furniture.price)

    showWinnings(Math.floor(furniture.price))
}

const sleeping = ref(false)
const sleepMessage = ref("")
const sleepOverlayStyle = ref("")

async function sleep() {
    sleepMessage.value = ""

    sleepOverlayStyle.value = "opacity: 1; z-index: 100;"

    sleeping.value = true

    // await wait(1500)

    sleepMessage.value = "hello twin"

    // await wait(1000)

    sleepMessage.value = "another day tmr"

    // await wait(1500)

    sleepMessage.value = "we should go gambling"

    // await wait(1500)

    sleepMessage.value = "(im your subconcious btw)"

    sleepOverlayStyle.value = "z-index: 100;"

    setTimeout(() => {
        sleepOverlayStyle.value = ""
    }, 1000);

    stats.day += 1
    stats.energyPoints = 5
    showToast("Rise and Shine", "#dbc93b")

    sleeping.value = false
}
</script>

<template>
    <h1>Your Home</h1>
    <div>
        <h2>The Foyer</h2>
        <button @click="changeTab('road')">Exit your house</button>
    </div>
    <div>
        <h2>The Bedroom</h2>
        <button @click="sleep()">Sleep in bed</button>
    </div>
    <div id="furniture">
        <h2>Furniture</h2>
        <ul>
            <li v-for="(furniture, index) in stats.home.furniture">
                <span class="furniture">{{ furniture.name }} ({{ formatDollars(furniture.price) }})</span>
                <button @click="sellFurniture(index)">Sell!</button>
            </li>
        </ul>
    </div>
    <div id="sleep-overlay" :style="sleepOverlayStyle">
        <h1>{{ sleepMessage }}</h1>
    </div>
</template>

<style scoped>
#furniture > ul > li > button {
    margin-left: 10px;
}

#sleep-overlay {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: black;
    opacity: 0;
    transition: opacity 1s;
    z-index: -100;
}

.furniture {
    display: inline-block;
    width: 15vw;
}
</style>