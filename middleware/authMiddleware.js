const jwt = require("jsonwebtoken")

const adminProtected = (req, res, next) => {
  const token = req.cookies.ADMIN
  if (!token) {
    return res.status(401).json({ message: "no cookie found" })
  }
  jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
    if (err) {
      return res.status(401).json({ message: "invalid token" })
    }
    req.admin = decode._id
    next()
  })
}
module.exports = { adminProtected }