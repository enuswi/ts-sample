import { paiza534, request } from "../src/paiza534"

interface Datum {
  expected: number,
  list: request[]
}
const data: Datum[] = [
  {
    expected: 22,
    list: [
      {
        count: 2,
        number: 1
      },
      {
        count: 4,
        number: 7
      },
      {
        count: 3,
        number: 1
      },
      {
        count: 1,
        number: 3
      }
    ]
  },{
    expected: 3000,
    list: [
      {
        count: 300,
        number: 10
      },
      {
        count: 100,
        number: 0
      },
      {
        count: 200,
        number: 20
      }
    ]
  }
]

describe.each(data)(`IFのテスト`, (data: Datum) => {
  const {expected, list} = data

  it(`ケース`, () => {
    const instance = new paiza534(list)
    expect(instance.calc()).toBe(expected)
  })
})