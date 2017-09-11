import { Component, Input, OnInit } from "@angular/core";
import * as uuid from "node-uuid"
import _ = require("lodash")

@Component({
  selector: "app-mortgage-loan",
  templateUrl: "./mortgage-loan.component.html",
  styleUrls: ["./mortgage-loan.component.scss"]
})
export class MortgageLoanComponent implements OnInit {
  @Input() public keepAllLoansTogether: boolean = true
  @Input() public loans: Loan[] = [
    {
      interestRate: 0.0315,
      curInterestAmount: 0,
      curPrincipalAmount: 2471.46,
      dateLastPaid: new Date("2017-11-01T13:00:00.000Z"),
      interestType: "daily",
      isCompounded: true,
    },
    {
      interestRate: 0.0361,
      curInterestAmount: 0,
      curPrincipalAmount: 4200.22,
      dateLastPaid: new Date("2017-11-01T13:00:00.000Z"),
      interestType: "daily",
      isCompounded: true,
    },
    {
      interestRate: 0.0361,
      curInterestAmount: 0,
      curPrincipalAmount: 4109.49,
      dateLastPaid: new Date("2017-11-01T13:00:00.000Z"),
      interestType: "daily",
      isCompounded: true,
    },
    // 654.84   0.0441
    {
      interestRate: 0.0441,
      curInterestAmount: 0,
      curPrincipalAmount: 654.84,
      dateLastPaid: new Date("2017-11-01T13:00:00.000Z"),
      interestType: "daily",
      isCompounded: true,
    },
    // 1462.36  0.0404
    {
      interestRate: 0.0404,
      curInterestAmount: 0,
      curPrincipalAmount: 1462.36,
      dateLastPaid: new Date("2017-11-01T13:00:00.000Z"),
      interestType: "daily",
      isCompounded: true,
    },
    // 1650     0.0404
    {
      interestRate: 0.0404,
      curInterestAmount: 0,
      curPrincipalAmount: 1650.00,
      dateLastPaid: new Date("2017-11-01T13:00:00.000Z"),
      interestType: "daily",
      isCompounded: true,
    },
    // 3259.20  0.0351
    {
      interestRate: 0.0351,
      curInterestAmount: 0,
      curPrincipalAmount: 3259.20,
      dateLastPaid: new Date("2017-11-01T13:00:00.000Z"),
      interestType: "daily",
      isCompounded: true,
    },
  ]

  public updatedLoans: Loan[] = []

  @Input() public futurePayments: Payment[] = [
    {
      amount: 200.00,
      dateToPay: new Date("2017-11-15T13:00:00.000Z"),
    },
    {
      amount: 520.00,
      dateToPay: new Date("2017-12-15T13:00:00.000Z"),
    },
    {
      amount: 515.00,
      dateToPay: new Date("2018-01-15T13:00:00.000Z"),
    },
    {
      amount: 9500.00,
      dateToPay: new Date("2018-02-15T13:00:00.000Z"),
    },
    {
      amount: 3500.00,
      dateToPay: new Date("2018-03-15T13:00:00.000Z"),
    },
    {
      amount: 650.00,
      dateToPay: new Date("2018-04-15T13:00:00.000Z"),
    },
    {
      amount: 550.00,
      dateToPay: new Date("2018-05-15T13:00:00.000Z"),
    },
    {
      amount: 500.00,
      dateToPay: new Date("2018-06-15T13:00:00.000Z"),
    },
    {
      amount: 500.00,
      dateToPay: new Date("2018-07-15T13:00:00.000Z"),
    },
    {
      amount: 500.00,
      dateToPay: new Date("2018-08-15T13:00:00.000Z"),
    },
    {
      amount: 360.00,
      dateToPay: new Date("2018-09-15T13:00:00.000Z"),
    },
    {
      amount: 750.00,
      dateToPay: new Date("2018-10-15T13:00:00.000Z"),
    },
    {
      amount: 592.80,
      dateToPay: new Date("2018-11-15T13:00:00.000Z"),
    },
  ]
  public loanPayments: { loans: Loan[], updatedLoans: Loan[], payment: Payment}[] = []

  public ngOnInit(): void {
    this.loans.map(loan => {
      loan.id = uuid.v4()
      return loan
    })

    this.updatedLoans = _(this.loans).cloneDeep()
    this.loanPayments = this.getLoansFromPayments()
  }

  private numberOfDaysForMonth(month: MonthTypes, year: number) {
    return new Date(year, Months[month], 0).getDate();
  }

  private numberOfDaysForYear(year: number) {
    return Object.keys(Months).reduce((sum, month: MonthTypes) => {
      return sum + this.numberOfDaysForMonth(month, year)
    }, 0)
  }

  private daysBetween(date1: Date, date2: Date) {
    //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.round(difference_ms / one_day);
  }

  private getInterestRate(lastPaymentDate: Date, nextPaymentDate: Date, loan: Loan) {
    const daysFromLastPayment = this.daysBetween(lastPaymentDate, nextPaymentDate)
    const daysForYear = this.numberOfDaysForYear(nextPaymentDate.getFullYear())
    const interestRatePerDay = loan.interestRate / daysForYear
    const interestRateForPeriod = interestRatePerDay * daysFromLastPayment
    return interestRateForPeriod
  }

