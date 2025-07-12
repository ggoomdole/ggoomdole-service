"use client";

import Header from "@/components/common/header";

interface CourseRequestPageProps {
  id: string;
}

export default function CourseRequestPage({ id }: CourseRequestPageProps) {
  return (
    <>
      <Header>
        <p>순례길 추가 요청</p>
      </Header>
      <main>
        <div className="flex items-center gap-2.5">
          <div className="aspect-square size-10 shrink-0 rounded-sm bg-gray-300" />
          <div className="space-y-1 text-start">
            <h1 className="typo-semibold line-clamp-1">카스의 빵지순례</h1>
            <p className="typo-regular line-clamp-1">빵을 좋아하는 사람이라면 누구나!</p>
          </div>
        </div>
      </main>
    </>
  );
}
