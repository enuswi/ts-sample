/**
 * https://paiza.jp/works/challenges/405/page/result
 * 
 *  N 週間後が何日後かを表示する
 * ex. N: 6 = 42（日後）
 * 条件：1 ≦ N ≦ 52
 */

export class paiza405 {
  private countOfWeek: CountOfWeek

  constructor(countOfWeek: number) {
    this.countOfWeek = new CountOfWeek(countOfWeek)
  }

  public run() {
    console.log(this.countOfWeek.convertToDays())
  }
}

export class CountOfWeek {
  private value: number
  private MIN: number = 1
  private MAX: number = 52
  constructor(value: number) {
    if (value < this.MIN || this.MAX < value) {
      throw Error('invalid value.')
    }
    this.value = value;
  }
  public convertToDays(): number {
    return this.value * 7
  }
}