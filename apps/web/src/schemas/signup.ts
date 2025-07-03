import { z } from "zod";

export const signUpFormSchema = z.object({
  agreement: z.boolean().refine((value) => value === true),
  profileImage: z.instanceof(File),
  nickname: z.string().min(1).max(10),
  native: z.number().min(1).max(4),
});

export type SignUpForm = z.infer<typeof signUpFormSchema>;
