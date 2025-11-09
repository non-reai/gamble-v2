import { getInterestRate, stats, wait, showToast } from './utils.js'

function getDebt() {
    let debt = 0
    stats.bank.loans.forEach(loan => {
        const interest = loan.amount * (1 + getInterestRate()) ** (stats.day - loan.dayLent) - loan.amount
        const amount = loan.amount
        const total = interest + amount

        debt += total
    })

    return debt
}

async function bankReminders() {
    while (true) {
        await wait(Math.max(60000 - (getDebt()/5), 3000))
        const loans = stats.bank.loans
        const overdueLoans = loans.filter((loan)=>{
            return loan.dueDate < stats.day
        })
        if (overdueLoans.length > 0) { // get outstanding loans
            stats.bank.creditScore -= 5
            stats.bank.creditScore = Math.min(Math.max(stats.bank.creditScore, 0), 1000)
            showToast("You have overdue loans! Please pay them back!", "rgba(122, 122, 122, 1)")
        }
    }
}

bankReminders()