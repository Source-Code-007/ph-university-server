import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/appError'
import User from '../user/user.model'
import { TLoginUser } from './auth.interface'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const login = async (loginInfo: TLoginUser) => {
  const user = await User.findOne({ id: loginInfo.id })

  if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User not found!')
  }
  const decryptPass = bcrypt.compare(loginInfo.password, user.password)

  if (!decryptPass) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Incorrect password!')
  }

  const jwtPayload = { id: user.id, role: user.role }

  const accessToken = jwt.sign(
    jwtPayload,
    process.env.JWT_PRIVATE_KEY as string,
    {
      expiresIn: '100d',
    },
  )

  return { accessToken, data: user, needsPasswordChange:user?.needsPasswordChange }
}

export const authServices = { login }
