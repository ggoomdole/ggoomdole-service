import { Suspense } from "react";

import { BaseResponseDTO } from "@/models";
import { RoadResponseDTO } from "@/models/road";
import CourseDetailPage from "@/page/courses/[id]";
import { serverApi } from "@/services/api";

import { Loader2 } from "lucide-react";

interface CourseDetailProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    start: string;
    end: string;
  }>;
}

export default async function CourseDetail({ params, searchParams }: CourseDetailProps) {
  const { id } = await params;
  const { start, end } = await searchParams;

  const promisedReponse = serverApi.get<BaseResponseDTO<RoadResponseDTO>>(`road/${id}`);

  return (
    <Suspense
      fallback={
        <main className="flex flex-col items-center justify-center">
          <Loader2 className="size-8 animate-spin text-gray-500" />
          <p className="typo-medium mt-4 text-gray-500">순례길 정보를 불러오는 중...</p>
        </main>
      }
    >
      <CourseDetailPage id={id} start={start} end={end} promisedResponse={promisedReponse} />
    </Suspense>
  );
}
