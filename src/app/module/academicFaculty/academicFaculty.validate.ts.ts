import { z } from "zod";

const createAcademicFacultyZodSchema = z.object({
    name: z.string(),
})
const updateAcademicFacultyZodSchema = z.object({
    name: z.string().optional(),
})

export {createAcademicFacultyZodSchema, updateAcademicFacultyZodSchema}