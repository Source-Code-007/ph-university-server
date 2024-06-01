import { RequestHandler } from 'express'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import { academicFacultyServices } from './academicFaculty.service'



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

const getAllAcademicFaculty = catchAsync(async(req,res)=> {
    const academicFaculty = await academicFacultyServices.getAllAcademicFaculty()
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Academic faculty are retrieved successfully!',
      data: academicFaculty,
    })
})

const getAcademicFacultyById = catchAsync(async(req,res)=> {
    const academicFaculty = await academicFacultyServices.getSingleAcademicFacultyById(req.params?.id)
    if (!academicFaculty) {
      sendResponse(res, StatusCodes.NOT_FOUND, {
        success: false,
        message: 'Academic faculty not found!',
        data: academicFaculty,
      })
      return
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
      sendResponse(res, StatusCodes.NOT_FOUND, {
        success: false,
        message: 'Academic faculty not found!',
        data: academicFaculty,
      })
      return
    }
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Academic faculty is deleted successfully!',
      data: academicFaculty,
    })
})


const deleteAllAcademicFaculty = catchAsync(async(req,res)=> {
  const academicFaculty = await academicFacultyServices.deleteAllAcademicFaculty()
  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: 'Academic faculty are deleted successfully!',
    data: academicFaculty,
  })
})

const updateAcademicFacultyById = catchAsync(async(req,res)=> {
    const academicFaculty = await academicFacultyServices.updateAcademicFacultyById(req.params?.id, req.body)
    if (!academicFaculty) {
      sendResponse(res, StatusCodes.NOT_FOUND, {
        success: false,
        message: 'Academic faculty not found!',
        data: academicFaculty,
      })
      return
    }
    sendResponse(res, StatusCodes.OK, {
      success: true,
      message: 'Academic faculty is updated successfully!',
      data: academicFaculty,
    })
})


export const academicFacultyController  = {
    insertAcademicFaculty,
    getAllAcademicFaculty,
    getAcademicFacultyById,
    deleteAcademicFacultyById,
    deleteAllAcademicFaculty,
    updateAcademicFacultyById,
}