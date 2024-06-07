import catchAsync from "../../utils/catchAsync"
import { facultyServices } from "./faculty.service"
import AppError from "../../errors/appError"
import { StatusCodes } from "http-status-codes"
import sendResponse from "../../utils/sendResponse"
import { RequestHandler } from "express"



const getAllFaculty:RequestHandler = catchAsync(async (req, res) => {
  const faculty = await facultyServices.getAllFaculty()
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Faculties are retrieved successfully!',
    data: faculty,
  })
})

const getFacultyById:RequestHandler = catchAsync(async (req, res) => {
  const faculty = await facultyServices.getSingleFacultyById(req.params?.id)
  if (!faculty) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Faculty not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Faculty is retrieved successfully!',
    data: faculty,
  })
})

const deleteFacultyById:RequestHandler = catchAsync(async (req, res) => {
  const faculty = await facultyServices.deleteFacultyById(req.params.id)
  if (!faculty) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Faculty not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Faculty is deleted successfully!',
    data: faculty,
  })
})


const updateFacultyById:RequestHandler = catchAsync(async (req, res) => {
  const faculty = await facultyServices.updateFacultyById(
    req.params?.id,
    req.body,
  )
  if (!faculty) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Faculty not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Faculty is updated successfully!',
    data: faculty,
  })
})

export const facultyControllers =  {
  getAllFaculty,
  getFacultyById,
  deleteFacultyById,
  updateFacultyById,
}
