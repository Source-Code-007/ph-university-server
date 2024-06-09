import { query } from 'express'
import QueryBuilder from '../../builder/QueryBuilder'
import { TCourse } from './course.interface'
import Course from './course.model'
import { courseSearchableFields } from './course.constant'

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

    const result = await Course.findById(id).populate('preRequisiteCourses.course')

    return result

}


const deleteCourseById = async (id: string) => {
    const result = await Course.findByIdAndUpdate(id, {isDeleted: true}, {new: true})

    return result
}

const updateCourseById = async (id: string, updatedCourse: Partial<TCourse>) => {
    // const result = await Course.findByIdAndUpdate(id, updatedCourse, {new: true})
}



export const courseServices = {
  insertCourseToDb,
  getAllCourse,
  getSingleCourseById,
  deleteCourseById,
  updateCourseById,
}