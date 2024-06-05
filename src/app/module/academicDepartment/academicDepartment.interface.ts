import { Types } from "mongoose"

type TAcademicDepartment = {
    name: string,
    shortName: string,
    academicFaculty: Types.ObjectId,
}

export {TAcademicDepartment}