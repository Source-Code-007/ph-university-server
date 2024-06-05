import { Schema, model } from 'mongoose'
import { TUser } from './user.interface'

const UserSchema = new Schema<TUser>({
  id: { type: String, required: [true, 'Id is required'] }, //FK
  password: { type: String, required: [true, 'Password is required'] },
  needsPasswordChange: { type: Boolean, required: [true, 'Id is required'] },
  role: { type: String, enum: ['Admin', 'Faculty', 'Student'] },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  isDeleted: { type: Boolean, default: false } 
},{timestamps: true})

const User = model<TUser>('user', UserSchema) 
export default User