import { z } from "zod";

const authZodSchema = z.object({
 id: z.string(),
 password: z.string()   
})

export {authZodSchema}