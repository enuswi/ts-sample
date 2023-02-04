## 概要

- TypeScriptに慣れていくために、定期的にPaizaの問題に挑戦する用のリポジトリ
- ただPaizaスキルチェックは残念ながら、TypeScriptに対応していないのでビルド結果を提出する（'23.2.4時点）

## ついでにやりたいこと

- jestを使ったテストコードの追加


## paizaの雛形

```js
process.stdin.resume();
process.stdin.setEncoding('utf8');
// 自分の得意な言語で
// Let's チャレンジ！！
var lines = [];
var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
reader.on('line', (line) => {
  lines.push(line);
});
reader.on('close', () => {
  //console.log(lines[0]);
  // 1行目を取得するときは
  // lines.shift()
  // さらに、空白文字で分割する
  // lines.shift().split(' ')

  // 実行時は、インスタンスを生成して、関数を実行する
  const main = new Main(lines)
  main.run()
});
```