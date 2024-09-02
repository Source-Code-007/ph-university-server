import QueryBuilder from '../../builder/QueryBuilder'
import { facultySearchableFields } from './faculty.constant'
import { TFaculty } from './faculty.interface'
import { Faculty } from './faculty.model'

const getAllFaculty = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(Faculty.find({}), query)
    .searchQuery(facultySearchableFields)
    .filterQuery()
    .sortQuery()
    .fieldFilteringQuery()
    .paginateQuery()
    .populateQuery([
      { path: 'user', select: '-createdAt -updatedAt -__v' },
      {
        path: 'academicDepartment',
        select: '-createdAt -updatedAt -__v',
        populate: {
          path: 'academicFaculty',
          select: '-createdAt -updatedAt -__v',
        },
      },
    ])
  const faculty = await facultyQuery.queryModel
  return faculty
}

const getSingleFacultyById = async (id: string) => {
  const faculty = await Faculty.findById(id)
    .select('-__v')
    .populate('user', '-createdAt -updatedAt -__v')
    .populate('academicDepartment', '-createdAt -updatedAt -__v')
  return faculty
}

const deleteFacultyById = async (id: string) => {
  const faculty = await Faculty.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  ).select('-__v')
  return faculty
}

const updateFacultyById = async (
  id: string,
  updatedFaculty: Partial<TFaculty>,
) => {
  const { name, ...restProps } = updatedFaculty
  const modifiedUpdatedFaculty: Record<string, unknown> = { ...restProps }

  if (name && Object.keys(name)?.length > 0) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedFaculty[`name.${key}`] = value
    }
  }

  const faculty = await Faculty.findByIdAndUpdate(id, modifiedUpdatedFaculty, {
    new: true,
  }).select('-__v')
  return faculty
}
export const facultyServices = {
  getAllFaculty,
  getSingleFacultyById,
  deleteFacultyById,
  updateFacultyById,
}
