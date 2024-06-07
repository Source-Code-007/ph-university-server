import { z } from "zod";

const createAdminZodSchema = z.object({
    designation: z.string(),
    name: z.object({
        firstName: z.string(),
        middleName: z.string().optional(),
        lastName: z.string(),
    }),
    gender: z.string(),
    dateOfBirth: z.string(),
    email: z.string().email(),
    phone: z.string(),
    nid: z.string(),
    bloodGroup: z.string(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    profileImg: z.string(),
    isDeleted: z.boolean(),
});

const updateAdminZodSchema = z.object({
    designation: z.string().optional(),
    name: z.object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
    }).optional(),
    gender: z.string().optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    nid: z.string().optional(),
    bloodGroup: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    profileImg: z.string().optional(),
    isDeleted: z.boolean().optional(),
});

export { createAdminZodSchema, updateAdminZodSchema };