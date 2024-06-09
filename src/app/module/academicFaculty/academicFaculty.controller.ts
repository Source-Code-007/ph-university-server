import { RequestHandler } from "express"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { academicFacultyServices } from "./academicFaculty.service"
import { StatusCodes } from "http-status-codes"
import AppError from "../../errors/appError"



const insertAcademicFaculty: RequestHandler = catchAsync(
  async (req, res) => {
    const academicFaculty = await academicFacultyServices.insertAcademicFacultyToDb(req.body)
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Academic faculty inserted successfully!',
      data: academicFaculty,
    })
  },
)

const getAllAcademicFaculties = catchAsync(async(req,res)=> {
    const academicFaculties = await academicFacultyServices.getAllAcademicFaculties()
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Academic faculties are retrieved successfully!',
      data: academicFaculties,
    })
})

const getAcademicFacultyById = catchAsync(async(req,res)=> {
    const academicFaculty = await academicFacultyServices.getSingleAcademicFacultyById(req.params?.id)
    if (!academicFaculty) {
      throw  new AppError(StatusCodes.NOT_FOUND, 'Academic faculty not found!')
    }
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Academic faculty retrieved successfully!',
      data: academicFaculty,
    })
})

const deleteAcademicFacultyById = catchAsync(async(req,res)=> {
    const academicFaculty = await academicFacultyServices.deleteAcademicFacultyById(req.params.id)
    if (!academicFaculty) {
      throw  new AppError(StatusCodes.NOT_FOUND, 'Academic faculty not found!')
    }
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Academic faculty is deleted successfully!',
      data: academicFaculty,
    })
})


const updateAcademicFacultyById = catchAsync(async(req,res)=> {
    const academicFaculty = await academicFacultyServices.updateAcademicFacultyById(req.params?.id, req.body)
    if (!academicFaculty) {
      throw  new AppError(StatusCodes.NOT_FOUND, 'Academic faculty not found!')
    }
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Academic faculty is updated successfully!',
      data: academicFaculty,
    })
})


export const academicFacultyController  = {
    insertAcademicFaculty,
    getAllAcademicFaculties,
    getAcademicFacultyById,
    deleteAcademicFacultyById,
    updateAcademicFacultyById,
}
