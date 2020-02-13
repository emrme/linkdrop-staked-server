import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: { type: String },
  phone: { type: String },
  linkId: { type: String, required: true }
})

const User = mongoose.model('User', userSchema)
export default User
