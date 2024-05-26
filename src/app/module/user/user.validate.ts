import { z } from 'zod'

// primitive values
z.string();
z.number();
z.bigint();
z.boolean();
z.date();
z.symbol();

// empty types
z.undefined();
z.null();
z.void(); // accepts undefined

type TUser = {
    _id: string,
    id: string,
    password: string,
    needsPasswordChange: Boolean,
    role: 'Admin' | 'Faculty' | 'Student',
    status: boolean,
    isDeleted: boolean,
}

// Custom password validation regex for security criteria
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
const userZodSchema = z.object({
    _id: z.string(),
    id: z.string({ required_error: 'ID is required' }),
    password: z.string({ required_error: 'Password is required' })
               .min(8, 'Password must be at least 8 characters long')
               .regex(passwordRegex, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    needsPasswordChange: z.boolean(),
    role: z.enum(['Admin', 'Faculty', 'Student']),
    status: z.enum(['active', 'inactive']),
    isDeleted: z.boolean(),
  });

export default userZodSchema
