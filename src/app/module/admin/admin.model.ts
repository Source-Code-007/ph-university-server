import { Schema, model } from 'mongoose'
import { TAdmin, TAdminName } from './admin.interface'

// Define the name schema
const NameSchema = new Schema<TAdminName>(
  {
    firstName: { type: String, required: true },
    middleName: { type: String, default: null },
    lastName: { type: String, required: true },
  },
  { _id: false },
)

// Define the TStudent schema
const AdminSchema = new Schema<TAdmin>({
  id: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    immutable: true,
  },
  designation: { type: String, required: true },
  name: { type: NameSchema, required: true },
  profileImg: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  dateOfBirth: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  nid: { type: String, required: true, unique: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true,
  },
  isDeleted: { type: Boolean, required: true, default: false },
})

// Create the model
const Admin = model<TAdmin>('Admin', AdminSchema)

export { Admin }
