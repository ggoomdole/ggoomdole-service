import Link from "next/link";

import Search from "@/assets/search.svg";
import FloatingNavButton from "@/components/common/button/floating-nav-button";
import Header from "@/components/common/header";
import { BaseResponseDTO } from "@/models";
import { RoadRecommendResponseDTO } from "@/models/road";
import HomePage from "@/page/home";
import { serverApi } from "@/services/api";

interface HomeProps {
  searchParams: Promise<{
    categoryId: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { categoryId } = await searchParams;
  const promisedResponse = serverApi.get<BaseResponseDTO<RoadRecommendResponseDTO[]>>(
    `road/recommend${categoryId ? `?categoryId=${categoryId}` : ""}`
  );

  return (
    <>
      <Header
        logoHeader
        rightElement={
          <Link href="/search">
            <Search />
          </Link>
        }
        sticky
      />
      <HomePage promisedResponse={promisedResponse} />
      <FloatingNavButton />
    </>
  );
}
