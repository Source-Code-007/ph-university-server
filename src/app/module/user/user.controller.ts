import { NextFunction, Request, RequestHandler, Response } from 'express'

import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import AppError from '../../errors/appError'
import { userServices } from './user.service'

const insertStudent: RequestHandler = catchAsync(async (req, res) => {
  const student = await userServices.insertStudentToDb(req.body)
  
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Student inserted successfully!',
    data: student,
  })
})


const insertFaculty :RequestHandler = catchAsync(async(req, res)=> {
  const faculty = await userServices.insertFacultyToDb(req.body)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Faculty inserted successfully!',
    data: faculty,
  })
})
const insertAdmin :RequestHandler = catchAsync(async(req, res)=> {
  const admin = await userServices.insertAdminToDb(req.body)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Admin inserted successfully!',
    data: admin,
  })
})

const getAllUsers:RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const users = await userServices.getAllUser()
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Users are retrieved successfully!',
      data: users,
    })
  } catch (error: any) {
    next(error)
  }
}

const getUserById:RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const user = await userServices.getSingleUserById(req.params?.id)
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found!')
    }
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'User is retrieved successfully!',
      data: user,
    })
  } catch (error: any) {
    next(error)
  }
}


export const userController = {
  insertStudent,
  insertFaculty,
  insertAdmin,
  getAllUsers,
  getUserById,
}
