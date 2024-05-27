import { NextFunction, Request, Response } from 'express'
import {
  insertUserToDbService,
  getAllUserService,
  getSingleUserByIdService,
  deleteUserByIdService,
  deleteAllUserService,
  updateUserByIdService,
  statusToggleUserService,
} from './user.service'
import userZodSchema from './user.validate'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'

const insertUserController = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const validateZodUser = userZodSchema.parse(req.body)
    const user = await insertUserToDbService(validateZodUser)
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'User inserted successfully!',
      data: user,
    })
  } catch (error: any) {
    next(error)
  }
}

const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await getAllUserService()
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Users are retrieved successfully!',
      data: users,
    })
  } catch (error: any) {
    next(error)
  }
}

const getUserByIdController = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const user = await getSingleUserByIdService(req.params?.id)
    if (!user) {      
      sendResponse(res, StatusCodes.NOT_FOUND, {
        success: false,
        message: 'User not found!',
        data: user,
      })
      return
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

const deleteUserByIdController = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const user = await deleteUserByIdService(req.params.id)
    if (!user) {
      sendResponse(res, StatusCodes.NOT_FOUND, {
        success: false,
        message: 'User not found!',
        data: user,
      })
      return
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

const deleteAllUsersController = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const user = await deleteAllUserService()
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Users are deleted successfully!',
      data: user,
    })
  } catch (error: any) {
    next(error)
  }
}

const updateUserByIdController = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const user = await updateUserByIdService(req.params?.id, req.body)
    if (!user) {
      sendResponse(res, StatusCodes.NOT_FOUND, {
        success: false,
        message: 'User not found!',
        data: user,
      })
      return
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

const toggleUserStatusController = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const user = await statusToggleUserService(req.params?.id)
    if (!user) {
      sendResponse(res, StatusCodes.NOT_FOUND, {
        success: false,
        message: 'User not found!',
        data: user,
      })
      return
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

export {
  insertUserController,
  getAllUsersController,
  getUserByIdController,
  deleteUserByIdController,
  deleteAllUsersController,
  updateUserByIdController,
  toggleUserStatusController,
}
