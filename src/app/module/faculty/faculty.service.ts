import { TFaculty } from './faculty.interface'
import { Faculty } from './faculty.model'

const getAllFaculty = async () => {
  const faculty = await Faculty.find({}).select('-__v').populate('user', '-createdAt -updatedAt -__v').populate('academicDepartment', '-createdAt -updatedAt -__v')
  return faculty
}

const getSingleFacultyById = async (id: string) => {
  const faculty = await Faculty.findById(id).select('-__v').populate('user', '-createdAt -updatedAt -__v').populate('academicDepartment', '-createdAt -updatedAt -__v')
  return faculty
}

const deleteFacultyById = async (id: string) => {
  
  const faculty = await Faculty.findByIdAndUpdate(id, {isDeleted:true}, {new:true}).select('-__v')
  return faculty
}

const updateFacultyById = async (
  id: string,
  updatedFaculty: Partial<TFaculty>,
) => {
  const faculty = await Faculty.findByIdAndUpdate(id, updatedFaculty, {
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
