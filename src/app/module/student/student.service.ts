import { populate } from "dotenv";
import { Student } from "./student.model";

const getAllStudent = async()=> {
    const students = await Student.find().select('-__v').populate('user').populate(
        {
            path: 'academicInfo.department',
            select: '-createdAt -updatedAt -__v',
            populate: {
                path: 'academicFaculty',
                select: '-createdAt -updatedAt -__v'
            }
        }
    ).populate('academicInfo.batch', '-createdAt -updatedAt -__v');
    return students;
}

const getStudentById = async(id:string)=> {
    const student = await Student.findById(id).select('-__v').populate('user').populate('academicInfo.department').populate('academicInfo.batch');
    return student;
}


export const studentServices = {
    getAllStudent,
    getStudentById
}