import { RequestHandler } from 'express'
import catchAsync from '../../utils/catchAsync'
import { courseServices } from './course.service'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/appError'

const insertCourse: RequestHandler = catchAsync(async (req, res) => {
  const course = await courseServices.insertCourseToDb(req.body)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Courses created successfully!',
    data: course,
  })
})
const getAllCourse: RequestHandler = catchAsync(async (req, res) => {
  const course = await courseServices.getAllCourse(req.query)
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Courses retrieved successfully!',
    data: course,
  })
})

const getSingleCourseById: RequestHandler = catchAsync(async (req, res) => {
  const course = await courseServices.getSingleCourseById(req.params?.id)
  if (!course) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Course not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Course is retrieved successfully!',
    data: course,
  })
})
const deleteCourseById: RequestHandler = catchAsync(async (req, res) => {
  const course = await courseServices.deleteCourseById(req.params?.id)
  if (!course) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Course not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Course is deleted successfully!',
    data: course,
  })
})
const updateCourseById: RequestHandler = catchAsync(async (req, res) => {
  // TODO:
  // const course = await courseServices.updateCourseById(req.params?.id, req.body)
  // if(!course){
  //   throw new AppError(StatusCodes.BAD_REQUEST, 'Course not updated!')
  // }
  // sendResponse(res, StatusCodes.OK, {
  //   success: true,
  //   message: 'Course updated successfully!',
  //   data: course,
  // })
})

export const courseController = {
  insertCourse,
  getAllCourse,
  getSingleCourseById,
  deleteCourseById,
  updateCourseById,
}
