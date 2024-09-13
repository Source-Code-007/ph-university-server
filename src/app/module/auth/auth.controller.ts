import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { authServices } from './auth.service'
import AppError from '../../errors/appError'

const login = catchAsync(async (req, res) => {
  const { accessToken, refreshToken, needsPasswordChange } =
    await authServices.login(req.body)

  res.cookie('refreshToken', refreshToken, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  })

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'User is logged in successfully',
    data: { accessToken, needsPasswordChange },
  })
})
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies || {}

  if (!refreshToken) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Refresh token is required')
  }

  const result = await authServices.refreshToken(refreshToken)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Access token is retrieved successfully',
    data: result,
  })
})

const forgetPassword = catchAsync(async (req, res) => {
  const result = await authServices.forgetPassword(req.query.id as string)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Password reset link is generated successfully',
    data: result,
  })
})
const resetPassword = catchAsync(async (req, res) => {})

const changePassword = catchAsync(async (req, res) => {
  const user = await authServices.changePassword(req.params?.id, req.body)

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found')
  }

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Password is updated successfully!',
    data: user,
  })
})

export const authControllers = {
  login,
  refreshToken,
  forgetPassword,
  resetPassword,
  changePassword,
}
