import { TAcademicDepartment } from './academicDepartment.interface'
import AcademicDepartment from './academicDepartment.model'

const insertAcademicDepartmentToDb = async (
  academicDepartmentData: TAcademicDepartment,
) => {
  const academicDepartment = await AcademicDepartment.create(
    academicDepartmentData,
  )
  return academicDepartment
}

const getAllAcademicDepartments = async () => {
  const academicDepartments = await AcademicDepartment.find({}).select('-__v')
  return academicDepartments
}

const getSingleAcademicDepartmentById = async (id: string) => {
  const academicDepartment =
    await AcademicDepartment.findById(id).select('-__v')
  return academicDepartment
}

const deleteAcademicDepartmentById = async (id: string) => {
  const academicDepartment =
    await AcademicDepartment.findByIdAndDelete(id).select('-__v')
  return academicDepartment
}

const deleteAllAcademicDepartments = async () => {
  const academicDepartments = await AcademicDepartment.deleteMany({})
  return academicDepartments
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
  deleteAllAcademicDepartments,
  updateAcademicDepartmentById,
}
