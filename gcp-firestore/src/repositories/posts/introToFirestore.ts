import { Firestore, CollectionReference } from "@google-cloud/firestore"

export class IntroToFirestoreRepository {
  private _collection : CollectionReference

  constructor() {
    const firestore: Firestore = new Firestore()
    this._collection = firestore.collection('posts')
  }

  async insert(_title: string, _body: string) {
    return await this._collection.doc().set({
      title: _title,
      body: _body
    })
  }

  async update(_path: string, _title: string, _body: string) {
    return await this._collection.doc(_path).update({
      title: _title,
      body: _body
    })
  }

  async find(_path: string) {
    return await this._collection.doc(_path).get()
  }

  async delete(_path: string) {
    return await this._collection.doc(_path).delete()
  }
}
