import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/appError'
import Batch from './batch.model'
import AcademicDepartment from '../academicDepartment/academicDepartment.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { batchSearchableFields } from './batch.constant'

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

const getAllBatch = async (query: Record<string, unknown>) => {
  const batchQuery = new QueryBuilder(Batch.find(), {
    ...query,
    sort: `${query.sort} totalStudent`,
  })
    .searchQuery(batchSearchableFields)
    .filterQuery()
    .sortQuery()
    .paginateQuery()
    .fieldFilteringQuery()
    .populateQuery([
      {
        path: 'department',
      },
    ])

  const result = await batchQuery?.queryModel
  const total = await Batch.countDocuments(batchQuery?.queryModel.getFilter())
  return { data: result, total }
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
