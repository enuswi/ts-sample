export class paiza610 {
  constructor(cardList: number[]) {
    const instance = new CalcCardList(cardList)
    console.log(instance.getMaxValue())
  }
}

/**
 * -5 ≦ c_i ≦ 5 (1 ≦ i ≦ N)
 */
export class Card {
  private MIN: number = -5
  private MAX: number = 5
  private value: number

  constructor(value: number) {
    if (value < this.MIN || this.MAX < value) throw new Error('invalid value.')
    this.value = value
  }

  getValue() {
    return this.value
  }
}

/**
 * 2 ≦ N ≦ 10
 */
export class CardList {
  private MIN: number = 2
  private MAX: number = 10
  private cardList: Card[]

  constructor(list: number[]) {
    if (list.length < this.MIN || this.MAX < list.length) throw new Error('invalid list.')
    this.cardList = list.map(number => new Card(number))
  }

  getList(): Card[] {
    return this.cardList
  }
}

export class CalcCardList {
  private max: number
  constructor(cards: number[]) {
    const cardList = new CardList(cards)
    this.calc(cardList)
  }

  private calc(cardList: CardList): void {
    const list = cardList.getList()
    for (let i = 0; i < list.length; i ++) {
      for (let j = 0; j < list.length; j++) {
        if (i === j) continue

        const result = list.reduce((result, card, index) => {
          if (index === i) return result * (card.getValue() + 1)
          if (index === j) return result * (card.getValue() - 1)
          return result * card.getValue()
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
