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

