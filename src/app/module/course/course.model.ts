import { Schema, model } from "mongoose";
import { TCourse } from "./course.interface";

const preRequisiteCoursesSchema = new Schema({
    isDeleted: { type: Boolean, default: false },
    course: { type: Schema.Types.ObjectId, ref: 'Course' }
}, { _id: false })

const courseSchema = new Schema<TCourse>({
    title: { type: String, required: true },
    prefix: { type: String, required: true },
    code: { type: Number, required: true, unique: true },
    credit: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    preRequisiteCourses: [preRequisiteCoursesSchema],
})


const Course = model('Course', courseSchema)
export default Course