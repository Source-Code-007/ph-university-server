import { Types } from "mongoose"

type TGuardian = {
    name: string,
    phone: string,
    age: string,
    email: string | null
}
type TStudent = {
    user: Types.ObjectId,

    name: string,
    gender: string,
    dateOfBirth: Date,
    email: string,
    phone: string,
    semester: string,
    batch: string,
    presentAddress: string,
    permanentAddress: string,
    needsPasswordChange: boolean,
    guardian: TGuardian,
    academicDepartment: Types.ObjectId,
    isDeleted: boolean,
}

export {TStudent, TGuardian}