import {CountOfWeek} from '../src/paiza405'

/**
 * 成功ケース
 */
interface Datum {
  value: number,
  expected: number
}

const data: Datum[] = [
  {value: 1, expected: 7},
  {value: 10, expected: 70},
  {value: 52, expected: 364}
]

describe.each(data)(`N 週間後が何日後かを表示する`, (data: Datum) => {
  const { value, expected } = data

  it(`ケース：${value} 週間後は ${expected} 日後である`, () => {
    const instance = new CountOfWeek(value)
    const result = instance.convertToDays()

    expect(expected).toBe(result)
  })
})

/**
 * 失敗ケース
 */
interface FailedDatum {
  value: number
}

const failedData: FailedDatum[] = [
  {value: 0},
  {value: 53}
]

describe.each(failedData)(`失敗ケース`, (failedData: FailedDatum) => {
  const {value} = failedData
  function init(value: number) {
    new CountOfWeek(value)
  }

  it(`ケース：${value} 週間後はエラーとなる`, () => {
    expect(() => { init(value) }).toThrowError('invalid value.')
  })
})
