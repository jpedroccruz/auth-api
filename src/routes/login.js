import connection from '../connection.js'
import bcrypt from 'bcrypt'
import dotevn from 'dotenv'
import jwt from 'jsonwebtoken'

dotevn.config()

export default async function login(req, res) {
  const { email, password } = req.body

  // check credentials
  if (!email || !password) {
    return res.status(400).json({ mensage: "Credentials missing."})
  }

  // check if user exists
  const [ [ user ] ] = await connection.query(`SELECT * FROM user WHERE email = '${email}'`)
  if (!user) {
    return res.status(404).json({ mensage: "User not found."})
  }

  // check if password matchs
  const checkPassword = await bcrypt.compare(password, user.password)
  if (!checkPassword) {
    return res.status(400).json({ mensage: "Invalid password."})
  }

  // send jwt on response
  try {
    const secret = process.env.SECRET
    const token = jwt.sign({ user: user.id}, secret)

    res.status(200).json({ mensage: "Authentication completed. You're logged!", token })
  } catch (error) {
    res.status(500).json({ mensage: "There was an Internal Server Error."})
  }
}