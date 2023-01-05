/**
 * TODO
 * - TypeScript化
 * - Linter
 * - Jest
 */

// express
const express = require('express')
const app = express()
const port = 3000

// firestore
const { Firestore } = require('@google-cloud/firestore')
const firestore = new Firestore()

async function quickstart() {
  const document = firestore.doc('posts/intro-to-firestore')

  // Insert
  await document.set({
    title: 'Welcome to Firestore',
    body: 'Hello World'
  })
  console.log('Entered new data into the document')

  // Update
  await document.update({
    body: 'My first Firestore app',
  })
  console.log('Updated an existing document')

  // Read
  const doc = await document.get()
  console.log('Read the document')

  // Delete
  await document.delete()
  console.log('Delete the document')
}

app.get('/', (req, res) => {
  quickstart()

  res.send('Hello, World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
