import { Types } from 'mongoose'
type TFacultyName = {
  firstName: string
  middleName?: string
  lastName: string
}

type TBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

type TFaculty = {
  id: string
  user: Types.ObjectId
  designation: string
  name: TFacultyName
  gender: string
  dateOfBirth: Date
  email: string
  phone: string
  nid: string
  bloodGroup: TBloodGroup
  presentAddress: string
  permanentAddress: string
  profileImg: string
  academicDepartment: Types.ObjectId
  isDeleted: boolean
}

export { TFaculty, TFacultyName }
