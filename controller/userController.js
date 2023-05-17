import User from '../models/User.js'

//update
const updateUser = async (req, res) => {
  const { password } = req.body
  const { id } = req.params
  if (password) {
    const hashPassword = CryptoJS.AES.encrypt(
      password,
      process.env.JWT_SEC
    ).toString
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json('User has been deleted.')
  } catch (error) {
    res.status(500).json(error)
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, ...others } = user._doc
    res.status(200).json(others)
  } catch (error) {
    res.status(400).json(error)
  }
}

const getAllUser = async (req, res) => {
  const query = req.query.new
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json(error)
  }
}

const getUserStats = async (req, res) => {
  const date = new Date()
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ])
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json(error)
  }
}
export { updateUser, deleteUser, getUser, getAllUser, getUserStats }
