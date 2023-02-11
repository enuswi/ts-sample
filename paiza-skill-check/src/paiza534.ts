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
  private total: number
  private keys: number[]
  private values: number[]
  constructor(total: number, req: request[]) {
    this.total = total
    this.generateList(req)
  }

  calc (): number {
    const calcCount = this.total / 2
    let sum = 0;
    for (let i = 1; i <= calcCount; i ++) {
      const indexA = this.keys.find(elm => elm <= i)
      const indexB = this.keys.find(elm => elm <= i + calcCount)

      sum += Math.abs(this.values[indexA] - this.values[indexB])
    }
    return sum
  }

  private generateList (requestList: request[]): void {
    /**
     * 大量データが来たときに計算できなくなる
     * 先に、要素数をわかるようにして、
     * 
     * ↓整理
     * 10
     * 1,2,3,4,5
     * 6,7,8,9,10
     * の比較
     * ↓
     * 1, 6の値がわかればいい
     * 6 = 1 + total / 2
     * 配列に突っ込むコストを考えると [index, n, value], 処理後 index + n 
     * 1-2, 1 <- IF/ 2 1 => [1, 2, 1] -> [1] -> 1
     * 3-6, 7 <- IF/ 4 7 => [3, 4, 7]
     * 7-9, 1 <- IF/ 3 1 => [7, 3, 1]
     * 10,  3 <- IF/ 1 3 => [10, 1, 3]
     * 
     * 逆算的にどういう引き方をしたいか
     * 1, 6
     * 
     * [1] = 1
     * [3] = 7
     * [7] = 1
     * [10] = 3
     * [1, 3, 7, 10] <= map, 
     * -> 1 => 1 => [1] = 1
     * -> 6 => 3 => [3] = 7
     */
    const keys = []
    const values = []

    let index = 1
    requestList.forEach(request => {
      keys.push(index)
      values[index] = request.number
      index += request.count
    })

    this.keys = keys.reverse()
    this.values = values
  }
}