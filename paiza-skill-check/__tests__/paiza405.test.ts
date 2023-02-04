import {paiza405} from '../src/paiza405'

test(`test`, () => {
  const instance = new paiza405(1, [10])
  instance.run()
  expect(true).toBe(true)
  // TODO: 現状、コンソールログを出力するだけなので、アサーションが書けない
})