import {Firestore, CollectionReference} from "@google-cloud/firestore"

export abstract class abstractRepository {
  protected _collection: CollectionReference

  protected constructor(_collection: string) {
    const firestore: Firestore = new Firestore()
    this._collection = firestore.collection(_collection)
  }

  //async insert(_param: Object) {
  //  const document = this._collection.doc()
  //  return await document.set(_param)
  //}

  async find(_path: string) {
    return await this._collection.doc(_path).get()
  }

  async delete(_path: string) {
    return await this._collection.doc(_path).delete()
  }
}
