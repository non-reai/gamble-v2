<script setup>
import { currentTab, stats, changeTab, showToast } from '../services/utils'

function changeTabWithEnergy(place) {
    if (stats.energyPoints <= 0) {
        showToast("No Energy Left!", "#666666")
        return
    }
    stats.energyPoints -= 1
    changeTab(place)
}
</script>

<template>
    <h1>The Road</h1>
    <div id="road">
        <div>
            <div>
                <!-- Left -->
                <h3>Go Left</h3>
                <button @click="changeTabWithEnergy('work')">Work</button>
                <button @click="changeTabWithEnergy('furniture-store')">Furniture Store</button>
            </div>
            <div>
                <!-- Right -->
                <h3>Go Right</h3>
                <button @click="changeTabWithEnergy('casino')">Casino</button>
                <button @click="changeTabWithEnergy('bank')">Bank</button>
            </div>
        </div>
        <div>
            <!-- Bottom -->
            <button @click="changeTab('home')">Go home</button>
        </div>
    </div>
</template>

<style scoped>
#road {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;
}

#road > div {
    display: flex;
    flex-grow: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
}

#road > div:nth-child(1) {
    display: flex;
    flex-grow: 1;
    justify-content: space-evenly;
    align-items: center;
}

#road > div:nth-child(1) > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

#road button {
    margin-bottom: 10px;
    width: 50%;
}
</style>