import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/appError'
import Batch from './batch.model'


const insertBatchToDb = async () => {
  const lastBatch = await Batch.findOne({}).sort({createdAt:-1}).limit(1)
  const totalBatch = await Batch.find({}).countDocuments()
  
  if(totalBatch && lastBatch && lastBatch?.totalStudent < Number(process.env.MAX_STUDENT_PER_BATCH)){
    throw new AppError(StatusCodes.BAD_REQUEST, `Last batch is not full! Batch-${totalBatch} has ${Number(process.env.MAX_STUDENT_PER_BATCH) - lastBatch?.totalStudent} seats left!`)
  }

  const batch = await Batch.create(
    {
      batch:  totalBatch ? totalBatch + 1 : 1,
      totalStudent: 0,
    }
  )
  return batch
}

const getAllBatch = async () => {
  const batch = await Batch.find({})
    .select('-__v')
  return batch
}

const getSingleBatchById = async (id: string) => {
  const batch = await Batch.findById(id)
    .select('-__v')
  return batch
}


export const batchServices = {
  insertBatchToDb,
  getAllBatch,
  getSingleBatchById
}
