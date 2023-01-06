import { Firestore, DocumentReference } from "@google-cloud/firestore"

export class IntroToFirestoreRepository {
  private _document : DocumentReference

  constructor() {
    const firestore: Firestore = new Firestore()
    this._document = firestore.doc('posts/intro-to-firestore')
  }

  async insert(_title: string, _body: string) {
    return await this._document.set({
      title: _title,
      body: _body
    })
  }

  async update(_body: string) {
    return await this._document.update({
      body: _body
    })
  }

  async get() {
    return await this._document.get()
  }

  async delete() {
    return await this._document.delete()
  }
}
