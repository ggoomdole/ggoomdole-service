import { z } from "zod";

export const requestCourseFormSchema = z.object({
  places: z
    .array(
      z.object({
        placeName: z.string().min(1),
        reason: z.string().min(1),
        placeId: z.string().min(1),
      })
    )
    .min(1),
});

export type RequestCourseForm = z.infer<typeof requestCourseFormSchema>;

export const uploadCourseFormSchema = z.object({
  title: z.string().min(1),
  thumbnail: z.instanceof(File),
  category: z.string().min(1),
  intro: z.string().min(1),
  spots: z
    .array(
      z.object({
        placeName: z.string().min(1),
        reason: z.string().min(1),
        placeId: z.string().min(1),
      })
    )
    .min(1),
  removeCourseIds: z.array(z.string()).optional(),
});

export type UploadCourseForm = z.infer<typeof uploadCourseFormSchema>;
