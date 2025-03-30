import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export default function checkToken(req, res, next) {
  // get token from auth headers (cookies are more used in this case, but thundercliend does not support cookies)
  const token = req.headers['authorization']
  
  // validade if token exists
  if (!token) {
    return res.status(401).json({ mensage: "Access negated. Any token was passed."})
  }

  // validade token
  try {
    const secret = process.env.SECRET

    const decoded = jwt.verify(token, secret)
    req.userId = decoded.user
    
    next()
  } catch (error) {
    res.status(401).json({ mensage: "Access negated. Invalid token."})
  }
}