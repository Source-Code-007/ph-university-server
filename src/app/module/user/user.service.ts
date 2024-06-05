import { StatusCodes } from 'http-status-codes'
import { TUser } from './user.interface'
import User from './user.model'
import AppError from '../../errors/appError'
import { TStudent } from '../student/student.interface'
import mongoose, { startSession } from 'mongoose'
import { Student } from '../student/student.model'
import Batch from '../batch/batch.model'
import AcademicDepartment from '../academicDepartment/academicDepartment.model'

const insertStudentToDb = async (payload: TStudent & TUser) => {
  const userData: Partial<TUser> = {}
  const studentData: Partial<TStudent> = { ...payload }

  // set user data
  userData.password = payload.password
  userData.role = 'student'

  // set student data
  studentData.id = payload.academicInfo.regCode

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const department = await AcademicDepartment.findById(payload.academicInfo.department)
    const totalStudent = await Student.countDocuments({}).exec()
    const batch = await Batch.findById(payload.academicInfo?.batch)


    // console.log(department, 'department');
    // console.log(totalStudent, 'totalStudent');

    if(department){
      // set regSlNo and regCode
      const regSlNo = totalStudent > 0 ? totalStudent + 1 : 1
      payload.academicInfo.regSlNo = regSlNo
      const regCode =`${department.shortName}-${batch?.batch}-${regSlNo}`
      payload.academicInfo.regCode = regCode
      studentData.id = regCode
      userData.id = regCode
    } else{
      throw new AppError(StatusCodes.BAD_REQUEST, 'Department not found')  
    }


    if (!batch) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Batch not found')
    }
    // Check if batch has reached the maximum student limit
    const maxStudentsPerBatch = Number(process.env.MAX_STUDENT_PER_BATCH) || 45 // Default to 45 if not set
    if (batch.totalStudent && batch.totalStudent >= maxStudentsPerBatch) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Batch is full')
    }

    // Update roll and totalStudent
    if (batch.totalStudent !== undefined && studentData.academicInfo) {
      studentData.academicInfo.roll = batch.totalStudent + 1
      batch.totalStudent += 1
      await batch.save({ session })
    }


    // Save user
    const user = await User.create([userData], { session })
    if (!user?.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to insert user to db')
    }

    studentData.user = user[0]._id

    // console.log(userData, 'userData')
    // console.log(studentData, 'studentData')

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
