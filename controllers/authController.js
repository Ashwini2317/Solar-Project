const Admin = require("../models/Admin")
const bcrypt = require("bcryptjs")
const expressAsyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")


const registerAdmin = expressAsyncHandler(async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10)
  await Admin.create({ ...req.body, password: hash })
  res.json({ massage: "admin register success" })
  console.log(hash);

})
const loginAdmin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body
  const result = await Admin.findOne({ email })
  if (!result) {
    res.status(400).json({ massage: "invalid creatials email" })
  }
  const varify = await bcrypt.compare(password, result.password)
  if (!varify) {
    return res.status(401).json({ massage: "invalid creatiantials password" })
  }
  const token = jwt.sign({ _id: result._id }, process.env.JWT_KEY, { expiresIn: "1d" })
  res.cookie("ADMIN", token, { maxAge: 1000 * 60 * 60 * 24, secure: false, httpOnly: true })
  res.json({
    massage: "admin login success", result: {
      _id: result._id,
      name: result.name,
      email: result.email
    }
  })

})
const logoutAdmin = expressAsyncHandler((req, res) => {
  res.clearCookie("ADMIN")
  res.json({ massage: "admin logout success" })
})

module.exports = { registerAdmin, loginAdmin, logoutAdmin }