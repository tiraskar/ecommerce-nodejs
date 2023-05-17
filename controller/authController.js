import User from '../models/User.js'
import CryptoJS from 'crypto-js'
import Jwt from 'jsonwebtoken'

//Registration
const registerUser = async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    res.send('Please provide all values.')
  }

  const newUser = await User.create({
    username,
    email,
    password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
  })

  res.send(newUser)
}

//Login User

const loginUser = async (req, res) => {
  const { username } = req.body
  if (!username || !req.body.password) {
    res.status(401).json('Please provide all values.')
  }
  const checkUser = await User.findOne({ username })
  if (!checkUser) {
    res.status(401).json("User doesn't exits")
  }

  const checkPassword = CryptoJS.AES.decrypt(
    checkUser.password,
    process.env.PASS_SEC
  ).toString(CryptoJS.enc.Utf8)
  const accessToken = Jwt.sign(
    {
      id: checkUser._id,
      isAdmin: checkUser.isAdmin,
    },
    process.env.JWT_SEC,
    { expiresIn: '1d' }
  )
  if (checkPassword !== req.body.password) {
    res.status(401).json("password doesn't match")
  }
  const { password, ...others } = checkUser._doc
  res.status(200).json({ ...others, accessToken })
}

export { registerUser, loginUser }
