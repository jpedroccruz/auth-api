import connection from '../connection.js'
import bcrypt from 'bcrypt'
import dotevn from 'dotenv'
import jwt from 'jsonwebtoken'

dotevn.config()

export default async function user(req, res) {
  // get user id from url
  const { id } = req.params

  const [ [ user] ] = await connection.query(`SELECT id, email FROM user WHERE id = ${id}`)

  // verify if user exists
  if (!user) {
    return res.status(404).json({ mensage: "User not found."})
  }

  res.status(200).json(user)
}