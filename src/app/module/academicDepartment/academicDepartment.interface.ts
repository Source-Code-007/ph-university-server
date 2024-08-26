import { Types } from 'mongoose'

type TAcademicDepartment = {
  name: string
  shortName: string
  academicFaculty: Types.ObjectId
  totalStudent: number
  totalFaculty: number
  isDeleted: boolean
}

export { TAcademicDepartment }
