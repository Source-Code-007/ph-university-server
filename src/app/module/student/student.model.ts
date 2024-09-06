/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from 'mongoose'
import { TAcadmicInfo, TGuardian, TName, TStudent } from './student.interface'

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
    admissionDate: { type: Date, default: new Date() },
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
    required: true,
    ref: 'User',
    immutable: true,
  },
  academicInfo: { type: AcademicInfo, required: true, immutable: true },
  name: { type: NameSchema, required: true },
  profileImg: {
    type: String,
    default: function () {
      return this.gender === 'male'
        ? 'https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png'
        : this.gender === 'female'
          ? 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-512.png'
          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbxbloQR1_FBnDB7WUPxwRB3geLh77OCHBnA&s'
    },
  },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  dateOfBirth: { type: Date, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  nid: { type: String, required: true },
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
      this.academicInfo.admissionYear =
        this.academicInfo?.admissionDate?.getFullYear()
    }
    next()
  } catch (e: any) {
    next(e)
  }
})

// Create the model
const Student = model<TStudent>('student', StudentSchema)

export { Student }
