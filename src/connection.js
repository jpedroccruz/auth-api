import dotenv from 'dotenv'
import mysql from 'mysql2/promise'

dotenv.config()

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  user: process.env.MYSQL_USER,
})

export default connection