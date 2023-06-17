type TimeTerm = {
  from: number;
  to: number;
}

class logic {
  public excludeRanges = (baseTerm: TimeTerm, ranges: TimeTerm[]): TimeTerm[] => {
    const result: TimeTerm[] = [];
    const validRanges: TimeTerm[] = [];

    for (const range of ranges) {
      if (range.from <= baseTerm.to && range.to >= baseTerm.from) {
        const from = Math.max(range.from, baseTerm.from);
        const to = Math.min(range.to, baseTerm.to);
        validRanges.push({
          from,
          to,
        });
      }
    }

    validRanges.sort((a, b) => a.from - b.from);

    let start = baseTerm.from;
    for (const range of validRanges) {
      if (range.from > start) {
        result.push({from: start, to: range.from});
      }
      start = range.to;
    }

    if (start < baseTerm.to) {
      result.push({from: start, to: baseTerm.to});
    }

    return result;
  };
}

// 使用例
const ranges: TimeTerm[] = [
  {from: 600, to: 720},
  {from: 780, to: 900},
  {from: 1200, to: 1320},
];

const baseTerms: TimeTerm[] = [
  {from: 600, to: 900},
  {from: 1200, to: 1320},
];

const instance = new logic();

baseTerms.map(baseTerm => {
  console.log(instance.excludeRanges(baseTerm, ranges));
});
