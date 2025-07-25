import Link from "next/link";

import FloatingButton from "@/components/common/button/floating-button";
import LocationInputCard from "@/components/common/card/location-input-card";
import Header from "@/components/common/header";
import { RequestCourseForm } from "@/schemas/course";
import { getParams } from "@/utils/params";

import { useFieldArray, UseFormReturn } from "react-hook-form";

interface RequestTabProps {
  id: string;
  query: string;
  form: UseFormReturn<RequestCourseForm>;
}

export default function RequestTab({ id, query, form }: RequestTabProps) {
  const params = getParams({ query }, { tab: "find-by-map" });

  const { fields, update, remove } = useFieldArray({
    control: form.control,
    name: "places",
    keyName: "fieldId",
  });

  const { formState } = form;
  const { isValid } = formState;

  const submitDisabled = !isValid || fields.length === 0;

  const onChangeReason = (index: number, reason: string) => {
    update(index, {
      ...fields[index],
      reason,
    });
  };

  const onSubmit = () => {
    if (!isValid) return;

    const values = form.getValues();
    console.log("순례길 추가 요청:", values);
    // TODO: API 호출
  };

  return (
    <>
      <Header>순례길 추가 요청</Header>
      <main>
        <div className="flex items-center gap-2.5 px-5 py-3">
          <div className="aspect-square size-10 shrink-0 rounded-sm bg-gray-300" />
          <div className="space-y-1 text-start">
            <h1 className="typo-semibold line-clamp-1">카스의 빵지순례</h1>
            <p className="typo-regular line-clamp-1">빵을 좋아하는 사람이라면 누구나!</p>
          </div>
        </div>
        {fields.map((place, index) => (
          <div
            key={`${place.placeName}-${index}`}
            className="flex items-center gap-2.5 px-5 py-2.5"
          >
            <p className="bg-main-900 typo-regular flex aspect-square size-6 shrink-0 items-center justify-center rounded-full text-white">
              {index + 1}
            </p>
            <LocationInputCard
              placeName={place.placeName}
              value={place.reason}
              onChange={(e) => onChangeReason(index, e.target.value)}
              placeholder="추가 요청 사유를 작성해주세요"
              onRemove={() => remove(index)}
            />
          </div>
        ))}
        <Link
          href={`?${params}`}
          className="typo-regular mx-auto w-max py-2.5 text-center text-gray-500 underline"
        >
          순례길 요청 추가하기
        </Link>
      </main>
      <FloatingButton onClick={onSubmit} disabled={submitDisabled}>
        순례길 추가 요청 보내기
      </FloatingButton>
    </>
  );
}
