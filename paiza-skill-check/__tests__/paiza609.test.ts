import { ExperiencePointVo } from "../src/paiza609";

/**
 * 成功ケース
 */
interface Datum {
  value: number,
  expected: number
}

const data: Datum[] = [
  {value: 0, expected: 0},
  {value: 99, expected: 99},
  {value: 500, expected: 500}
]

describe.each(data)(`経験値ValueObjectの成功パターン`, (data: Datum) => {
  const {value, expected} = data
  
  it(`ケース：${value}`, () => {
    const vo = new ExperiencePointVo(value)
    expect(expected).toBe(vo.getValue())
  })
})


/**
 * 例外ケース
 */
interface FailedDatum {
  value: number
}

const failedData: FailedDatum[] = [
  {value: -1},
  {value: 501}
]

describe.each(failedData)(`経験値ValueObjectの例外パターン`, (failedData: FailedDatum) => {
  const {value} = failedData
  function init(value: number) {
    new ExperiencePointVo(value)
  }

  it(`ケース：経験値 ${value} はエラー`, () => {
    expect(() => {init(value)}).toThrowError('invalid value.')
  })
})