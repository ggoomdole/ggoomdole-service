import { Suspense } from "react";

import { BaseResponseDTO } from "@/models";
import { RoadResponseDTO } from "@/models/road";
import CourseDetailListPage from "@/page/courses/[id]/list";
import { serverApi } from "@/services/api";
import { getParams } from "@/utils/params";

import { Loader2 } from "lucide-react";

interface CourseDetailListProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    sort: string;
  }>;
}

export default async function CourseDetailList({ params, searchParams }: CourseDetailListProps) {
  const { id } = await params;
  const { sort } = await searchParams;

  const queryParams = getParams({ sortBy: sort });

  const promisedReponse = serverApi.get<BaseResponseDTO<RoadResponseDTO>>(
    `road/${id}?${queryParams}`
  );

  return (
    <Suspense
      fallback={
        <main className="flex flex-col items-center justify-center">
          <Loader2 className="size-8 animate-spin text-gray-500" />
          <p className="typo-medium mt-4 text-gray-500">순례길 정보를 불러오는 중...</p>
        </main>
      }
    >
      <CourseDetailListPage id={id} promisedResponse={promisedReponse} />
    </Suspense>
  );
}