  private getInterestAmount(lastPaymentDate: Date, nextPaymentDate: Date, loan: Loan) {
    const interestRate = this.getInterestRate(lastPaymentDate, nextPaymentDate, loan)
    const index = `${interestRate}`.indexOf(".")
    const interestAmount = this.nearestHundredth(interestRate * loan.curPrincipalAmount)
    return this.nearestHundredth(interestAmount + loan.curInterestAmount)
  }

  /**
   * Gets the loan with the most interest rate, but the lowest payment amount
   */
  private getLoansToPay(): Loan | null {
    let highest = 0
    let loansToKeep: Loan[] = []

    this.updatedLoans.forEach(loan => {
      if (loan.interestRate > highest && loan.curPrincipalAmount > 0) {
        highest = loan.interestRate
        loansToKeep = [loan]
        return
      }

      if (loan.interestRate === highest && loan.curPrincipalAmount > 0) {
        loansToKeep.push(loan)
      }
    })

    if (loansToKeep.length === 0) {
      return null
    }

    return loansToKeep
      .slice(1, loansToKeep.length - 1)
      .reduce((loanToKeep: Loan, curLoan: Loan) => {
        return loanToKeep.curPrincipalAmount > curLoan.curPrincipalAmount ? loanToKeep : curLoan
      }, loansToKeep[0])
  }

  public nearestHundredth(num: number): number {
    return Math.round(num * 100) / 100
  }

  public totalAmount(loans: Loan[]) {
    const total = loans.reduce((acc, loan) => {
      return acc + loan.curInterestAmount + loan.curPrincipalAmount
    }, 0)

    return this.nearestHundredth(total)
  }

  private getLoansFromPayments(): { loans: Loan[], updatedLoans: Loan[], payment: Payment }[] {
    return this.futurePayments.map((payment, i): { loans: Loan[], updatedLoans: Loan[], payment: Payment } => {
      let amountToPay = payment.amount
      const loansPaid: Loan[] = []
      let currentLoan: Loan | null
      let lastPayment: Date
      do {
        currentLoan = this.getLoansToPay()
        if (currentLoan) {
          lastPayment = i === 0 ? currentLoan.dateLastPaid : this.futurePayments[i - 1].dateToPay
          let unpaidInterest = this.getInterestAmount(lastPayment, payment.dateToPay, currentLoan)
          let balanceBeforePayment = this.nearestHundredth(unpaidInterest + currentLoan.curPrincipalAmount)
          let interestRemaining = this.nearestHundredth(unpaidInterest - amountToPay)
          let principalToPay = interestRemaining < 0 ? interestRemaining * -1 : 0
          if (interestRemaining < 0) {
            interestRemaining = 0
          }
          
          currentLoan.curInterestAmount = interestRemaining
          let remainingPrincipal = this.nearestHundredth(currentLoan.curPrincipalAmount - principalToPay)
          if (remainingPrincipal <= 0) {
            // This loan is paid off
            amountToPay = this.nearestHundredth(amountToPay - currentLoan.curPrincipalAmount)
            currentLoan.curPrincipalAmount = 0
          } else {
            // This loan is less, but not paid off
            amountToPay = 0
            currentLoan.curPrincipalAmount = remainingPrincipal
          }
          
          currentLoan.dateLastPaid = payment.dateToPay
          
          this.updatedLoans = this.updatedLoans.map(loan => loan.id === currentLoan.id ? currentLoan : loan)
          loansPaid.push(currentLoan)
        }
      } while (amountToPay > 0 && currentLoan)
        
      this.updateOtherLoans(
        this.updatedLoans.filter(loan => loansPaid.filter(loanPaid => loanPaid.id === loan.id).length === 0),
        payment,
        lastPayment,
      )

      return { loans: _(loansPaid).cloneDeep(), payment, updatedLoans: _(this.updatedLoans).cloneDeep() }
    })
  }

  private updateOtherLoans(loansToUpdate: Loan[], payment: Payment, lastPayment: Date) {
    loansToUpdate = loansToUpdate.map(loanToUpdate => {
      let unpaidInterest = this.getInterestAmount(lastPayment, payment.dateToPay, loanToUpdate)
      loanToUpdate.curInterestAmount = this.nearestHundredth(loanToUpdate.curInterestAmount + unpaidInterest)
      loanToUpdate.dateLastPaid = payment.dateToPay
      return loanToUpdate
    })

    this.updatedLoans = this.updatedLoans.map(loan => {
      const matchedLoan = loansToUpdate.filter(loanToUpdate => loan.id === loanToUpdate.id)
      return matchedLoan.length > 0 ? matchedLoan[0] : loan
    })
  }
}

export type MonthTypes = "January" | "February" | "March" | "April" | "May" | "June" | "July"
                       | "August" | "September" | "October" | "November" | "December"

export const Months: { [month: string]: number} = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
}


export class Loan {
  id?: string
  interestRate: number = 0
  curInterestAmount: number = 0
  curPrincipalAmount: number = 0
  dateLastPaid: Date

  interestType: "daily" | "monthly" | "quarterly" | "yearly" = "yearly"
  isCompounded: boolean = false
}

export class Payment {
  amount: number = 0
  dateToPay: Date
}

export interface BalanceInfo {
  paymentAmount: number
  paymentDate: Date
  unpaidInterestBefore: number
  unpaidInterestAfter: number
  principalPaid: number
  balanceBeforePayment: number
  balanceAfterPayment: number
}