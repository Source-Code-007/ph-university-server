import { z } from "zod";

const createCourseZodSchema = z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credit: z.number(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourses: z.array(z.object({
        isDeleted: z.boolean().optional(),
        course: z.string().optional(),
    })).optional()
})

const updateCourseZodSchema = z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credit: z.number().optional(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourses: z.array(z.object({
        isDeleted: z.boolean().optional(),
        course: z.string().optional(),
    })).optional()
})

export {
    createCourseZodSchema,
    updateCourseZodSchema
}