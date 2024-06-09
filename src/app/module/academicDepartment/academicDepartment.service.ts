import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/appError'
import AcademicFaculty from '../academicFaculty/academicFaculty.model'
import { TAcademicDepartment } from './academicDepartment.interface'
import AcademicDepartment from './academicDepartment.model'

const insertAcademicDepartmentToDb = async (
  academicDepartmentData: TAcademicDepartment,
) => {
  const isExistAcademicFaculty = await AcademicFaculty.findById(academicDepartmentData?.academicFaculty)
  
  if(!isExistAcademicFaculty){
    throw new AppError(StatusCodes.NOT_FOUND, 'Academic faculty not found!')
  }

  const academicDepartment = await AcademicDepartment.create(
    academicDepartmentData,
  )
  return academicDepartment
}

const getAllAcademicDepartments = async () => {
  const academicDepartments = await AcademicDepartment.find({}).select('-__v').populate('academicFaculty', '_id, name')
  return academicDepartments
}

const getSingleAcademicDepartmentById = async (id: string) => {
  const academicDepartment =
    await AcademicDepartment.findById(id).select('-__v').populate('academicFaculty', '_id, name')
  return academicDepartment
}

const deleteAcademicDepartmentById = async (id: string) => {
  const academicDepartment =
    await AcademicDepartment.findByIdAndUpdate(id, {isDeleted: true}, {new: true}).select('-__v')
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
