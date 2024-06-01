import { z } from "zod";

const createAcademicFacultyZodSchema = z.object({
    name: z.string({invalid_type_error: 'Please input string!', required_error: 'Faculty name is required!'}),
})
const updateAcademicFacultyZodSchema = z.object({
    name: z.string().optional(),
})

export {createAcademicFacultyZodSchema, updateAcademicFacultyZodSchema}