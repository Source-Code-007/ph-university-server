import { z } from "zod";

const createFacultyZodSchema = z.object({
    id: z.string(),
    user: z.string(),
    designation: z.string(),
    name: z.object({
        firstName: z.string(),
        middleName: z.string().optional(),
        lastName: z.string(),
    }),
    gender: z.string(),
    dateOfBirth: z.date(),
    email: z.string().email(),
    phone: z.string(),
    nid: z.string(),
    bloodGroup: z.string(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    profileImg: z.string(),
    academicDepartment: z.string(),
    isDeleted: z.boolean(),
});

const updateFacultyZodSchema = z.object({
    id: z.string().optional(),
    user: z.string().optional(),
    designation: z.string().optional(),
    name: z.object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
    }).optional(),
    gender: z.string().optional(),
    dateOfBirth: z.date().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    nid: z.string().optional(),
    bloodGroup: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    profileImg: z.string().optional(),
    academicDepartment: z.string().optional(),
    isDeleted: z.boolean().optional(),
});

export { createFacultyZodSchema, updateFacultyZodSchema };