import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { authServices } from './auth.service'

const login = catchAsync(async (req, res) => {
  const user = await authServices.login(req.body)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Users are retrieved successfully',
    data: user,
  })
})

export const authControllers = { login }
