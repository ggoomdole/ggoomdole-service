"use client";

import { useRouter } from "next/navigation";

import KakaoIcon from "@/assets/kakao.svg";

export default function StartButton() {
  const router = useRouter();

  const onRouteOnboarding = () => {
    router.push("/onboarding");
  };

  const onRouteHome = () => {
    router.push("/home");
  };

  return (
    <section className="mb-24 flex flex-col items-center">
      <button className="typo-regular mb-4 text-gray-700 underline" onClick={onRouteOnboarding}>
        시작하기에 앞서
      </button>
      <div className="typo-medium space-y-2">
        <button className="bg-kakao max-w-mobile flex w-[90vw] items-center justify-center gap-2 rounded-xl py-2">
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
