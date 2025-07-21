"use client";

import FindByMapTab from "@/components/courses/request/find-by-map-tab";
import RequestTab from "@/components/courses/request/request-tab";
import { CourseRequestForm, courseRequestFormSchema } from "@/schemas/course";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

interface CourseRequestPageProps {
  id: string;
  tab: string;
  query: string;
}

export default function CourseRequestPage({ id, tab, query }: CourseRequestPageProps) {
  const form = useForm<CourseRequestForm>({
    mode: "onChange",
    resolver: zodResolver(courseRequestFormSchema),
    defaultValues: { places: [] },
  });

  switch (tab) {
    case "find-by-map":
      return <FindByMapTab query={query} tab={tab} form={form} />;
    default:
      return <RequestTab id={id} query={query} form={form} />;
  }
}
