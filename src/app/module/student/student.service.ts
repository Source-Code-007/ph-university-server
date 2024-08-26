import { Student } from './student.model'
import { TStudent } from './student.interface'
import { studentSearchableFields } from './students.constant'
import QueryBuilder from '../../builder/QueryBuilder'

const getAllStudent = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query }

  // const searchTerm = (query?.searchTerm as string) || ''

  // //   Search by first name, email and presentAddress
  // const searchQuery = Student.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // })

  // const excludedFields = ['searchTerm', 'page', 'limit', 'sort', 'fields']
  // excludedFields.forEach((el) => {
  //   delete queryObj[el]
  // })

  // //   Filter by query
  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('user', '-createdAt -updatedAt -__v')
  //   .populate({
  //     path: 'academicInfo.department',
  //     select: '-createdAt -updatedAt -__v',
  //     populate: {
  //       path: 'academicFaculty',
  //       select: '-createdAt -updatedAt -__v',
  //     },
  //   })
  //   .populate({
  //     path: 'academicInfo.batch',
  //     select: '-createdAt -updatedAt -__v -department',
  //   })

  //   // Fields filtering
  //   const fields = (query?.fields as string) || '-__v'
  //   const fieldFilteringQuery = filterQuery.select(fields.split(',').join(' '))

  // // sort
  // const sort = (query?.sort as string) || '-createdAt'
  // const sortQuery = fieldFilteringQuery.sort(sort)

  // //   Paginate
  // const limit = Number(query?.limit) || 10
  // const skip = query?.page ? (Number(query?.page) - 1) * Number(limit) : 1

  // const paginateQuery = sortQuery.limit(Number(limit)).skip(skip)

  // return paginateQuery

  const studentQuery = new QueryBuilder(Student.find(), {
    ...query,
    sort: `${query.sort} isDeleted`,
  })
    .searchQuery(studentSearchableFields)
    .filterQuery()
    .sortQuery()
    .paginateQuery()
    .fieldFilteringQuery()
    .populateQuery([
      { path: 'user', select: '-createdAt -updatedAt -__v' },
      {
        path: 'academicInfo.department',
        select: '-createdAt -updatedAt -__v',
        populate: {
          path: 'academicFaculty',
          select: '-createdAt -updatedAt -__v',
        },
      },
      {
        path: 'academicInfo.batch',
        select: '-createdAt -updatedAt -__v -department',
      },
    ])

  const result = await studentQuery?.queryModel
  const total = await Student.countDocuments(
    studentQuery.queryModel.getFilter(),
  )
  return { data: result, total }
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

const deleteStudentById = async (id: string) => {
  const student = await Student.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  ).select('-__v')
  return student
}

export const studentServices = {
  getAllStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
}
