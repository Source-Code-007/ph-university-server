import { TAcademicFaculty } from './academicFaculty.interface'
import AcademicFaculty from './academicFaculty.model'

const insertAcademicFacultyToDb = async (
  academicFacultyData: TAcademicFaculty,
) => {
  const academicFaculty = await AcademicFaculty.create(academicFacultyData)
  return academicFaculty
}

const getAllAcademicFaculty = async () => {
  const academicFaculty = await AcademicFaculty.find({}).select('-__v')
  return academicFaculty
}

const getSingleAcademicFacultyById = async (id: string) => {
  const academicFaculty = await AcademicFaculty.findById(id).select('-__v')
  return academicFaculty
}

const deleteAcademicFacultyById = async (id: string) => {
  const academicFaculty =
    await AcademicFaculty.findByIdAndDelete(id).select('-__v')
  return academicFaculty
}

const deleteAllAcademicFaculty = async () => {
  const academicFaculty = await AcademicFaculty.deleteMany({})
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
  getAllAcademicFaculty,
  getSingleAcademicFacultyById,
  deleteAcademicFacultyById,
  deleteAllAcademicFaculty,
  updateAcademicFacultyById,
}
