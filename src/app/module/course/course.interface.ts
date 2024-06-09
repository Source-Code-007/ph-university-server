import { Types } from "mongoose";

export type TCourse = {
    title: string,
    prefix: string,
    code: number,
    credit: number,
    isDeleted: boolean,
    preRequisiteCourses: [{isDeleted: boolean, course: Types.ObjectId}],
}