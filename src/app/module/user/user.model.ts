import { Schema, model } from 'mongoose'
import { TUser } from './user.interface'

const UserSchema = new Schema<TUser>({
  id: { type: String }, //FK
  password: { type: String, required: [true, 'Password is required'] },
  needsPasswordChange: { type: Boolean, default: false},
  role: { type: String, enum: ['admin', 'faculty', 'student'], required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  isDeleted: { type: Boolean, default: false } 
},{timestamps: true})

const User = model<TUser>('user', UserSchema) 
export default User