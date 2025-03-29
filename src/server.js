import express from 'express'
import register from './routes/register.js'

const app = express()
const PORT = process.env.PORT

app.use(express.json())

// test route
app.get('/', (_, res) => {
  res.status(200).json({ mensage: "Hello World!" })
})

// register user
app.post('/register', register)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))