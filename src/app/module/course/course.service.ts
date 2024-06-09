import QueryBuilder from '../../builder/QueryBuilder'
import { TCourse } from './course.interface'
import Course from './course.model'
import { courseSearchableFields } from './course.constant'
import mongoose from 'mongoose'
import AppError from '../../errors/appError'
import { StatusCodes } from 'http-status-codes'

const insertCourseToDb = async (course: TCourse) => {
  const result = await Course.create(course)
  return result
}

const getAllCourse = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Course.find(), query)
    .searchQuery(courseSearchableFields)
    .filterQuery()
    .paginateQuery()
    .sortQuery()
    .fieldFilteringQuery()
    .populateQuery([
      {
        path: 'preRequisiteCourses.course',
      },
    ])

  const result = await courseQuery.queryModel

  return result
}

const getSingleCourseById = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  )

  return result
}

const deleteCourseById = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )

  return result
}

const updateCourseById = async (
  id: string,
  updatedCourse: Partial<TCourse>,
) => {
  const { preRequisiteCourses, ...basicInfo } = updatedCourse

  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // Update basic course information
    let result = await Course.findByIdAndUpdate(id, basicInfo, {
      new: true,
      session,
    })
    if (!result) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Failed to update course basic info!',
      )
    }

    if (preRequisiteCourses && Object.keys(preRequisiteCourses)?.length > 0) {
      const filteredDeletedPreRequisiteCourses = preRequisiteCourses
        ?.filter((el) => el.course && el.isDeleted)
        .map((el) => el.course)
      const filteredAddPreRequisiteCourses = preRequisiteCourses
        ?.filter((el) => el.course && !el.isDeleted)
        .map((el) => el.course)


      if (filteredDeletedPreRequisiteCourses?.length > 0) {
        result = await Course.findByIdAndUpdate(
          id,
          {
            $pull: {
              preRequisiteCourses: {
                course: { $in: filteredDeletedPreRequisiteCourses },
              },
            },
          },
          { new: true, session },
        )
      }

      if (!result) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update course!')
      }

      if (filteredAddPreRequisiteCourses?.length > 0) {
        result = await Course.findByIdAndUpdate(
          id,
          {
            $addToSet: {
              preRequisiteCourses: { $each: filteredAddPreRequisiteCourses?.map(courseId=> ({course:courseId, isDeleted: false})) },
            },
          },
          { new: true, session },
        )
      }
      if (!result) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update course!')
      }
    }

    await session.commitTransaction()
    result = await Course.findByIdAndUpdate(id).populate(
      'preRequisiteCourses.course',
    )
    return result
  } catch (e) {
    await session.abortTransaction()
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update course!')
  } finally {
    await session.endSession()
  }

  const result = await Course.findByIdAndUpdate(id, basicInfo, { new: true })
  return result
}

export const courseServices = {
  insertCourseToDb,
  getAllCourse,
  getSingleCourseById,
  deleteCourseById,
  updateCourseById,
}
