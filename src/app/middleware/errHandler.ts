import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ZodError, ZodIssue } from 'zod'
import { TErrorSources } from '../interface/error'
import handleZodErr from '../errors/handleZodError'

const notFoundErrHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res
    .status(StatusCodes.NOT_FOUND)
    .send({ success: false, message: error?.message, error: error })
}


const globalErrHandler: ErrorRequestHandler = (err, req, res, next) => {


  // Default values
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  let message = err.message || 'Internal server error'

  let errorSources:TErrorSources = [{
        path: "",
        message: "Internal server error"
  }]


//   Cast error
  if(err?.name === "CastError"){

  }

//   zod error
if(err instanceof ZodError){
   const ourErr = handleZodErr(err)

   message = ourErr.message
   statusCode = ourErr.statusCode
   errorSources = ourErr.errorSources
}

  // Send response
  res.status(statusCode).send({
    success: false,
    message,
    errorSources,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err?.stack,
  })
}

export { notFoundErrHandler, globalErrHandler }
