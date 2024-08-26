import QueryBuilder from '../../builder/QueryBuilder'
import { academicFacultySearchableFields } from './academicFaculty.constant'
import { TAcademicFaculty } from './academicFaculty.interface'
import AcademicFaculty from './academicFaculty.model'

const insertAcademicFacultyToDb = async (
  academicFacultyData: TAcademicFaculty,
) => {
  const academicFaculty = await AcademicFaculty.create(academicFacultyData)
  return academicFaculty
}

const getAllAcademicFaculties = async (query: Record<string, unknown>) => {
  const academicFacultyQuery = new QueryBuilder(AcademicFaculty.find(), {
    ...query,
    sort: `${query.sort} isDeleted`,
  })
    .searchQuery(academicFacultySearchableFields)
    .filterQuery()
    .paginateQuery()
    .sortQuery()
    .fieldFilteringQuery()
    .populateQuery([])

  const result = await academicFacultyQuery.queryModel

  const total = await AcademicFaculty.countDocuments(
    academicFacultyQuery.queryModel.getFilter(),
  )
  return { data: result, total }
}

const getSingleAcademicFacultyById = async (id: string) => {
  const academicFaculty = await AcademicFaculty.findById(id).select('-__v')
  return academicFaculty
}

const deleteAcademicFacultyById = async (id: string) => {
  const academicFaculty = await AcademicFaculty.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  ).select('-__v')
  return academicFaculty
}

const updateAcademicFacultyById = async (
  id: string,
  updatedAcademicFaculty: Partial<TAcademicFaculty>,
) => {
  const academicFaculty = await AcademicFaculty.findByIdAndUpdate(
    id,
    updatedAcademicFaculty,
    { new: true },
  ).select('-__v')
  return academicFaculty
}

export const academicFacultyServices = {
  insertAcademicFacultyToDb,
  getAllAcademicFaculties,
  getSingleAcademicFacultyById,
  deleteAcademicFacultyById,
  updateAcademicFacultyById,
}
