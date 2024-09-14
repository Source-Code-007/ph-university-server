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
type TGender = 'male' | 'female' | 'other'
type TBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
type TAcadmicInfo = {
  department: Types.ObjectId //FK
  roll: number
  batch: Types.ObjectId //FK
  admissionDate: Date
  admissionYear?: number
  graduationYear?: number
  regSlNo?: number //124217
  regCode?: string // CSE-109-124217
}

type TStudent = {
  id: string
  user: Types.ObjectId
  academicInfo: TAcadmicInfo
  name: TName
  profileImg: string
  gender: TGender
  dateOfBirth: Date
  email: string
  phone: string
  nid: string
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  bloodGroup: TBloodGroup
  isBloodDonor: boolean
  isDeleted: boolean
}

export { TStudent, TGuardian, TAcadmicInfo, TName }
