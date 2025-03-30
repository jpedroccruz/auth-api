export default function checkPermission(req, res, next) {
  const { id } = req.params

  // checks if the id passed is equal to the id extracted token
  if (req.userId !== id) {
    return res.status(401).json({ mensage: "Access negated. Permission denied."})
  }
  
  next()
}