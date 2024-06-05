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



const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
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

const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
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

const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await userServices.deleteUserById(req.params.id)
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found!')
    }
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'User is deleted successfully!',
      data: user,
    })
  } catch (error: any) {
    next(error)
  }
}

const deleteAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await userServices.deleteAllUser()
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Users are deleted successfully!',
      data: user,
    })
  } catch (error: any) {
    next(error)
  }
}

const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await userServices.updateUserById(req.params?.id, req.body)
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found!')
    }
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'User is updated successfully!',
      data: user,
    })
  } catch (error: any) {
    next(error)
  }
}

const toggleUserStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await userServices.statusToggleUser(req.params?.id)
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found!')
    }
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: `${user?.status === 'active' ? 'User activated successfully!' : 'User deactivated successfully!'}`,
      data: user,
    })
  } catch (error: any) {
    next(error)
  }
}

export const userController = {
  insertStudent,
  getAllUsers,
  getUserById,
  deleteUserById,
  deleteAllUsers,
  updateUserById,
  toggleUserStatus,
}
