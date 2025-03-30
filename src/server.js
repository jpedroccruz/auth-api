import express from 'express'
import register from './routes/register.js'
import login from './routes/login.js'
import user from './routes/user.js'
import checkToken from './middlewares/checkToken.js'
import checkPermission from './middlewares/checkPermission.js'

const app = express()
const PORT = process.env.PORT

app.use(express.json())

// test route
app.get('/', (_, res) => {
  res.status(200).json({ mensage: "Hello World!" })
})

// register user
app.post('/register', register)
app.post('/login', login)
app.get('/user/:id', checkToken, checkPermission, user) // private route

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))