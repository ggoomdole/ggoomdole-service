import { Suspense } from "react";

import { BaseResponseDTO } from "@/models";
import { RoadResponseDTO } from "@/models/road";
import CourseRequestPage from "@/page/courses/[id]/request";
import { serverApi } from "@/services/api";

import { Loader2 } from "lucide-react";

interface CourseRequestProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    tab: string;
    word: string;
  }>;
}

export default async function CourseRequest({ params, searchParams }: CourseRequestProps) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;

  const promisedResponse = serverApi.get<BaseResponseDTO<RoadResponseDTO>>(`road/${id}`);

  return (
    <Suspense
      fallback={
        <main className="flex flex-col items-center justify-center">
          <Loader2 className="size-8 animate-spin text-gray-500" />
          <p className="typo-medium mt-4 text-gray-500">순례길 정보를 불러오는 중...</p>
        </main>
      }
    >
      <CourseRequestPage id={id} {...resolvedSearchParams} promisedResponse={promisedResponse} />
    </Suspense>
  );
}
