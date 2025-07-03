import { SignUpForm } from "@/schemas/signup";

import { UseFormReturn } from "react-hook-form";

import Button from "../button";

interface NameStepProps {
  form: UseFormReturn<SignUpForm>;
  onNext: () => void;
}

export default function NicknameStep({ form, onNext }: NameStepProps) {
  const nickname = form.watch("nickname");

  const isNicknameValid = nickname.length >= 1 && nickname.length <= 10;

  const onNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue("nickname", e.target.value);
  };

  const onClickNext = () => {
    // 닉네임 중복 체크 API 호출 해서 중복이 아니라면 onNext 호출
    // 닉네임이 중복이라면 label에 "이미 존재하는 이름입니다" 표시
    onNext();
  };

  return (
    <>
      <main className="pb-with-floating-button flex flex-col gap-10 p-5">
        <h1 className="typo-bold">
          가입을 위한 정보를
          <br />
          입력해주세요
        </h1>
        <div className="border-main-500 focus-within:border-main-900 space-y-1 rounded-2xl border px-4 py-2.5 transition-colors">
          <label htmlFor="nickname" className="typo-regular text-gray-700">
            닉네임을 입력해 주세요
          </label>
          <input
            id="nickname"
            value={nickname}
            onChange={onNicknameChange}
            placeholder="입력해주세요"
            className="w-full"
            maxLength={10}
          />
        </div>
      </main>
      <Button
        onClick={onClickNext}
        disabled={!isNicknameValid}
        className="max-w-floating-button fixed bottom-10 w-[calc(100%-1.25rem)] self-center"
      >
        다음
      </Button>
    </>
  );
}
