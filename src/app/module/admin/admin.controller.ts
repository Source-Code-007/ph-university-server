import catchAsync from '../../utils/catchAsync'
import AppError from '../../errors/appError'
import { StatusCodes } from 'http-status-codes'
import sendResponse from '../../utils/sendResponse'
import { RequestHandler } from 'express'
import { adminServices } from './admin.service'

const getAllAdmin: RequestHandler = catchAsync(async (req, res) => {
  const admin = await adminServices.getAllAdmin()
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Admins are retrieved successfully!',
    data: admin,
  })
})

const getAdminById: RequestHandler = catchAsync(async (req, res) => {
  const admin = await adminServices.getSingleAdminById(req.params?.id)
  if (!admin) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Admin not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Admin is retrieved successfully!',
    data: admin,
  })
})

const deleteAdminById: RequestHandler = catchAsync(async (req, res) => {
  const admin = await adminServices.deleteAdminById(req.params.id)
  if (!admin) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Admin not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Admin is deleted successfully!',
    data: admin,
  })
})

const updateAdminById: RequestHandler = catchAsync(async (req, res) => {
  const admin = await adminServices.updateAdminById(req.params?.id, req.body)
  if (!admin) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Admin not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Admin is updated successfully!',
    data: admin,
  })
})

export const adminControllers = {
  getAllAdmin,
  getAdminById,
  deleteAdminById,
  updateAdminById,
}