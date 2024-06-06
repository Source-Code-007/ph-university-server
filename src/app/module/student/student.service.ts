import { populate } from 'dotenv'
import { Student } from './student.model'
import { TStudent } from './student.interface'
import { studentSearchableFields } from './students.contant'

const getAllStudent = async (query:Record<string, unknown>) => {
    let searchTerm = ''

    if(query?.searchTerm){
        searchTerm = query.searchTerm as string
    }



  const students = await Student.find({
    $or: studentSearchableFields.map(field=> (
        {[field]: {$regex: searchTerm, $options: 'i'}}
    ))
  })
    .select('-__v')
    .populate('user', '-createdAt -updatedAt -__v')
    .populate({
      path: 'academicInfo.department',
      select: '-createdAt -updatedAt -__v',
      populate: {
        path: 'academicFaculty',
        select: '-createdAt -updatedAt -__v',
      },
    })
    .populate({
      path: 'academicInfo.batch',
      select: '-createdAt -updatedAt -__v -department',
    })
  return students
}

const getStudentById = async (id: string) => {
  const student = await Student.findById(id)
    .select('-__v')
    .populate('user', '-createdAt -updatedAt -__v')
    .populate({
      path: 'academicInfo.department',
      select: '-createdAt -updatedAt -__v',
      populate: {
        path: 'academicFaculty',
        select: '-createdAt -updatedAt -__v',
      },
    })
    .populate({
      path: 'academicInfo.batch',
      select: '-createdAt -updatedAt -__v -department',
    })
  return student
}

const updateStudentById = async (id: string, payload: Partial<TStudent>) => {

  const { name, guardian, ...restStudentData } = payload
  const modifiedUpdatedData: Record<string, unknown> = {
    ...restStudentData,
  }

  // update non primitive values
  // Update name
  if (name && Object.keys(name)?.length > 0) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }
  // update guardian
  if (guardian && Object.keys(guardian)?.length > 0) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value
    }
  }

  const student = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
  })
    .select('-__v')
    .populate('user', '-createdAt -updatedAt -__v -department')
    .populate('academicInfo.department')
    .populate('academicInfo.batch')

  return student
}

export const studentServices = {
  getAllStudent,
  getStudentById,
  updateStudentById,
}
