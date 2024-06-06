import { populate } from 'dotenv'
import { Student } from './student.model'
import { TStudent } from './student.interface'
import { studentSearchableFields } from './students.contant'


const getAllStudent = async (query: Record<string, unknown>) => {
  const queryObj = { ...query }

  const searchTerm = query?.searchTerm as string || ''


  //   Search by first name, email and presentAddress
  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  })

  const excludedFields = ['searchTerm', 'page', 'limit', 'sort']

  excludedFields.forEach((el) => {
    delete queryObj[el]
  })

  console.log(queryObj, 'queryObj');

  //   Filter by query
  const filterQuery = searchQuery
    .find(queryObj)
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

  // sort
  const sort = query?.sort || '-createdAt'

  const sortQuery = await filterQuery.sort(sort as string)

  return sortQuery
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
