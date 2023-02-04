class paiza480 {
  private candidateCount: number
  private multipleNumberA: number
  private multipleNumberB: number
  /**
   * N: 応募者
   * X: Aの当選者の基準
   * Y: Bの当選者の基準
   */
  constructor(
      candidateCount: number,
      multipleNumberA: number,
      multipleNumberB: number) {
      this.candidateCount = candidateCount
      this.multipleNumberA = multipleNumberA
      this.multipleNumberB = multipleNumberB
  }

  public run() {
      for (let i: number = 1; i <= this.candidateCount; i ++) {
          let result = ''
          if (this.isHit(i, this.multipleNumberA)) result += 'A'
          if (this.isHit(i, this.multipleNumberB)) result += 'B'

          console.log(result.length === 0 ? 'N' : result)
      }
  }

  private isHit(candidateNumber: number, multipleNumber: number): boolean {
      return candidateNumber % multipleNumber === 0
  }
}

