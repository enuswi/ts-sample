/**
 * https://paiza.jp/works/challenges/405/page/result
 * 
 *  N 週間後が何日後かを表示する
 * ex. N: 6 = 42（日後）
 */

abstract class Base {
  protected rowCount: number
  protected requests: number[]

  constructor(rowCount: number, requests: number[]) {
    this.rowCount = rowCount
    this.requests = requests
  }

  abstract run(): void;
}

export class paiza405 extends Base {
    constructor(rowCount: number, requests: number[]) {
        super(rowCount, requests)
    }

    public run() {
        console.log(this.rowCount * 7)
    }
}
