import express from 'express'

const app = express()

app.get('/', (_, res) => {
  res.send('Hello, Typescript')
})

app.listen(3000, () => console.log('Server is running'))
