import express from 'express'

const app = express()
const PORT = process.env.PORT

app.get('/', (_, res) => {
  res.status(200).json({ mensage: "Hello World!" })
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))