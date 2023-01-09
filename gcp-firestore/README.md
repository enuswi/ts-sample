## 概要

Node.js x Firestore サンプル

## アプリケーション起動

### 開発

```
$ yarn dev
```

### 本番用（基本はCI/CDなのであまり実施する機会はなさそう？）

```
$ yarn build
$ yarn start
```

## Cloud Firestoreとは

cf. https://cloud.google.com/nodejs/docs/reference/firestore/latest

- 自動スケーリング、高パフォーマンスなNoSQLドキュメントデータベース
- 認証には、Cloud Identity and Access Managementを使用する
- SDKはサーバーサイド用とクライアントサイド用である模様
  - Cloud Firestore Server SDK
    - ※ Datastoreモードで作成されたFirestoreデータベースをサポートしていない
  - Cloud Firestore Client SDK
- データベースのモードが２種類存在する（ネイティブモードとDatastoreモード）
  - cf. https://cloud.google.com/datastore/docs/firestore-or-datastore#in_datastore_mode
  - そもそもGCPにはCloud Datastoreというサービスが存在している。FirestoreはDatastoreの次世代サービスとして2019年2月1日に正式リリースされたもの。
    - Firestoreに導入されている機能
      - 新しい強整合性に優れたストレージレイヤー（意味わからん）
      - コレクションとドキュメントのデータモデル
      - リアルタイムアップデート
      - モバイルクライアントライブラリとウェブクライアントライブラリ
    - FirestoreはDatastoreとの後方互換性があるが、新しいデータモデル、リアルタイムアップデート、クライアントライブラリの機能はFirestoreにしか存在しないため、それらの機能を使う場合はネイティブモードで利用する必要あり

## クイックスタート手順メモ

cf. https://cloud.google.com/nodejs/docs/reference/firestore/latest#quickstart

- 引っかかりポイント
  - Firestoreにデータベースを作成する必要があったので作成した
  - Nodeアプリケーションから実行する前に、CLIの環境変数設定が必要だった
    - ex. `export GOOGLE_APPLICATION_CREDENTIALS="KEY_PATH"`

## ビルド時間短縮にesbuildが有効か試してみたい

- ts-nodeの代替として、検索にヒットしたので導入してみた
  - 開発環境用の実行は `yarn dev-esbuild`
  - 本番環境用のビルドは、 `yarn build-esbuild`
    - ※ 本番環境用の実行は、導入前同様に `yarn start`
- cf. https://zenn.dev/okmttdhr/articles/7fd59537b63ce4
- 速度比較
```
gcp-firestore % hyperfine 'yarn build-esbuild'
Benchmark 1: yarn build-esbuild
  Time (mean ± σ):      1.246 s ±  0.064 s    [User: 1.034 s, System: 0.192 s]
  Range (min … max):    1.172 s …  1.329 s    10 runs
 
gcp-firestore % hyperfine 'yarn build'              
Benchmark 1: yarn build
  Time (mean ± σ):      2.207 s ±  0.086 s    [User: 4.721 s, System: 0.217 s]
  Range (min … max):    2.148 s …  2.432 s    10 runs
```
- 気になりポイント
  - ※ 開発環境の高速化がどれほど有用なのかが気になっているところ（ts-node-devでいいのでは？）
  - ※ 型チェックがないとのこと
    - cf. https://qiita.com/faunsu/items/487c7157c211bfc739c1

## 導入パッケージまとめ

### rimraf

- ビルド結果を格納するディレクトリ（ex. dist）を削除するために利用
- `rm -rf dist` ではなく、`rimraf` パッケージを利用する理由としては、 `rm` コマンドを利用することがOS依存であるため
- なお、 `rimraf` パッケージはNPMの作者 `Isaac` 氏が作成したパッケージ
- cf. https://maku77.github.io/nodejs/npm/npm-run-rimraf.html

### npm-run-all

- 複数の処理を１つのコマンドで実行するために利用する
- ex. yarn build実行により、yarn clean -> yarn tscの２つのコマンドを実行できる（以下、参照）

```
{
  ...
  "clean": "rimraf dist/*",
  "tsc": "tsc",
  "build": "npm-run-all clean tsc",
  ...
}
```

### ts-node, ts-node-dev

- ts-node-devを使うことで
  - ts-node同様、tsファイルをjsファイルにコンパイルすることなく、起動することができる
  - ts-nodeとは違い、監視モード（所謂、watchモード）で素早く再起動が使用できる
  - ※ nodemonよりts-node-devによる監視モードの方が高速らしい
- cf. https://qiita.com/sa9ra4ma/items/67ab5ac6fea3e5f065b0

### express-validator

- バリデーションを実装（結構、冗長？）
- cf. https://express-validator.github.io/docs/