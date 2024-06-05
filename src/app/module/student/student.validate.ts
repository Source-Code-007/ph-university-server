import { z } from 'zod'

const createStudentZodSchema = z.object({
  id: z.string(),
  name: z.object({
    firstName: z.string(),
    middleName: z.string().optional(),
    lastName: z.string(),
  }),
  profileImg: z.string(),
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
  academicInfo: z.string(), //FK
  user: z.string(), //FK
  isDeleted: z.boolean(),
})

export { createStudentZodSchema }
