import { z } from "zod";

const createAcademicDepartmentZodSchema = z.object({
    name: z.string({invalid_type_error: 'Please input string!', required_error: 'Academic department name is required!'}),
    shortName: z.string({invalid_type_error: 'Please input string!', required_error: 'Academic department short name is required!'}),
    academicFaculty: z.string({invalid_type_error: 'Please input string!', required_error: 'Faculty is required!'}),
})
const updateAcademicDepartmentZodSchema = z.object({
    name: z.string().optional(),
    shortName: z.string().optional(),
    academicFaculty: z.string().optional(),
})

export {createAcademicDepartmentZodSchema, updateAcademicDepartmentZodSchema}