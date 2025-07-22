import { z } from "zod";

export const requestCourseFormSchema = z.object({
  places: z
    .array(
      z.object({
        placeName: z.string().min(1),
        reason: z.string().min(1),
      })
    )
    .min(1),
});

export type RequestCourseForm = z.infer<typeof requestCourseFormSchema>;

export const createCourseFormSchema = z.object({
  name: z.string().min(1),
  thumbnail: z.instanceof(File).optional(),
  category: z.string().min(1),
  intro: z.string().min(1),
  places: z
    .array(
      z.object({
        placeName: z.string().min(1),
        reason: z.string().min(1),
      })
    )
    .min(1),
});

export type CreateCourseForm = z.infer<typeof createCourseFormSchema>;
