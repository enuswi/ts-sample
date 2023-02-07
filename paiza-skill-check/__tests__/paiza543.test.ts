import { FeeVo } from "../src/paiza543"

interface Datum {
  value: number,
  expected: number
}
const data: Datum[] = [
  {
    value: 100,
    expected: 1200
  },
  {
    value: 10000,
    expected: 120000
  }
]

const errorData: Datum[] = [
  {
    value: -1,
    expected: 0
  },
  {
    value: 99,
    expected: 0
  },
  {
    value: 10001,
    expected: 0
  }
]

/**
 * あなたはあるサービスに月額料金を払っています。年間でいくらになるか気になったので計算することにしました。
 * 月額 p 円の料金の時、 12 ヶ月でいくら払うことになるか出力してください。
 * 
 * 100 ≦ p ≦ 10,000
 */

describe.each(data)(`ケース成功`, (data: Datum) => {
  const {value, expected} = data

  it(`ケース: ${value}`, () => {
    const instance = new FeeVo(value)
    const result = instance.getAnnualFee()

    expect(expected).toBe(result)
  })
})

describe.each(errorData)(`ケース失敗`, (data: Datum) => {
  const {value} = data

  function init(value: number) {
    new FeeVo(value)
  }

  it(`ケース: ${value}`, () => {
    expect(() => { init(value) }).toThrowError('invalid value.')
  })
})