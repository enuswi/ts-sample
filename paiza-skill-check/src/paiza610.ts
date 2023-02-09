/**
 * ・2 ≦ N ≦ 10
 * ・-5 ≦ c_i ≦ 5 (1 ≦ i ≦ N)
 */

export class paiza610 {
  constructor(cardList: number[]) {
    const instance = new CardList(cardList)
    console.log(instance.getMaxValue())
  }
}

export class CardList {
  private max: number
  private cardList: number[]
  constructor(cardList: number[]) {
    this.cardList = cardList
    this.calc()
  }

  calc(): void {
    for (let i = 0; i < this.cardList.length; i ++) {
      for (let j = 0; j < this.cardList.length; j++) {
        if (i === j) continue

        const result = this.cardList.reduce((result, value, index) => {
          if (index === i) return result * (value + 1)
          if (index === j) return result * (value - 1)
          return result * value
        }, 1)

        this.setMaxValue(result)
      }
    }
  }

  private setMaxValue(newValue: number) {
    if (this.max === undefined || this.max < newValue) this.max = newValue
  }

  getMaxValue() {
    return this.max + 0
  }
}
