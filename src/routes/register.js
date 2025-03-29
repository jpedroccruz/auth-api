import connection from '../connection.js'
import bcrypt from 'bcrypt'

export default async function register(req, res) {
  const { email, password } = req.body

  // check credentials
  if (!email || !password) {
    return res.status(400).json({ mensage: "Credentials missing."})
  }

  // check if user already exists
  const [ user ] = await connection.query(`SELECT * FROM user WHERE email = '${email}'`)
  if (user == '[]') {
    return res.status(400).json({ mensage: "User already exists."})
  }

  // add secret layer on credentials
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  // register user
  try {
    connection.query(`INSERT INTO user (email, password) VALUES ('${email}', '${passwordHash}')`)
    res.status(201).json({ mensage: "User Created!"})
  } catch (error) {
    res.status(500).json({ mensage: "There was an Internal Server Error."})
  } 
}