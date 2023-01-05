## 概要

Node.js x Firestore サンプル

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