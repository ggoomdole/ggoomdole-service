"use client";

import FindByMapTab from "@/components/common/map/find-by-map-tab";
import CreateTab from "@/components/courses/upload/create-tab";
import { UploadCourseForm, uploadCourseFormSchema } from "@/schemas/course";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFieldArray, useForm } from "react-hook-form";

interface UploadCoursePageProps {
  tab: string;
  query: string;
  id: string;
  view: "private";
}

// 회원일 때만 접근 가능하도록 로직 작성하기
export default function UploadCoursePage({ tab, query, id, view }: UploadCoursePageProps) {
  const isEditCourse = !!id;
  const isPrivate = view === "private";

  const form = useForm<UploadCourseForm>({
    resolver: zodResolver(uploadCourseFormSchema),
    defaultValues: {
      name: "",
      thumbnail: undefined,
      category: "",
      intro: "",
      places: [],
      removeCourseIds: [],
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
          id={id}
          onSelectPlace={append}
        />
      );
    default:
      return <CreateTab id={id} form={form} isEditCourse={isEditCourse} isPrivate={isPrivate} />;
  }
}
