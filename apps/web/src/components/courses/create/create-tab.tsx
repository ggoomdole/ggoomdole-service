import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Close from "@/assets/close.svg";
import Plus from "@/assets/plus.svg";
import Button from "@/components/common/button";
import Header from "@/components/common/header";
import { COURSE_CATEGORIES } from "@/constants/category";
import { cn } from "@/lib/utils";
import { CreateCourseForm } from "@/schemas/course";
import { getParams } from "@/utils/params";
import { infoToast } from "@/utils/toast";

import { useFieldArray, UseFormReturn } from "react-hook-form";

interface CreateTabProps {
  form: UseFormReturn<CreateCourseForm>;
}

const CATEGORIES = COURSE_CATEGORIES.slice(1);
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function CreateTab({ form }: CreateTabProps) {
  const category = form.watch("category");
  const thumbnail = form.watch("thumbnail");

  const parmas = getParams({ tab: "find-by-map" });

  const [previewImage, setPreviewImage] = useState<string | null>(() => {
    if (!thumbnail) return null;
    return URL.createObjectURL(thumbnail);
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { fields, update, remove } = useFieldArray({
    control: form.control,
    name: "places",
    keyName: "fieldId",
  });

  const { formState } = form;
  const { isValid, errors } = formState;

  const submitDisabled = !isValid || fields.length === 0;

  const onChangeReason = (index: number, reason: string) => {
    update(index, {
      ...fields[index],
      reason,
    });
  };

  const onChangeCategory = (categoryName: string) => {
    if (category === categoryName) return;
    form.setValue("category", categoryName);
  };

  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        return infoToast("파일 크기는 5MB 이하여야 합니다.");
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      form.setValue("thumbnail", file);
    }
  };

  const onImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Header>순례길 생성하기</Header>
      <main className="pb-navigation">
        <section className="bg-main-100 space-y-2.5 p-5">
          <div className="flex gap-5">
            <div
              className="group relative size-28 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-gray-100"
              onClick={onImageClick}
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
                        category === categoryItem.name && "bg-main-700"
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
        <section className="flex flex-col p-5">
          <div className="flex items-center justify-between">
            <h2 className="typo-semibold">순례길 코스</h2>
            <button className="typo-regular underline">편집</button>
          </div>
          {fields.map((place, index) => (
            <div
              key={`${place.placeName}-${index}`}
              className="flex items-center gap-2.5 px-5 py-2.5"
            >
              <p className="bg-main-900 typo-regular flex aspect-square size-6 shrink-0 items-center justify-center rounded-full text-white">
                {index + 1}
              </p>
              <div className="shadow-layout flex w-full justify-between gap-2.5 rounded-xl p-2.5">
                <div className="w-full">
                  <p className="typo-medium line-clamp-1">{place.placeName}</p>
                  <input
                    className="typo-regular w-full"
                    value={place.reason}
                    onChange={(e) => onChangeReason(index, e.target.value)}
                    placeholder="추가 요청 사유를 작성해주세요"
                  />
                  {errors.places?.[index]?.reason && (
                    <p className="typo-regular mt-1 text-red-500">
                      {errors.places[index]?.reason?.message}
                    </p>
                  )}
                </div>
                <button onClick={() => remove(index)} aria-label={`${place.placeName} 삭제`}>
                  <Close />
                </button>
              </div>
            </div>
          ))}
          <Link
            href={`?${parmas}`}
            className="typo-regular mb-2.5 w-full py-2.5 text-center text-gray-500 underline"
          >
            순례길 추가하기
          </Link>
          <Button disabled={submitDisabled}>생성하기</Button>
        </section>
      </main>
    </>
  );
}
