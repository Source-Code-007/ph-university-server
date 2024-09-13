import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/appError'
import User from '../user/user.model'
import { TLoginUser, TPasswordUpdate } from './auth.interface'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'

const login = async (loginInfo: TLoginUser) => {
  const user = await User.findOne({ id: loginInfo.id })

  if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User not found!')
  }
  const decryptPass = await bcrypt.compare(loginInfo.password, user.password)

  if (!decryptPass) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Incorrect password!')
  }

  const jwtPayload = { id: user.id, role: user.role }

  const accessToken = jwt.sign(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN as string,
    },
  )

  const refreshToken = jwt.sign(
    jwtPayload,
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN as string,
    },
  )

  return {
    accessToken,
    refreshToken,
    data: user,
    needsPasswordChange: user?.needsPasswordChange,
  }
}

const refreshToken = async (token: string) => {
  // checking if the given token is valid

  let decoded
  try {
    decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string,
    ) as JwtPayload
  } catch (e) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!')
  }

  const { id } = decoded

  // checking if the user is exist
  const user = await User.findOne({ id })

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is not active
  const userStatus = user?.status

  if (userStatus === 'inactive') {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is not active!')
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  }

  const accessToken = jwt.sign(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN as string,
    },
  )

  return {
    accessToken,
  }
}

const forgetPassword = async (id: string) => {}
const resetPassword = async () => {}

const changePassword = async (id: string, payload: TPasswordUpdate) => {
  const user = await User.findOne({ id })

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!')
  }

  const decryptPass = await bcrypt.compare(payload.oldPassword, user.password)
  if (!decryptPass) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password is not match')
  }

  const hashedPass = await bcrypt.hash(
    payload.newPassword,
    Number(process.env.SALT_ROUNDS),
  )

  const result = await User.findOneAndUpdate(
    { id },
    { password: hashedPass },
    { new: true },
  ).select('-password')
  if (!result) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to update password.',
    )
  }
  return result
}

export const authServices = {
  login,
  refreshToken,
  forgetPassword,
  resetPassword,
  changePassword,
}
