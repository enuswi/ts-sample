class paiza527 {
  /**
   * ・1 ≦ N, M ≦ 30
   * ・1 ≦ A_i ≦ 100 (1 ≦ i ≦ N)
   * ・1 ≦ B_i ≦ 100 (1 ≦ i ≦ M)
   */

  /**
   * ・入力
   * ゴンドラの数 ... N
   * ゴンドラに乗れる数 ... A_i -> A_n
   * グループの数 ... M
   * グループの人数 ... B_i -> B_n
   */

  private ridableList: number[]
  private groupNumberList: number[]

  private behicleIndex: number
  private resultList: number[]

  constructor(ridableList: number[], groupNumberList: number[]) {
    this.ridableList = ridableList
    this.groupNumberList = groupNumberList

    this.behicleIndex = 0
    this.resultList = []

    this.init()
  }

  public run() {
    this.groupNumberList.map(value => {
      /**
       * ・valueが0になるまで繰り返す
       * ・ゴンドラのindexはゴンドラ数の上限に到達したら0に戻す
       * ・乗車させた人数分、valueを減らす
       */
      let groupMemberCount = value

      while (groupMemberCount > 0) {
        if (groupMemberCount <= this.ridableList[this.behicleIndex]) {
          this.add(this.behicleIndex, groupMemberCount)
          groupMemberCount = 0
        } else {
          this.add(this.behicleIndex, this.ridableList[this.behicleIndex])
          groupMemberCount -= this.ridableList[this.behicleIndex]
        }

        this.behicleIndex = this.behicleIndex < this.ridableList.length - 1
          ? this.behicleIndex + 1
          : 0
      }
    })

    this.resultList.map(result => {
      console.log(result)
    })
  }

  private init() {
    for (let i: number = 0; i < this.ridableList.length; i++) {
      this.resultList[i] = 0;
    }
  }

  private add(index: number, count: number) {
    this.resultList[index] += count
  }
}