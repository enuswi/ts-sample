import {CountOfWeek} from '../src/paiza405'

test(`N 週間後が何日後かを表示する`, () => {
  const instance = new CountOfWeek(1)
  const value = instance.convertToDays()
  expect(value).toBe(7)
})