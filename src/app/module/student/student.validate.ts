import { z } from 'zod'

const createStudentZodSchema = z.object({
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
  academicInfo: z.object({
    department: z.string(),
    // roll: z.number().int().max(Number(process.env.MAX_STUDENT_PER_BATCH), 'Roll number exceeds the maximum limit.').min(1, 'Roll number must be greater than 0.'),
    batch: z.string(),
    admissionDate: z.string(),
  }),
})

const updateStudentZodSchema = createStudentZodSchema.deepPartial(); //TODO: make all properties optional if it's not work



export { createStudentZodSchema, updateStudentZodSchema }
