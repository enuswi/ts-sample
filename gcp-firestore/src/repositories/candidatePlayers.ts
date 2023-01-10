import { abstractRepository } from "./abstractRepository";

export type candidatePlayerSection = '高校' | '大学' | '社会人' | '独立L'
export type candidatePlayerPosition = '投手' | '捕手' | '内野手' | '外野手'
export type candidatePlayerArm = '右' | '左' | '両'

export interface candidatePlayer {
  section: candidatePlayerSection,
  prefecture: string,
  name: string,
  team: string,
  position: candidatePlayerPosition,
  pitching_arm: candidatePlayerArm,
  batting_arm: candidatePlayerArm
}

export class candidatePlayersRepository extends abstractRepository {
  constructor() {
    super('candidatePlayers')
  }

  async insert(_params: candidatePlayer) {
    return await this._collection.doc().create(_params)
  }
}