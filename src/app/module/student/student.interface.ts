import { Types } from 'mongoose'

type TGuardian = {
  name: string
  phone: string
  age: string
  email: string | null
}
type TName = {
  firstName: string
  middleName?: string
  lastName: string
}
type TBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
type TAcadmicInfo = {
  department: string,
  roll: number,
  batch: string,
  admissionDate: Date,
  admissionYear?: string,
  graduationYear?: string,
  regSlNo: number,
  regCode: string, // CSE-109-

}

type TStudent = {
  id: string
  user: Types.ObjectId
  academicInfo: Types.ObjectId
  name: TName
  profileImg: string
  gender: string
  dateOfBirth: Date
  email: string
  phone: string
  nid: string
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  bloodGroup: TBloodGroup
  isDeleted: boolean
}

export { TStudent, TGuardian, TName }
