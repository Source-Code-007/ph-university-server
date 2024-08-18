import { RequestHandler } from 'express'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import { academicDepartmentServices } from './academicDepartment.service'
import AppError from '../../errors/appError'

const insertAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const academicDepartment =
      await academicDepartmentServices.insertAcademicDepartmentToDb(req.body)
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Academic department inserted successfully!',
      data: academicDepartment,
    })
  },
)

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const { data, total } =
    await academicDepartmentServices.getAllAcademicDepartments(req.query)

  const page = req.query?.page ? Number(req.query.page) : 1
  const limit = req.query?.limit ? Number(req.query.limit) : 10
  const totalPages = Math.ceil(total / limit)

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Academic departments are retrieved successfully xx!',
    data,
    meta: { total, page, totalPages, limit },
  })
})

const getAcademicDepartmentById = catchAsync(async (req, res) => {
  const academicDepartment =
    await academicDepartmentServices.getSingleAcademicDepartmentById(
      req.params?.id,
    )
  if (!academicDepartment) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Academic department not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Academic department retrieved successfully!',
    data: academicDepartment,
  })
})

const deleteAcademicDepartmentById = catchAsync(async (req, res) => {
  const academicDepartment =
    await academicDepartmentServices.deleteAcademicDepartmentById(req.params.id)
  if (!academicDepartment) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Academic department not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Academic department is deleted successfully!',
    data: academicDepartment,
  })
})

const updateAcademicDepartmentById = catchAsync(async (req, res) => {
  const academicDepartment =
    await academicDepartmentServices.updateAcademicDepartmentById(
      req.params?.id,
      req.body,
    )
  if (!academicDepartment) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Academic department not found!')
  }
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Academic department is updated successfully!',
    data: academicDepartment,
  })
})

export const academicDepartmentController = {
  insertAcademicDepartment,
  getAllAcademicDepartments,
  getAcademicDepartmentById,
  deleteAcademicDepartmentById,
  updateAcademicDepartmentById,
}
