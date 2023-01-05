import express, { Application, Request, Response } from 'express'

const app: Application = express()
const port: number = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (_req: Request, res: Response) => {
  return res.status(200).send({
    message: 'Hello, TypeScript'
  })
})

try {
  app.listen(port, () => {
    console.log(`dev server running at: http://localhost:${port}`)
  })
} catch (e) {
  console.log(e.message)
}
