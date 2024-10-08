import { Schema, model } from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    shortName: { type: String, required: true, unique: true },
    totalStudent: { type: Number, default: 0 },
    totalFaculty: { type: Number, default: 0 },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const AcademicDepartment = model('AcademicDepartment', academicDepartmentSchema)
export default AcademicDepartment
