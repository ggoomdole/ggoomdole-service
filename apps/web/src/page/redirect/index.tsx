"use client";

import { Usable, use, useEffect } from "react";
import { redirect, RedirectType } from "next/navigation";

import type { BaseResponseDTO } from "@/models";
import type { KakaoLoginResponseDTO } from "@/models/auth";
import { setCookie } from "@/utils/cookie";

import { Loader2 } from "lucide-react";

interface RedirectPageProps {
  promisedResponse: Usable<BaseResponseDTO<KakaoLoginResponseDTO>>;
}

export default function RedirectPage({ promisedResponse }: RedirectPageProps) {
  const response = use(promisedResponse);

  useEffect(() => {
    if (response.success) {
      setCookie("jwtToken", response.data.jwtToken);
      setCookie("accessToken", response.data.accessToken);
      setCookie("userId", response.data.userId.toString());

      if (response.data.isFirstLogin) {
        redirect("/signup", RedirectType.replace);
      } else {
        redirect("/home", RedirectType.replace);
      }
    } else {
      redirect("/", RedirectType.replace);
    }
  }, [response]);

  return (
    <main className="flex flex-col items-center justify-center gap-4">
      <Loader2 className="text-main-900 size-10 animate-spin" />
      <p className="text-main-900 typo-medium">로그인 중...</p>
    </main>
  );
}
