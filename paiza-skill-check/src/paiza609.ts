/**
 * url: https://paiza.jp/challenges/609/show
 */

export class paiza609 {
  private params: number[]
  private totalExperiencePoint: number = 0
  constructor(params: number[]) {
    this.params = params
  }

  public run() {
    this.params.map(value => {
      const vo = new ExperiencePointVo(value)
      this.totalExperiencePoint += vo.getValue()
    })
    console.log(this.totalExperiencePoint)
  }
}

export class ExperiencePointVo {
  private MIN: number = 0
  private MAX: number = 500
  private value: number
  constructor(value: number) {
    if (value < this.MIN || this.MAX < value) {
      throw new Error('invalid value.')
    }
    this.value = value
  }

  public getValue(): number {
    return this.value
  }
}