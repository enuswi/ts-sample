import express, {Application, Request, Response} from 'express'
import {check, query, validationResult} from 'express-validator'
import {candidatePlayer, candidatePlayersRepository} from './repositories/candidatePlayers'
import algoliasearch, {} from 'algoliasearch'
import * as dotenv from 'dotenv'
import { Team, teamsRepository } from './repositories/teams'

/** TODO:
 * - Algoliaのデータ取得元は何かしらまとめる
 * - エラーコードはどこからとる？
 */
dotenv.config()
const env = process.env

const algoliaAppId = env.ALGOLIA_APPLICATION_ID || ''
const algoliaApiKey = env.ALGOLIA_API_KEY || ''

const client = algoliasearch(algoliaAppId, algoliaApiKey)
const index = client.initIndex('candidatePlayers')

const app: Application = express()
const port: number = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/player', query('entityId').exists(), (_req: Request, res: Response) => {
  const errors = validationResult(_req)
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const entityId = _req.query.entityId as string

  index.findObject(hit => hit.objectID === entityId)
    .then(obj => {
      return res.status(200).send(obj)
    })
    .catch(e => {
      return res.status(404).send('obj not exists')
    })
})

app.post('/player', [
  check('section').exists(),
  check('prefecture').exists(),
  check('name').exists(),
  check('team').exists(),
  check('position').exists(),
  check('pitching_arm').exists(),
  check('batting_arm').exists(),
], (_req: Request, res: Response) => {
  const errors = validationResult(_req)
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const params = _req.body as candidatePlayer

  const repo = new candidatePlayersRepository
  repo.insert(params)
    .then(data => {
      index.saveObject(params, {autoGenerateObjectIDIfNotExist: true})
      return res.status(200).send(data)
    })
    .catch(() => {
      return res.status(500).send({'message': 'Insert failed'})
    })
})

app.post('/team', [
  check('code').exists(),
  check('name').exists(),
], (_req: Request, res: Response) => {
  const errors = validationResult(_req)
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const params = _req.body as Team
  const repo = new teamsRepository
  repo.insert(params)
    .then(data => {
      return res.status(200).send(data)
    })
    .catch(() => {
      return res.status(500).send({'message': 'Insert failed'})
    })
})

/**
 * Batch用のエンドポイント
 */
app.post('/batch', (_req: Request, res: Response) => {
  index.search('')
    .then(hits => {
      hits.hits.map(hit => {
        if (hit.objectID === '872683000') {
          index.partialUpdateObject(
            {objectID: hit.objectID, teamName: 'Swallows'},
            {createIfNotExists: false}
          )
          .then(res => console.log(res))
          .catch(err => console.log(err))
        }
        return
      })
      return res.status(200).send(hits)
    })
    .catch(() => {
      return res.status(500).send({'message': 'failed updated'})
    })
})

try {
  app.listen(port, () => {
    console.log(`dev server running at: http://localhost:${port}`)
  })
} catch (e) {
  console.log(e)
}