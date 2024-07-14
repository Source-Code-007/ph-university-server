import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { authServices } from './auth.service'

const login = catchAsync(async (req, res) => {
  const { accessToken, needsPasswordChange } = await authServices.login(
    req.body,
  )

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'User is logged in successfully',
    data: { accessToken, needsPasswordChange },
  })
})

export const authControllers = { login }
