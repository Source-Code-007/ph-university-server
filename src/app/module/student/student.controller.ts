import { StatusCodes } from 'http-status-codes'
import sendResponse from '../../utils/sendResponse'
import { RequestHandler } from 'express'
import { studentServices } from './student.service'
import catchAsync from '../../utils/catchAsync'
import AppError from '../../errors/appError'

const getAllStudent: RequestHandler = catchAsync(async (req, res) => {
  const { data, total } = await studentServices.getAllStudent(req.query)

  const page = req.query?.page ? Number(req.query.page) : 1
  const limit = req.query?.limit ? Number(req.query.limit) : 10
  const totalPage = Math.ceil(total / limit)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Students are retrieved successfully!',
    data,
    meta: { total, page, totalPage, limit },
  })
})

const getStudentById: RequestHandler = catchAsync(async (req, res) => {
  const student = await studentServices.getStudentById(req.params?.id)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Student is retrieved successfully!',
    data: student,
  })
})

const updateStudentById: RequestHandler = catchAsync(async (req, res) => {
  const student = await studentServices.updateStudentById(
    req.params?.id,
    req.body,
  )
  if (!student) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Student not updated!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Student updated successfully!',
    data: student,
  })
})

const toggleBloodDonor: RequestHandler = catchAsync(async (req, res) => {
  const student = await studentServices.toggleBloodDonor(req.params?.id)
  if (!student) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Student not updated!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: student.isBloodDonor
      ? `Thank you for registering as a blood donor! Your blood group is ${student.bloodGroup}.`
      : `You have been removed from the blood donor registry.`,

    data: student,
  })
})

const deleteStudentById = catchAsync(async (req, res) => {
  const student = await studentServices.deleteStudentById(req.params.id)
  if (!student) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Student not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Student is deleted successfully!',
    data: student,
  })
})

export const studentController = {
  getAllStudent,
  getStudentById,
  updateStudentById,
  toggleBloodDonor,
  deleteStudentById,
}
