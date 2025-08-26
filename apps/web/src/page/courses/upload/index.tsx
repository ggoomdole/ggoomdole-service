"use client";

import { Usable, use } from "react";

import FindByMapTab from "@/components/common/map/find-by-map-tab";
import CreateTab from "@/components/courses/upload/create-tab";
import { BaseResponseDTO } from "@/models";
import { UploadCourseForm, uploadCourseFormSchema } from "@/schemas/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { RoadResponseDTO } from "@repo/types";

import { useFieldArray, useForm } from "react-hook-form";

interface UploadCoursePageProps {
  tab: string;
  word: string;
  id: string;
  view: "private" | "replicate";
  promisedResponse: Usable<BaseResponseDTO<RoadResponseDTO>> | undefined;
}

const DEFAULT_VALUES = {
  title: "",
  imageUrl: null,
  categoryId: 0,
  intro: "",
  spots: [],
  removeCourseIds: [],
};

// 회원일 때만 접근 가능하도록 로직 작성하기
export default function UploadCoursePage({
  tab,
  word,
  id,
  view,
  promisedResponse,
}: UploadCoursePageProps) {
  const isEditCourse = !!id;
  const isPrivate = view === "private";
  const isReplicate = view === "replicate";

  const defaultValues = (() => {
    if (promisedResponse) {
      const { data } = use(promisedResponse);
      return {
        ...data,
        imageUrl: data.imageUrl ? new File([], data.imageUrl) : null,
        spots: data.spots.map((spot) => ({
          placeId: spot.spotId,
          placeName: spot.name,
          reason: spot.introSpot,
          address: spot.address,
          latitude: spot.latitude,
          longitude: spot.longitude,
        })),
      };
    }
    return DEFAULT_VALUES;
  })();

  const form = useForm<UploadCourseForm>({
    resolver: zodResolver(uploadCourseFormSchema),
    defaultValues,
  });

  const { append } = useFieldArray({
    control: form.control,
    name: "spots",
  });

  const currentPlaces = form.getValues("spots");

  switch (tab) {
    case "find-by-map":
      return (
        <FindByMapTab
          query={word}
          tab={tab}
          currentPlaces={currentPlaces}
          id={id}
          onSelectPlace={append}
        />
      );
    default:
      return (
        <CreateTab
          id={id}
          form={form}
          isEditCourse={isEditCourse}
          isPrivate={isPrivate}
          isReplicate={isReplicate}
        />
      );
  }
}
