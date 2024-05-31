import { NextFunction, Request, RequestHandler, Response } from 'express'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import { deleteAcademicInfoByIdService, deleteAllAcademicInfoService, getAllAcademicInfoService, getSingleAcademicInfoByIdService, insertAcademicInfoToDbService, updateAcademicInfoByIdService } from './academicInfo.service'



const insertAcademicInfoController: RequestHandler = catchAsync(
  async (req, res) => {
    const academicInfo = await insertAcademicInfoToDbService(req.body)
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Academic info inserted successfully!',
      data: academicInfo,
    })
  },
)

const getAllAcademicInfoController = catchAsync(async(req,res)=> {
    const academicInfo = await getAllAcademicInfoService()
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Academic info are retrieved successfully!',
      data: academicInfo,
    })
})

const getAcademicInfoByIdController = catchAsync(async(req,res)=> {
    const academicInfo = await getSingleAcademicInfoByIdService(req.params?.id)
    if (!academicInfo) {
      sendResponse(res, StatusCodes.NOT_FOUND, {
        success: false,
        message: 'Academic info not found!',
        data: academicInfo,
      })
      return
    }
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Academic info retrieved successfully!',
      data: academicInfo,
    })
})



const deleteAcademicInfoByIdController = catchAsync(async(req,res)=> {
    const academicInfo = await deleteAcademicInfoByIdService(req.params.id)
    if (!academicInfo) {
      sendResponse(res, StatusCodes.NOT_FOUND, {
        success: false,
        message: 'Academic info not found!',
        data: academicInfo,
      })
      return
    }
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Academic info is deleted successfully!',
      data: academicInfo,
    })
})


const deleteAllAcademicInfoController = catchAsync(async(req,res)=> {
    const academicInfo = await deleteAllAcademicInfoService()
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Academic info are deleted successfully!',
      data: academicInfo,
    })
})

const updateAcademicInfoByIdController = catchAsync(async(req,res)=> {
    const academicInfo = await updateAcademicInfoByIdService(req.params?.id, req.body)
    if (!academicInfo) {
      sendResponse(res, StatusCodes.NOT_FOUND, {
        success: false,
        message: 'Academic info not found!',
        data: academicInfo,
      })
      return
    }
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Academic info is updated successfully!',
      data: academicInfo,
    })
})


export {
  insertAcademicInfoController,
  getAllAcademicInfoController,
  getAcademicInfoByIdController,
  deleteAcademicInfoByIdController,
  deleteAllAcademicInfoController,
  updateAcademicInfoByIdController
}