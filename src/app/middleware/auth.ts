import { NextFunction, Request, Response } from 'express'
import { TUserRole } from '../module/user/user.interface'
import catchAsync from '../utils/catchAsync'
import AppError from '../errors/appError'
import { StatusCodes } from 'http-status-codes'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../module/user/user.model'

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!')
    }

    const bearerToken = token.split(' ')?.[1]
    if (!bearerToken) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!')
    }

    let decoded
    try {
      decoded = jwt.verify(
        bearerToken,
        process.env.JWT_ACCESS_SECRET as string,
      ) as JwtPayload
    } catch (e) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!')
    }

    const { id, role } = decoded


    const user = await User.findOne({ id })

    if (!user) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'This user is not found!')
    }

    const isDeleted = user?.isDeleted

    if (isDeleted) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'This user is deleted!')
    }

    // checking if the user is not active
    const userStatus = user?.status

    if (userStatus === 'inactive') {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is not active!')
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!')
    }

    req.user = decoded as JwtPayload

    next()
  })
}

export default auth
