import { Suspense } from "react";

import { BaseResponseDTO } from "@/models";
import UploadCoursePage from "@/page/courses/upload";
import { serverApi } from "@/services/api";
import { RoadResponseDTO } from "@repo/types";

import { Loader2 } from "lucide-react";

interface UploadCourseProps {
  searchParams: Promise<{
    tab: string;
    word: string;
    id: string;
    view: "private";
  }>;
}

export default async function UploadCourse({ searchParams }: UploadCourseProps) {
  const resolvedSearchParams = await searchParams;

  let promisedReponse: Promise<BaseResponseDTO<RoadResponseDTO>> | undefined;

  if (resolvedSearchParams.id) {
    promisedReponse = serverApi.get<BaseResponseDTO<RoadResponseDTO>>(
      `road/${resolvedSearchParams.id}`
    );
  }

  return (
    <Suspense
      fallback={
        <main className="flex flex-col items-center justify-center">
          <Loader2 className="size-8 animate-spin text-gray-500" />
          <p className="typo-medium mt-4 text-gray-500">순례길 정보를 불러오는 중...</p>
        </main>
      }
    >
      <UploadCoursePage {...resolvedSearchParams} promisedResponse={promisedReponse} />
    </Suspense>
  );
}
