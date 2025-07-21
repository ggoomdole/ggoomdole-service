import { z } from "zod";

export const courseRequestFormSchema = z.object({
  places: z
    .array(
      z.object({
        placeName: z.string().min(1).max(10),
        reason: z.string().min(1),
      })
    )
    .min(1),
});

export type CourseRequestForm = z.infer<typeof courseRequestFormSchema>;
