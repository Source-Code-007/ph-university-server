import { z } from 'zod'


// Custom password validation regex for security criteria
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const userZodSchema = z.object({
    id: z.string({ required_error: 'Id is required' }),
    password: z.string({ required_error: 'Password is required' })
               .min(8, 'Password must be at least 8 characters long')
               .regex(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    needsPasswordChange: z.boolean(),
    role: z.enum(['Admin', 'Faculty', 'Student']),
    status: z.enum(['active', 'inactive']),
    isDeleted: z.boolean(),
  });

export  {userZodSchema}
