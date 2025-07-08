import { useState } from "react";
import Image from "next/image";

import { SignUpForm } from "@/schemas/signup";

import { UseFormReturn } from "react-hook-form";

import Button from "../button";

interface ProfileStepProps {
  form: UseFormReturn<SignUpForm>;
  onNext: () => void;
}

const defaultProfile = "/static/default-profile.png";

export default function ProfileStep({ form, onNext }: ProfileStepProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(() => {
    const profileImage = form.getValues("profileImage");
    if (profileImage) {
      return URL.createObjectURL(profileImage);
    }
    return null;
  });

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 제한 (10MB = 10 * 1024 * 1024 bytes)
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (file.size > maxSize) {
        alert("파일 크기는 10MB 이하여야 합니다.");
        e.target.value = ""; // 파일 선택 초기화
        return;
      }

      form.setValue("profileImage", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onClickNext = () => {
    onNext();
  };

  return (
    <>
      <main className="pb-with-floating-button flex flex-col p-5">
        <section className="flex flex-col gap-10">
          <h1 className="typo-bold">
            프로필을
            <br />
            정해주세요
          </h1>
          <label htmlFor="profile-image">
            <Image
              src={previewImage || defaultProfile}
              alt="profile"
              width={200}
              height={200}
              className="mx-auto aspect-square rounded-full object-cover"
            />
          </label>
          <input
            type="file"
            onChange={onFileChange}
            id="profile-image"
            accept=".png,.jpeg,.jpg,image/png,image/jpeg,image/jpg"
            hidden
          />
        </section>
      </main>
      <Button
        onClick={onClickNext}
        disabled={!previewImage}
        className="max-w-floating-button fixed bottom-10 w-[calc(100%-2.5rem)] self-center"
      >
        다음
      </Button>
    </>
  );
}
