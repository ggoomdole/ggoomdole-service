import { useRef, useState } from "react";
import Image from "next/image";

import Plus from "@/assets/plus.svg";
import { COURSE_CATEGORIES } from "@/constants/category";
import { cn } from "@/lib/utils";
import { CreateCourseForm } from "@/schemas/course";

import { UseFormReturn } from "react-hook-form";

interface CreateTabProps {
  form: UseFormReturn<CreateCourseForm>;
}

const CATEGORIES = COURSE_CATEGORIES.slice(1);

export default function CreateTab({ form }: CreateTabProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const values = form.watch();

  const onChangeCategory = (category: string) => {
    if (values.category === category) return;
    form.setValue("category", category);
  };

  const onImageUpload = (file: File) => {
    // 파일 유효성 검사
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB 제한
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    // 미리보기 생성
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // form에 파일 설정
    form.setValue("thumbnail", file);
  };

  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <main className="pb-navigation">
      <section className="bg-main-100 space-y-2.5 p-5">
        <div className="flex gap-5">
          <div
            className="group relative size-28 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-gray-100"
            onClick={onImageClick}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            {previewImage ? (
              <>
                <Image
                  src={previewImage}
                  alt="순례길 썸네일"
                  className="aspect-square shrink-0 object-cover transition-all group-hover:brightness-50"
                  width={112}
                  height={112}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={onImageClick}
                    className="text-white opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label="이미지 제거"
                  >
                    <Plus />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex size-full flex-col items-center justify-center text-gray-500">
                <Plus />
                <span className="text-xs">이미지 추가</span>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={onFileSelect}
              className="hidden"
              aria-label="이미지 파일 선택"
            />
          </div>
          <div className="flex w-full flex-col justify-between">
            <div className="focus-within:border-b-main-900 flex w-full items-center gap-2.5 border-b-2 border-b-gray-100 py-2.5 transition-colors">
              <input
                placeholder="순례길 이름을 정해주세요"
                className="typo-medium w-full"
                {...form.register("name")}
              />
              <button className="bg-main-900 typo-regular text-nowrap rounded-full px-2 py-1 text-white transition-colors disabled:bg-gray-100 disabled:text-gray-300">
                중복확인
              </button>
            </div>
            <div className="typo-regular space-y-1">
              <p>해당하는 카테고리를 선택해주세요.</p>
              <div className="space-x-2.5">
                {CATEGORIES.map((categoryItem) => (
                  <button
                    key={categoryItem.name}
                    className={cn(
                      "rounded-full px-4 py-1",
                      values.category === categoryItem.name && "bg-main-700"
                    )}
                    onClick={() => onChangeCategory(categoryItem.name)}
                  >
                    {categoryItem.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <textarea
          placeholder="순례길 소개를 입력해주세요"
          className="typo-regular w-full resize-none rounded-xl bg-white p-2.5"
          {...form.register("intro")}
        />
      </section>
    </main>
  );
}
