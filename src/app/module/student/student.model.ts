import { Schema, model } from 'mongoose'
import { TGuardian, TName, TStudent } from './student.interface'
import { string } from 'zod'

// Define the TGuardian schema
const GuardianSchema = new Schema<TGuardian>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: String, required: true },
    email: { type: String, required: false, default: null },
  },
  { _id: false },
)
// Define the name schema
const NameSchema = new Schema<TName>(
  {
    firstName: { type: String, required: true },
    middleName: { type: String, required: false, default: null },
    lastName: { type: String, required: true },
  },
  { _id: false },
)

// Define the TStudent schema
const StudentSchema = new Schema<TStudent>({
  id: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  academicInfo: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AcademicInfo',
  },
  name: { type: NameSchema, required: true },
  profileImg: { type: String, required: true },
  gender: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  nid: { type: String, required: true, unique: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: { type: GuardianSchema, required: true },

  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: true,
  },
  isDeleted: { type: Boolean, required: true, default: false },
})

// Create the model
const Student = model<TStudent>('student', StudentSchema)

export { Student }
