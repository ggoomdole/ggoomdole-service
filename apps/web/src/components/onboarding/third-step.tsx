"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Button from "@/components/common/button";

const step3 = "/static/onboarding/step3.png";

export default function ThirdStep() {
  const router = useRouter();

  const onClickNext = () => {
    router.push("/home");
  };

  return (
    <section className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-10">
        <Image src={step3} alt="세 번째 스텝 꿈돌이" width={300} height={300} />
        <div className="space-y-2.5">
          <h1 className="typo-bold text-center">
            다함께 만들어가는
            <br />
            순례길
          </h1>
          <p className="typo-medium text-center">좋아요와 후기로 길을 완성해요</p>
        </div>
      </div>
      <Button className="mx-7.5 mb-10 mt-2.5" onClick={onClickNext}>
        시작하기
      </Button>
    </section>
  );
}
