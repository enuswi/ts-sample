import express, { Application, Request, Response } from 'express'
import { IntroToFirestoreRepository } from './repositories/posts/introToFirestore'

const app: Application = express()
const port: number = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_req: Request, res: Response) => {
  const repo = new IntroToFirestoreRepository
  repo.get()
    .then((data) => { return res.status(200).send(data) })
    .catch(() => { return res.status(404).send({'message': 'Not found data.'}) })
})

app.post('/post', (_req: Request, res: Response) => {
  const repo = new IntroToFirestoreRepository
  repo.insert('test title', 'test body')
    .then((data) => { return res.status(200).send(data) })
    .catch(() => { return res.status(500).send({'message': 'insert failed.'}) })
})

app.patch('/post', (_req: Request, res: Response) => {
  const repo = new IntroToFirestoreRepository
  repo.update('update body')
    .then((data) => { return res.status(200).send(data) })
    .catch(() => { return res.status(500).send({'message': 'update failed.'}) })
})

app.delete('/post', (_req: Request, res: Response) => {
  const repo = new IntroToFirestoreRepository
  repo.delete()
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
