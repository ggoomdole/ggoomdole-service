import type { BaseResponse } from "@/models";
import type { KakaoLoginResponseDTO } from "@/models/auth";
import RedirectPage from "@/page/redirect";
import { serverApi } from "@/services/api";

interface RedirectProps {
  searchParams: Promise<{
    code: string;
  }>;
}

export default async function Redirect({ searchParams }: RedirectProps) {
  const { code } = await searchParams;

  const promisedResponse = serverApi.post<BaseResponse<KakaoLoginResponseDTO>>("login/kakao", {
    code,
  });

  return <RedirectPage promisedResponse={promisedResponse} />;
}
