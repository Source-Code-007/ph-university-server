import { Types } from 'mongoose'
type TAdminName = {
  firstName: string
  middleName?: string
  lastName: string
}

type TBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

type TAdmin = {
  id: string
  user: Types.ObjectId
  designation: string
  name: TAdminName
  gender: string
  dateOfBirth: Date
  email: string
  phone: string
  nid: string
  bloodGroup: TBloodGroup
  presentAddress: string
  permanentAddress: string
  profileImg: string
  isDeleted: boolean
}

export { TAdmin, TAdminName }
