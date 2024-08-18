import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/appError'
import AcademicFaculty from '../academicFaculty/academicFaculty.model'
import { TAcademicDepartment } from './academicDepartment.interface'
import AcademicDepartment from './academicDepartment.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { academicDepartmentSearchableFields } from './academicDepartment.constant'

const insertAcademicDepartmentToDb = async (
  academicDepartmentData: TAcademicDepartment,
) => {
  const isExistAcademicFaculty = await AcademicFaculty.findById(
    academicDepartmentData?.academicFaculty,
  )

  if (!isExistAcademicFaculty) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Academic faculty not found!')
  }

  const academicDepartment = await AcademicDepartment.create(
    academicDepartmentData,
  )
  return academicDepartment
}

const getAllAcademicDepartments = async (query: Record<string, unknown>) => {
  const academicDepartmentQuery = new QueryBuilder(
    AcademicDepartment.find(query),
    query,
  )
    .searchQuery(academicDepartmentSearchableFields)
    .filterQuery()
    .paginateQuery()
    .sortQuery()
    .fieldFilteringQuery()
    .populateQuery([
      {
        path: 'academicFaculty',
        select: '_id name',
      },
    ])

  const result = await academicDepartmentQuery.queryModel

  await AcademicDepartment.find({})
    .select('-__v')
    .populate('academicFaculty', '_id, name')
  const total = await AcademicDepartment.countDocuments({})
  return { data: result, total }
}

const getSingleAcademicDepartmentById = async (id: string) => {
  const academicDepartment = await AcademicDepartment.findById(id)
    .select('-__v')
    .populate('academicFaculty', '_id, name')
  return academicDepartment
}

const deleteAcademicDepartmentById = async (id: string) => {
  const academicDepartment = await AcademicDepartment.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  ).select('-__v')
  return academicDepartment
}

const updateAcademicDepartmentById = async (
  id: string,
  updatedAcademicDepartment: Partial<TAcademicDepartment>,
) => {
  const academicDepartment = await AcademicDepartment.findByIdAndUpdate(
    id,
    updatedAcademicDepartment,
    { new: true },
  ).select('-__v')
  return academicDepartment
}

export const academicDepartmentServices = {
  insertAcademicDepartmentToDb,
  getAllAcademicDepartments,
  getSingleAcademicDepartmentById,
  deleteAcademicDepartmentById,
  updateAcademicDepartmentById,
}
