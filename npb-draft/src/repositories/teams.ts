import { abstractRepository } from './abstractRepository'

export interface Team {
  code: string,
  name: string
}

export class teamsRepository extends abstractRepository {
  constructor() {
    super('teams')
  }

  async insert(_params: Team) {
    return await this._collection.doc().create(_params)
  }
}