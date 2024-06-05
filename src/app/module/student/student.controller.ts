import { StatusCodes } from 'http-status-codes'
import sendResponse from '../../utils/sendResponse'
import { Student } from './student.model'
import { RequestHandler } from 'express'
import { studentServices } from './student.service'
import catchAsync from '../../utils/catchAsync'

const getAllStudent: RequestHandler = catchAsync(async(req, res)=> {
    const student = await studentServices.getAllStudent()
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Students are retrieved successfully!',
      data: student,
    })
})

const getStudentById: RequestHandler = catchAsync(async(req, res)=> {
    const students = await studentServices.getStudentById(req.params?.id)
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Student is retrieved successfully!',
      data: students,
    })
})

export const studentController = {
    getAllStudent,
  getStudentById,
}
