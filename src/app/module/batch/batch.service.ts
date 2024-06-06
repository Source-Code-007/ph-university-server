import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/appError'
import Batch from './batch.model'
import AcademicDepartment from '../academicDepartment/academicDepartment.model'

const insertBatchToDb = async (departmentId: string) => {
  const department = await AcademicDepartment.findById(departmentId)
  // const isDeptExistInBatch = await Batch.findOne({department: departmentId})
  const totalBatch = await Batch.find({
    department: departmentId,
  }).countDocuments()
  const lastBatch = await Batch.findOne({ department: departmentId })
    .sort({ createdAt: -1 })
    .limit(1)

  if (!department) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Department not found!')
  }
  if (
    totalBatch &&
    lastBatch &&
    lastBatch?.totalStudent < Number(process.env.MAX_STUDENT_PER_BATCH)
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      
      `Last batch-${totalBatch} of ${department?.name} is not full! There are ${Number(process.env.MAX_STUDENT_PER_BATCH) - lastBatch?.totalStudent} seats left!`,
    )
  }

  const batch = await Batch.create({
    department: departmentId,
    batch: totalBatch ? totalBatch + 1 : 1,
    totalStudent: 0,
  })
  return batch
}

const getAllBatch = async () => {
  const batch = await Batch.find({})
    .select('-__v')
    .populate({
      path: 'department',
      select: '-createdAt -updatedAt -__v',
      populate: {
        path: 'academicFaculty',
        select: '-createdAt -updatedAt -__v',
      },
    })
  return batch
}

const getSingleBatchById = async (id: string) => {
  const batch = await Batch.findById(id)
    .populate({
      path: 'department',
      select: '-createdAt -updatedAt -__v',
      populate: {
        path: 'academicFaculty',
        select: '-createdAt -updatedAt -__v',
      },
    })
    .select('-__v')
  return batch
}

export const batchServices = {
  insertBatchToDb,
  getAllBatch,
  getSingleBatchById,
}
