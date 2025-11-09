import { ref, reactive } from 'vue'
import Toastify from 'toastify-js'

export const currentTab = ref('start-screen')
export const stats = reactive({
    money: 1000,
    day: 0,
    energyPoints: 5,
    home: {
        furniture: [
            { name: "Chair", price: 89 },
            { name: "Chair", price: 89 },
            { name: "Chair", price: 89 },
            { name: "Broken Chair", price: 49 },
            { name: "Couch", price: 498 },
            { name: "Television", price: 229 },
            { name: "Laptop", price: 599 },
            { name: "Coffee Table", price: 134 },
            { name: "Dining Table", price: 379 },
            { name: "Office Desk", price: 289 },
            { name: "Desk Lamp", price: 39 },
            { name: "Floor Lamp", price: 79 },
            { name: "Nightstand", price: 129 },
            { name: "Wardrobe", price: 549 },
            { name: "Dining Chair", price: 99 },
            { name: "Storage Cabinet", price: 329 },
            { name: "Printer", price: 129 },
            { name: "Rug", price: 179 },
            { name: "Mirror", price: 119 },
            { name: "Bookshelf", price: 159 },
            { name: "Dresser", price: 439 },
            { name: "Bean Bag", price: 89 },
            { name: "Patio Chair", price: 99 },
            { name: "Ceiling Fan", price: 149 },
            { name: "Heater", price: 199 },
            { name: "Mini Fridge", price: 249 },
            { name: "Filing Cabinet", price: 189 },
        ],
    },
    work: {
        pattiesGrilled: 0
    },
    bank: {
        loans: [],
        creditScore: 750
    }

})

export function changeTab(newTab) {
    currentTab.value = newTab
}

export function formatDollars(amount) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })

    return formatter.format(amount)
}

export function playSound(path) {
    const audio = new Audio(path)
    audio.play()
}

export function showWinnings(change) {
    let text = "+$" + change
    let color = "rgba(176, 253, 141, 0.7)"

    if (change < 0) {
        text = "-$" + change
        color = "rgba(253, 141, 141, 0.7)"
    } else {
        playSound("/audio/ka-ching.mp3")
    }

    showToast(text, color)
}

export function showToast(text, color) {
    Toastify({
        text: text,
        duration: 3000,
        destination: "",
        newWindow: false,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        escapeMarkup: true,
        style: {
            background: color,
        }
    }).showToast()
}

export function lerpColor(a, b, amount) { 

    var ah = parseInt(a.replace(/#/g, ''), 16),
        ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
        bh = parseInt(b.replace(/#/g, ''), 16),
        br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
}

const MIN_INTEREST_RATE = 0.05
const MAX_INTEREST_RATE = 1

export function getInterestRate() {
    const t = (1000 - stats.bank.creditScore) / 1000
    return (MIN_INTEREST_RATE ** (1 - t)) * (MAX_INTEREST_RATE ** t)
}

export function wait(t) {
    return new Promise((res)=>{
        setTimeout(res, t);
    })
}