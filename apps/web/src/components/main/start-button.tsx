"use client";

import { useRouter } from "next/navigation";

import KakaoIcon from "@/assets/kakao.svg";

const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

export default function StartButton() {
  const router = useRouter();

  const onRouteOnboarding = () => {
    router.push("/onboarding");
  };

  const onRouteHome = () => {
    router.push("/home");
  };

  const onKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  };

  return (
    <section className="mb-24 flex flex-col items-center">
      <button className="typo-regular mb-4 text-gray-700 underline" onClick={onRouteOnboarding}>
        시작하기에 앞서
      </button>
      <div className="typo-medium space-y-2">
        <button
          className="bg-kakao max-w-mobile flex w-[90vw] items-center justify-center gap-2 rounded-xl py-2"
          onClick={onKakaoLogin}
        >
          <KakaoIcon className="size-4" />
          <p>카카오 로그인</p>
        </button>
        <button
          className="border-kakao max-w-mobile w-[90vw] rounded-xl border bg-white py-2 text-center"
          onClick={onRouteHome}
        >
          로그인 없이 둘러보기
        </button>
      </div>
    </section>
  );
}
