import { StatusCodes } from 'http-status-codes'
import { TUser } from './user.interface'
import User from './user.model'
import AppError from '../../errors/appError'
import { TStudent } from '../student/student.interface'
import { startSession } from 'mongoose'
import { Student } from '../student/student.model'

const insertStudentToDb = async (payload: TStudent) => {
  const userData: Partial<TUser> = {}
  //   {
  //     password: payload?.password,
  //     needsPasswordChange: payload?.needsPasswordChange,
  //     role: 'Student',
  //     status: 'active',
  //     isDeleted: false,
  //   }

  userData.password = 'password'
  userData.role = 'Student'

  const session = await startSession()

  try {
    session.startTransaction()

    const student = await Student.create([payload], { session })
    if (!student?.length) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Failed to insert student to db',
      )
    }

    const user = await User.create([payload.user], { session })
    if (!user?.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to insert user to db')
    }
    session.commitTransaction()
    session.endSession()
  } catch (err: any) {
    session.abortTransaction()
    session.endSession()
    throw new Error(err)
  }
}

const insertUserToDbService = async (userData: TUser) => {
  const user = await User.create(userData)
  return user
}

const getAllUserService = async () => {
  const users = await User.find({}).select('-__v')
  return users
}

const getSingleUserByIdService = async (id: string) => {
  const user = await User.findById(id).select('-__v')
  return user
}

const deleteUserByIdService = async (id: string) => {
  const user = await User.findByIdAndDelete(id).select('-__v')
  return user
}

const deleteAllUserService = async () => {
  const users = await User.deleteMany({})
  return users
}

const updateUserByIdService = async (
  id: string,
  updatedUser: Partial<TUser>,
) => {
  const user = await User.findByIdAndUpdate(id, updatedUser, {
    new: true,
  }).select('-__v')
  return user
}

const statusToggleUserService = async (id: string) => {
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

export {
  insertUserToDbService,
  getAllUserService,
  getSingleUserByIdService,
  deleteUserByIdService,
  deleteAllUserService,
  updateUserByIdService,
  statusToggleUserService,
}
