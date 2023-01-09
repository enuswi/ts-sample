import express, { Application, Request, Response } from 'express'
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
      if (!data.exists) throw new Error()
      return res.status(200).send(data.data())
    })
    .catch((e) => { return res.status(404).send({'message': 'Not found data.'}) })
})

app.post('/post', (_req: Request, res: Response) => {
  if (_req.body === undefined) return res.status(400).send({'message': 'Bad Request.'})

  const title = String(_req.body.title) || ''
  const body = String(_req.body.body) || ''

  const repo = new IntroToFirestoreRepository
  repo.insert(title, body)
    .then((data) => { return res.status(200).send(data) })
    .catch(() => { return res.status(500).send({'message': 'insert failed.'}) })
})

app.patch('/post', (_req: Request, res: Response) => {
  if (_req.body === undefined || _req.body.key === undefined) {
    return res.status(400).send({'message': 'Bad Request.'})
  }

  const title = String(_req.body.title) || ''
  const body = String(_req.body.body) || ''

  const repo = new IntroToFirestoreRepository
  repo.update(String(_req.body.key), title, body)
    .then((data) => { return res.status(200).send(data) })
    .catch(() => { return res.status(500).send({'message': 'update failed.'}) })
})

app.delete('/post', (_req: Request, res: Response) => {
  if (_req.body === undefined || _req.body.key === undefined) {
    return res.status(400).send({'message': 'Bad Request.'})
  } 

  const repo = new IntroToFirestoreRepository
  repo.delete(String(_req.body.key))
    .then((data) => { return res.status(200).send(data) })
    .catch(() => { return res.status(500).send({'message': 'delete faild.'}) })
})

try {
  app.listen(port, () => {
    console.log(`dev server running at: http://localhost:${port}`)
  })
} catch (e) {
  console.log(e)
}
