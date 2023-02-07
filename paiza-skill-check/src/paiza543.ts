/**
 * https://paiza.jp/challenges/543/show
 */
export class paiza543a {
  private param: number
  constructor(params: number) {
    this.param = params
  }
  public run() {
    const feeVo = new FeeVo(this.param)
    console.log(feeVo.getAnnualFee())
  }
}

export class FeeVo {
  private value: number
  private MIN: number = 100
  private MAX: number = 10000

  constructor(value: number) {
    if (value < this.MIN || this.MAX < value) {
      throw new Error('invalid value.')
    }
    this.value = value
  }

  public getAnnualFee() {
    return this.value * 12
  }
}