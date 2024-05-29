import { z } from "zod";

const createAcademicInfoZodSchema = z.object({
    department: z.string(),
    roll: z.number(),
    batch: z.number(),
    regSLno: z.number(),
    RegCode: z.string(),
    admissionYear: z.number(),
    admissionDate: z.date(),
})

export {createAcademicInfoZodSchema}