import { RequestHandler } from 'express'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import { academicDepartmentServices } from './academicDepartment.service'
import AppError from '../../errors/appError'


const insertAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const academicDepartment = await academicDepartmentServices.insertAcademicDepartmentToDb(req.body)
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Academic department inserted successfully!',
      data: academicDepartment,
    })
  },
)

const getAllAcademicDepartments = catchAsync(async(req,res)=> {
    const academicDepartments = await academicDepartmentServices.getAllAcademicDepartments()
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Academic departments are retrieved successfully!',
      data: academicDepartments,
    })
})

const getAcademicDepartmentById = catchAsync(async(req,res)=> {
    const academicDepartment = await academicDepartmentServices.getSingleAcademicDepartmentById(req.params?.id)
    if (!academicDepartment) {
      throw  new AppError(StatusCodes.NOT_FOUND, 'Academic department not found!')
    }
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Academic department retrieved successfully!',
      data: academicDepartment,
    })
})

const deleteAcademicDepartmentById = catchAsync(async(req,res)=> {
    const academicDepartment = await academicDepartmentServices.deleteAcademicDepartmentById(req.params.id)
    if (!academicDepartment) {
      throw  new AppError(StatusCodes.NOT_FOUND, 'Academic department not found!')
    }
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Academic department is deleted successfully!',
      data: academicDepartment,
    })
})

const deleteAllAcademicDepartments = catchAsync(async(req,res)=> {
  const academicDepartments = await academicDepartmentServices.deleteAllAcademicDepartments()
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Academic departments are deleted successfully!',
    data: academicDepartments,
  })
})

const updateAcademicDepartmentById = catchAsync(async(req,res)=> {
    const academicDepartment = await academicDepartmentServices.updateAcademicDepartmentById(req.params?.id, req.body)
    if (!academicDepartment) {
      throw  new AppError(StatusCodes.NOT_FOUND, 'Academic department not found!')
    }
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Academic department is updated successfully!',
      data: academicDepartment,
    })
})


export const academicDepartmentController  = {
    insertAcademicDepartment,
    getAllAcademicDepartments,
    getAcademicDepartmentById,
    deleteAcademicDepartmentById,
    deleteAllAcademicDepartments,
    updateAcademicDepartmentById,
}