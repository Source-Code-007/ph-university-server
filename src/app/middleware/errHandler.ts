import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const notFoundErrHandler = (req:Request, res:Response, next:NextFunction)=> {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(StatusCodes.NOT_FOUND).send({success:false, message: error?.message, error: error})
}
const globalErrHandler = (err:any, req:Request, res:Response, next:NextFunction)=> {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({success:false, message: err?.message || 'Internal server error', error: err})
}

export {notFoundErrHandler, globalErrHandler}