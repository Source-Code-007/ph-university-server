import { Types } from "mongoose"

type TGuardian = {
    name: string,
    phone: string,
    age: string,
    email: string | null
}
type TBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
type TStudent = {
    user: Types.ObjectId,
    name: string,
    gender: string,
    dateOfBirth: Date,
    email: string,
    phone: string,
    nid: string,
    presentAddress: string,
    permanentAddress: string,
    guardian: TGuardian,
    academicInfo: Types.ObjectId,
    bloodGroup: TBloodGroup
    isDeleted: boolean,
}

export {TStudent, TGuardian}