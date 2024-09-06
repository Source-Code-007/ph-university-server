import { z } from 'zod'

const createFacultyZodSchema = z.object({
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
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  profileImg: z.string().optional(),
  academicDepartment: z.string(),
  isDeleted: z.boolean().optional(),
})

const updateFacultyZodSchema = z.object({
  designation: z.string().optional(),
  name: z
    .object({
      firstName: z.string().optional(),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
    })
    .optional(),
  gender: z.string().optional(),
  dateOfBirth: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  nid: z.string().optional(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  profileImg: z.string().optional(),
  academicDepartment: z.string().optional(),
  isDeleted: z.boolean().optional(),
})

export { createFacultyZodSchema, updateFacultyZodSchema }
