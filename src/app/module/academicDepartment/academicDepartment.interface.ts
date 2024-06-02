import { Types } from "mongoose"

type TAcademicDepartment = {
    name: string,
    academicFaculty: Types.ObjectId,
}

export {TAcademicDepartment}