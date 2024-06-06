import { StatusCodes } from 'http-status-codes'
import { TUser } from './user.interface'
import User from './user.model'
import AppError from '../../errors/appError'
import { TStudent } from '../student/student.interface'
import mongoose from 'mongoose'
import { Student } from '../student/student.model'
import Batch from '../batch/batch.model'
import AcademicDepartment from '../academicDepartment/academicDepartment.model'

const insertStudentToDb = async (payload: TStudent & TUser) => {


  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const department = await AcademicDepartment.findById(payload.academicInfo.department)
    const totalStudent = await Student.countDocuments({}).exec()
    const batch = await Batch.findById(payload.academicInfo?.batch)

    // console.log(department, 'department');
    // console.log(totalStudent, 'totalStudent');

    if (!department) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Department not found')
    }
    if (!batch) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Batch not found')
    }

    // Update regSlNo and regCode and id
    const regSlNo = totalStudent > 0 ? totalStudent + 1 : 1
    const regCode = `${department.shortName}-${batch?.batch}-${regSlNo}`
    payload.academicInfo.regSlNo = regSlNo
    payload.academicInfo.regCode = regCode
    payload.id = regCode
    payload.id = regCode

    // Check if batch has reached the maximum student limit
    const maxStudentsPerBatch = Number(process.env.MAX_STUDENT_PER_BATCH) || 45 // Default to 45 if not set
    if (batch.totalStudent >= maxStudentsPerBatch) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Batch is full')
    }

    // Update roll and totalStudent
      payload.academicInfo.roll = batch.totalStudent + 1
      batch.totalStudent += 1
      await batch.save({ session })


      const userData: Partial<TUser> = {
        id: regCode,
        password: payload.password,
        role: 'student',
      };
    // Save user
    const user = await User.create([userData], { session })
    if (!user?.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to insert user to db')
    }


    const studentData: Partial<TStudent> = {
      ...payload,
      id: regCode,
      user: user[0]._id,
      academicInfo: {...payload.academicInfo},
    };
    // Save student
    const student = await Student.create([studentData], { session })
    if (!student?.length) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Failed to insert student to db',
      )
    }

    await session.commitTransaction()
    await session.endSession()
    return student[0]
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const getAllUser = async () => {
  const users = await User.find({}).select('-__v')
  return users
}

const getSingleUserById = async (id: string) => {
  const user = await User.findById(id).select('-__v')
  return user
}

const deleteUserById = async (id: string) => {
  const user = await User.findByIdAndDelete(id).select('-__v')
  return user
}

const deleteAllUser = async () => {
  const users = await User.deleteMany({})
  return users
}

const updateUserById = async (id: string, updatedUser: Partial<TUser>) => {
  const user = await User.findByIdAndUpdate(id, updatedUser, {
    new: true,
  }).select('-__v')
  return user
}

const statusToggleUser = async (id: string) => {
  const user = await User.findById(id)
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!')
  }
  if (user.status === 'active') {
    user.status = 'inactive'
  } else {
    user.status = 'active'
  }
  await user.save()
  return user
}

export const userServices = {
  insertStudentToDb,
  getAllUser,
  getSingleUserById,
  deleteUserById,
  deleteAllUser,
  updateUserById,
  statusToggleUser,
}
