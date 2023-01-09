import express, { Application, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { IntroToFirestoreRepository } from './repositories/posts/introToFirestore'

const app: Application = express()
const port: number = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_req: Request, res: Response) => {
  if (_req.query.entityId == undefined) return res.status(400).send({ 'message': 'Bad Request.' })
  const entityId: string = String(_req.query.entityId)

  const repo = new IntroToFirestoreRepository
  repo.find(entityId)
    .then((data) => {
      if (!data.exists) throw new Error('data not exists.')
      return res.status(200).send(data.data())
    })
    .catch((e) => {
      console.log(e)
      return res.status(404).send({'message': 'Not found data.'})
    })
})

type PostParams = {
  title: string,
  body: string
}

app.post('/post',
  body('title').exists(),
  body('title').isString(),
  body('body').exists(),
  body('body').isString(),
  (_req: Request, res: Response) => {

  const errors = validationResult(_req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const postParams = _req.body as PostParams

  const title = postParams.title
  const body = postParams.body

  const repo = new IntroToFirestoreRepository
  repo.insert(title, body)
    .then((data) => { return res.status(200).send(data) })
    .catch(() => { return res.status(500).send({'message': 'Insert failed.'}) })
})

type PatchParams = {
  key: string,
  title: string,
  body: string
}

app.patch('/post',
  body('key').exists(),
  body('key').isString(),
  body('title').exists(),
  body('title').isString(),
  body('body').exists(),
  body('body').isString(),
  (_req: Request, res: Response) => {

  const errors = validationResult(_req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const patchParams = _req.body as PatchParams

  const key = patchParams.key
  const title = patchParams.title
  const body = patchParams.body

  const repo = new IntroToFirestoreRepository
  repo.update(key, title, body)
    .then((data) => { return res.status(200).send(data) })
    .catch(() => { return res.status(500).send({'message': 'Update failed.'}) })
})

type DeleteParams = {
  key: string
}

app.delete('/post', body('key').exists(), body('key').isString(), (_req: Request, res: Response) => {
  const errors = validationResult(_req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const deleteParams = _req.body as DeleteParams
  const key = deleteParams.key

  const repo = new IntroToFirestoreRepository
  repo.delete(key)
    .then((data) => { return res.status(200).send(data) })
    .catch(() => { return res.status(500).send({'message': 'Delete faild.'}) })
})

try {
  app.listen(port, () => {
    console.log(`dev server running at: http://localhost:${port}`)
  })
} catch (e) {
  console.log(e)
}
