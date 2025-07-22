"use client";

import FindByMapTab from "@/components/common/map/find-by-map-tab";
import CreateTab from "@/components/courses/create/create-tab";
import { CreateCourseForm, createCourseFormSchema } from "@/schemas/course";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFieldArray, useForm } from "react-hook-form";

interface CreateCoursePageProps {
  tab: string;
  query: string;
}

export default function CreateCoursePage({ tab, query }: CreateCoursePageProps) {
  const form = useForm<CreateCourseForm>({
    resolver: zodResolver(createCourseFormSchema),
    defaultValues: {
      name: "",
      thumbnail: undefined,
      category: "",
      intro: "",
      places: [],
    },
  });

  const { append } = useFieldArray({
    control: form.control,
    name: "places",
  });

  const currentPlaces = form.getValues("places");

  switch (tab) {
    case "find-by-map":
      return (
        <FindByMapTab
          query={query}
          tab={tab}
          currentPlaces={currentPlaces}
          onSelectPlace={append}
        />
      );
    default:
      return <CreateTab form={form} />;
  }
}
