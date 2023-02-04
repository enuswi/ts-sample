abstract class Base {
  protected rowCount: number
  protected requests: number[]

  constructor(rowCount: number, requests: number[]) {
    this.rowCount = rowCount
    this.requests = requests
  }

  abstract run(): void;
}

class paiza405 extends Base {
    constructor(rowCount: number, requests: number[]) {
        super(rowCount, requests)
    }

    public run() {
        console.log(this.rowCount * 7)
    }
}

