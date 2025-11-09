<script setup>
import { reactive, ref } from 'vue';
import { currentTab, stats, changeTab, showWinnings, playSound, showToast } from '../services/utils'

const pattyStatesData = [
    { // empty state
        classes: [],
        buttonName: "Place patty",
        cooldownTimeToNextState: 0 // in milliseconds
    },
    { // placed raw patty
        classes: ["patty"],
        buttonName: "Cook patty",
        cooldownTimeToNextState: 0
    },
    { // cooked patty
        classes: ["patty"],
        sound: "/audio/sizzle.mp3",
        buttonName: "Flip",
        cooldownTimeToNextState: 3000
    },
    { // placed raw patty
        classes: ["patty","cooked"],
        buttonName: "Cook other side",
        cooldownTimeToNextState: 0
    },
    { // cooked patty
        classes: ["patty","cooked"],
        sound: "/audio/sizzle.mp3",
        buttonName: "Pick up patty",
        cooldownTimeToNextState: 3000
    }
]
const pattyStates = reactive([
    {
        state: 0,
        time: Date.now()
    },
    {
        state: 0,
        time: Date.now()
    },
    {
        state: 0,
        time: Date.now()
    },
    {
        state: 0,
        time: Date.now()
    },
    {
        state: 0,
        time: Date.now()
    },
    {
        state: 0,
        time: Date.now()
    },
    {
        state: 0,
        time: Date.now()
    },
    {
        state: 0,
        time: Date.now()
    }
])

function translatePattyStateToClasses(index) {
    const currentState = pattyStates[index]
    const classes = []
    classes.push("patty-spot")

    pattyStatesData[currentState.state].classes.forEach((classData)=>{
        classes.push(classData)
    })

    return classes.join(' ')
}

function advancePattyState(index) {
    let canAdvance = false
    let currentState = pattyStates[index]

    if (Date.now() - currentState.time > pattyStatesData[currentState.state].cooldownTimeToNextState) {
        canAdvance = true
    }

    if (canAdvance) {
        pattyStates[index].state += 1
        pattyStates[index].time = Date.now()
    }

    if (pattyStates[index].state >= pattyStatesData.length) {
        stats.work.pattiesGrilled += 1
        stats.money += 6
        showWinnings(6)
        pattyStates[index].state = 0
    }

    if (pattyStatesData[pattyStates[index].state].sound && canAdvance) {
        playSound(pattyStatesData[pattyStates[index].state].sound)
    }
}

function getButtonNameFromIndex(index) {
    return pattyStatesData[pattyStates[index].state].buttonName
}

</script>

<template>
    <h1>Wendies</h1>
    <button @click="changeTab('road')">Exit Wendies</button>
    <!-- maybe float this div towards the left? or have it position: sticky / fixed? -->
    <!-- <div>
        <h2>Customers</h2>
        <ul>
            <li>
                <span>jimbob</span>
                <span> - </span>
                <span></span>
            </li>
        </ul>
    </div> -->
    <div>
        <div>
            <h2>Grill</h2>
            <p>Patties grilled: {{ stats.work.pattiesGrilled }}</p>
            <!-- burger station -->
            <div class="grill">
                <div class="burgers-row">
                    <button :class="translatePattyStateToClasses(0)" @click="advancePattyState(0, $event)">{{ getButtonNameFromIndex(0) }}</button>
                    <button :class="translatePattyStateToClasses(1)" @click="advancePattyState(1, $event)">{{ getButtonNameFromIndex(1) }}</button>
                    <button :class="translatePattyStateToClasses(2)" @click="advancePattyState(2, $event)">{{ getButtonNameFromIndex(2) }}</button>
                    <button :class="translatePattyStateToClasses(3)" @click="advancePattyState(3, $event)">{{ getButtonNameFromIndex(3) }}</button>
                </div>
                <div class="burgers-row">
                    <button :class="translatePattyStateToClasses(4)" @click="advancePattyState(4, $event)">{{ getButtonNameFromIndex(4) }}</button>
                    <button :class="translatePattyStateToClasses(5)" @click="advancePattyState(5, $event)">{{ getButtonNameFromIndex(5) }}</button>
                    <button :class="translatePattyStateToClasses(6)" @click="advancePattyState(6, $event)">{{ getButtonNameFromIndex(6) }}</button>
                    <button :class="translatePattyStateToClasses(7)" @click="advancePattyState(7, $event)">{{ getButtonNameFromIndex(7) }}</button>
                </div>
            </div>
        </div>
    </div>
    <!-- <div>
        <h2>Assembly</h2>
        <p>Patties - {{ patties }}</p>
        <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div> -->
</template>

<style scoped>
.burgers-row {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    aspect-ratio: 5 / 1;
}

.patty-spot {
    position: relative;
    display: inline-block;
    width: 10%;
    border: dotted rgba(255,255,255,0.3);
    background-color: transparent;
    border-radius: 20px;
    aspect-ratio: 1 / 1;
}

.patty {
    background-color: #e23232;
}

.patty.cooked {
    background-color: #66522b;
}

.grill {
    background-color: rgb(39, 39, 39);
    border-radius: 20px;
}



</style>