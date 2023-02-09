import { CalcCardList, Card, CardList } from "../src/paiza610"

interface Datum {
  list: number[],
  expected: number
}
const data: Datum[] = [
  {
    list: [1, 2, 3, 4, 5],
    expected: 192
  },
  {
    list: [-3, -1, -5, 1, 2],
    expected: 0
  }
]

describe.each(data)(`カードの積`, (data: Datum) => {
  const {list, expected} = data

  it(`最大値`, () => {
    const instance = new CalcCardList(list)
    expect(instance.getMaxValue()).toBe(expected)
  })
})