import { Schema, model, startSession } from 'mongoose'
import { TAcadmicInfo, TGuardian, TName, TStudent } from './student.interface'
import Batch from '../batch/batch.model'
import AppError from '../../errors/appError'
import { StatusCodes } from 'http-status-codes'
import AcademicDepartment from '../academicDepartment/academicDepartment.model'

// Define the TGuardian schema
const GuardianSchema = new Schema<TGuardian>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: String, required: true },
    email: { type: String, default: null },
  },
  { _id: false },
)
// Define the name schema
const NameSchema = new Schema<TName>(
  {
    firstName: { type: String, required: true },
    middleName: { type: String, default: null },
    lastName: { type: String, required: true },
  },
  { _id: false },
)

// Academic info schema
const AcademicInfo = new Schema<TAcadmicInfo>(
  {
    department: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicDepartment',
    },
    roll: { type: Number, default: 1 },
    batch: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Batch',
    },
    admissionDate: { type: Date, required: true },
    admissionYear: { type: Number },
    graduationYear: { type: Number, default: null },
    regSlNo: { type: Number },
    regCode: { type: String },
  },
  { _id: false },
)

// Define the TStudent schema
const StudentSchema = new Schema<TStudent>({
  id: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    // required: true,
    ref: 'User',
    immutable:true
  },
  academicInfo: { type: AcademicInfo, required: true, immutable:true },
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

// Pre hook
StudentSchema.pre('save', async function (next) {
  try {

    // Set admissionYear as the year of admissionDate
    if (this.academicInfo?.admissionDate) {
      this.academicInfo.admissionYear = this.academicInfo?.admissionDate?.getFullYear()
    }
    next()
  } catch (e:any) {
    next(e)
  }
})

// Create the model
const Student = model<TStudent>('student', StudentSchema)

export { Student }
