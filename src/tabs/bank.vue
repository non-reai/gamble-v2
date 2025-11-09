<script setup>
import { reactive } from 'vue'
import { currentTab, stats, changeTab, showWinnings, formatDollars, getInterestRate, showToast } from '../services/utils'

// helper functions
function giveLoan(money) {
    stats.bank.loans.push({
        id: Date.now(),
        dayLent: stats.day,
        dueDate: stats.day + 5,
        amount: money
    })
    stats.money += money
    showWinnings(money)
}

const loansHeader = ["ID", "Amount", "Due Date", "Interest", "Total"]
const loansFooters = ["", "", "", "", "Total"]

function getLoansTableString(footer = true) {
    const loans = stats.bank.loans

    const table = document.createElement('table')
    const headerRow = document.createElement('tr')
    loansHeader.forEach((header)=>{
        const headerElement = document.createElement('th')
        headerElement.innerText = header
        headerRow.appendChild(headerElement)
    })
    table.appendChild(headerRow)
    
    loans.forEach((loan)=>{
        const loanRow = document.createElement('tr')
        const interest = loan.amount * (1 + getInterestRate()) ** (stats.day - loan.dayLent) - loan.amount
        const values = [loan.id, formatDollars(loan.amount), "Day "+loan.dueDate, formatDollars(interest), formatDollars(loan.amount + interest)]
        values.forEach((value)=>{
            const valueElement = document.createElement('td')
            valueElement.innerText = value
            loanRow.appendChild(valueElement)
        })
        table.appendChild(loanRow)
    })

    if (footer) {
        const footerValues = document.createElement('tr')
        loansFooters.forEach((header)=>{
            const footerElement = document.createElement('th')
            if (header == "Total") {
                let loansTotal = 0

                loans.forEach((loan)=>{
                    const interest = loan.amount * (1 + getInterestRate()) ** (stats.day - loan.dayLent) - loan.amount
                    loansTotal += loan.amount + interest
                })

                
                footerElement.innerText = formatDollars(loansTotal)
            }
            footerValues.appendChild(footerElement)
        })

        table.appendChild(footerValues)
    }

    return table.outerHTML
}

// actual dialog tree

const tree = {
    "start": {
        text: "Welcome to <strong>Lotta MONEY Bank</strong>, where we <strong>Super charge</strong> your wallet! How can I help?",
        options: [
            { next: "take-loan", text: "Take a Loan" },
            { next: "pay-loan", text: "Pay a Loan" },
            { next: "show-loan", text: "Show Loans" },
        ]
    },
    "take-loan": {
        text: "How much would you like?",
        options: [
            { next: "gave-loan-500", text: "$500" },
            { next: "gave-loan-1000", text: "$1,000" },
            { next: "gave-loan-5000", text: "$5,000" },
            { next: "gave-loan-10000", text: "$10,000" },
            { next: "gave-loan-100000", text: "$100,000" },
            { next: "gave-loan-500000", text: "$500,000" },
            { next: "gave-loan-1000000", text: "$1,000,000" }
        ]
    },
    "pay-loan": {
        text: "Here are your outstanding loans:",
        func: ()=>{
            const loans = getLoansTableString(false)

            chatElements.push({
                type: "text",
                content: "Your current interest rate: <strong>" + Math.trunc(getInterestRate() * 10000) / 100 + "%</strong>"
            })

            const div = document.createElement('div')
            div.innerHTML = loans
            const table = div.firstChild.firstChild
            table.childNodes.forEach((rowNode, index)=>{
                if (index == 0) {
                    const header = document.createElement('th')
                    header.innerText = "Pay Back"
                    rowNode.appendChild(header)
                    return
                }

                const td = document.createElement('td')
                const checkbox = document.createElement('input')
                checkbox.type = "checkbox"
                td.appendChild(checkbox)
                rowNode.appendChild(td)
            })
            chatElements.push({
                type: "text",
                content: div.innerHTML
            })
        },
        options: [
            { next: "pay-selected", text: "Pay selected loans" }
        ]
    },
    "show-loan": {
        text: "Here are your outstanding loans:",
        end: true,
        func: () => { // show table for loans
            const loans = getLoansTableString()
            chatElements.push({
                type: "text",
                content: "Your current interest rate: <strong>" + Math.trunc(getInterestRate() * 10000) / 100 + "%</strong>"
            })
            chatElements.push({
                type: "text",
                content: loans
            })
        }
    },
    "pay-selected": {
        text: "Thank you for paying back your loans!",
        end: true,
        func: ()=>{
            const checkboxes = document.querySelectorAll(".chat input[type='checkbox']")
            checkboxes.forEach((checkbox)=>{
                const loanId = checkbox.parentElement.parentElement.firstChild.innerText
                console.log(checkbox.checked)
                if (checkbox.checked == false) {
                    return
                }

                const loanIndex = stats.bank.loans.findIndex(element => element.id == loanId)
                if (loanIndex == -1) {
                    return
                }
                const loan = stats.bank.loans[loanIndex]
                const interest = loan.amount * (1 + getInterestRate()) ** (stats.day - loan.dayLent) - loan.amount
                if (stats.money < loan.amount + interest) {
                    showToast("Can't afford to pay back loan #"+loanId, "#f53636")
                    return
                }

                stats.money -= loan.amount + interest
                stats.bank.loans.splice(loanIndex,1)
                showToast(`Paid back loan #${loanId}, thank you for doing business with Lotta MONEY Bank!`, "#36f57c")
            })
        }
    },
    "gave-loan-500": {
        text: "Thank you for taking out a loan of $500 at Lotta MONEY Bank! Please pay back in 5 days!",
        end: true,
        func: () => { giveLoan(500) }
    },
    "gave-loan-1000": {
        text: "Thank you for taking out a loan of $1,000 at Lotta MONEY Bank! Please pay back in 5 days!",
        end: true,
        func: () => { giveLoan(1000) }
    },
    "gave-loan-5000": {
        text: "Thank you for taking out a loan of $5,000 at Lotta MONEY Bank! Please pay back in 5 days!",
        end: true,
        func: () => { giveLoan(5_000) }
    },
    "gave-loan-10000": {
        text: "Thank you for taking out a loan of $10,000 at Lotta MONEY Bank! Please pay back in 5 days!",
        end: true,
        func: () => { giveLoan(10_000) }
    },
    "gave-loan-100000": {
        text: "Thank you for taking out a loan of $100,000 at Lotta MONEY Bank! Please pay back in 5 days!",
        end: true,
        func: () => { giveLoan(100_000) }
    },
    "gave-loan-500000": {
        text: "Thank you for taking out a loan of $500,000 at Lotta MONEY Bank! Please pay back in 5 days!",
        end: true,
        func: () => { giveLoan(500_000) }
    },
    "gave-loan-1000000": {
        text: "Thank you for taking out a loan of $1,000,000 at Lotta MONEY Bank! Please pay back in 5 days!",
        end: true,
        func: () => { giveLoan(1_000_000) }
    }
}

