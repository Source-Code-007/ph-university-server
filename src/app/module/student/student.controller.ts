import { StatusCodes } from 'http-status-codes'
import sendResponse from '../../utils/sendResponse'
import { Student } from './student.model'
import { RequestHandler } from 'express'
import { studentServices } from './student.service'
import catchAsync from '../../utils/catchAsync'
import AppError from '../../errors/appError'

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

const updateStudentById: RequestHandler = catchAsync(async(req, res)=> {
    const student = await studentServices.updateStudentById(req.params?.id, req.body)
    if(!student){
      throw new AppError(StatusCodes.BAD_REQUEST, 'Student not updated!')
    }
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Student updated successfully!',
      data: student,
    })
})

export const studentController = {
    getAllStudent,
  getStudentById,
  updateStudentById
}
