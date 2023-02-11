/**
 * 数列の長さは偶数
 * あなたの今回の仕事は、この数列の前半と後半がどのくらい似ているのかを調べることです。
 * 
 * 1 ≦ K ≦ 200,000
 * 1 ≦ M_i ≦ 1,000,000,000 (1 ≦ i ≦ K)
 * 0 ≦ X_i ≦ 10,000 (1 ≦ i ≦ K)
 * M_1 + M_2 + ... + M_K は偶数
 * X_i ≠ X_{i + 1} (1 ≦ i ≦ K - 1)
 * 
 * 4 ... K
 * 2 1 ... M_1 X_1
 * 4 7
 * 3 1
 * 1 3 ... M_4 X_4
 * -> 22
 * 
 * 1, 1, 7, 7, 7, 7, 1, 1, 1, 3
 * ↓
 *   1, 1, 7, 7, 7
 * - 7, 1, 1, 1, 3
 * -----------------
 *   6, 0, 6, 6, 4 -> sum() -> 22
 */

export interface request {
  number: number,
  count: number
}

export class paiza534 {
  /**
   * 愚直にやるなら
   * 1. 入力値からリストを作る
   * 2. リストを半分にする
   * 3. 差分を足しあげる
   */
  private list1: number[]
  private list2: number[]
  constructor(req: request[]) {
    this.generateList(req)
  }

  calc (): number {
    return this.list1.reduce((result, value, index) => {
      return result + Math.abs(value - this.list2[index])
    }, 0)
  }

  private generateList (requestList: request[]): void {
    const list = []
    for (let i = 0; i < requestList.length; i ++) {
      for (let j = 0; j < requestList[i].count; j ++) {
        list.push(requestList[i].number)
      }
    }
    this.list1 = list.slice(0, list.length / 2)
    this.list2 = list.slice(list.length / 2)
  }
}