// elements displayed

const chatElements = reactive([

])

function advanceTree(next) {
    if (next == 'start') {
        chatElements.length = 0
    }

    const entry = tree[next]

    chatElements.forEach((element) => {
        if (element.type == "button") {
            element.disabled = true
        }
    })

    if (entry.text) {
        chatElements.push({
            type: 'text',
            content: "<strong>Lotta MONEY the IV:</strong> " + entry.text
        })
    }

    if (entry.func) {
        entry.func()
    }

    if (entry.options) {
        entry.options.forEach((option) => {
            chatElements.push({
                type: 'button',
                text: option.text,
                next: option.next,
                disabled: false
            })
        })
    }

    if (entry.end) {
        chatElements.push({
            type: 'button',
            text: "Restart Conversation",
            next: "start",
            disabled: false
        })
    }
}

advanceTree('start')

</script>

<template>
    <h1>Lotta MONEY Bank</h1>
    <h3>Super charge your wallet!</h3>
    <button @click="changeTab('road')">Exit Lotta MONEY Bank</button>
    <button @click="changeTab('casino')">Cross Skybridge</button>
    <div>
        <h2>Teller</h2>
        <div class="chat">
            <template v-for="(chat, index) in chatElements" :key="index">
                <p v-if="chat.type === 'text'" v-html="chat.content"></p>
                <button :disabled="chat.disabled" v-else-if="chat.type === 'button'" @click="advanceTree(chat.next)">
                    {{ chat.text }}
                </button>
            </template>
        </div>
    </div>
    <div>
        <h2>LOTTAscore™</h2>
        <div class="credit-score">
            <div class="spectrum">
                <div :style="`margin-left: ${Math.max(Math.min(((stats.bank.creditScore) / 1000) * 100, 100), 0)}%;`">
                    <h4>{{ Math.round(stats.bank.creditScore) }}</h4>
                </div>
            </div>
            <div class="spectrum-label">
                <h5>0</h5>
                <h5>1000</h5>
            </div>
        </div>
    </div>
</template>

<style scoped>
.chat {
    background-color: var(--color-surface0);
    padding: 20px;
    border-radius: 5px;
}

.credit-score {
    height: 100px;
    margin-bottom: 100px;
}

.spectrum {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(90deg, rgba(255, 48, 48, 1) 0%, rgba(255, 255, 0, 1) 50%, rgba(87, 255, 78, 1) 100%);
    border-radius: 20px;
}

.spectrum>div {
    height: 105%;
    transform: translate(-50%, -2.5%);
    width: 5px;
    background-color: rgb(255, 255, 255);
    /* border: solid rgb(170, 170, 170) 3px; */
    border-radius: 50px;
    margin-left: 50%;
}

.spectrum>div>h4 {
    width: 100px;
    transform: translate(-50%, 130px);
    background-color: var(--color-surface1);
    text-align: center;
    border-radius: 50px;
    margin-left: 50%;
}

.spectrum-label {
    display: flex;
    justify-content: space-between;
}

:deep(table) {
    width: 100%;
    border-collapse: collapse;
}

:deep(td), :deep(th) {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

:deep(tr):nth-child(even) {
  background-color: var(--color-surface1);
}

button {
    margin-right: 10px;
}
</style>