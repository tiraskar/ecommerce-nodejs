import mongoose from 'mongoose'
import validator from 'validator'

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'Please provide a valid email',
      },
    },
    password: { type: String, required: true, minLength: 6 },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export default mongoose.model('User', UserSchema)
