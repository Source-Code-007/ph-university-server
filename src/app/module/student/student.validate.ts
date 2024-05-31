import { z } from 'zod'

const createStudentZodSchema = z.object({
  name: z.string(),
  gender: z.string(),
  dateOfBirth: z.string(),
  email: z.string(),
  phone: z.string(),
  nid: z.string(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: z.object({
    name: z.string(),
    phone: z.string(),
    age: z.string(),
    email: z.string().optional(),
  }),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  user: z.string(),
  academicInfo: z.string(),
  isDeleted: z.boolean(),
})

export { createStudentZodSchema }
