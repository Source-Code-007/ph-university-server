import { Schema, model } from 'mongoose'
import { TUser } from './user.interface'

const UserSchema = new Schema<TUser>({
  id: { type: String, require: [true, 'Id is required'] },
  password: { type: String, required: [true, 'Password is required'] },
  needsPasswordChange: { type: Boolean, required: [true, 'Id is required'] },
  role: { type: String, enum: ['Admin', 'Faculty', 'Student'] },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  isDeleted: { type: Boolean, default: false } 
})

const User = model('user', UserSchema) 
export default User