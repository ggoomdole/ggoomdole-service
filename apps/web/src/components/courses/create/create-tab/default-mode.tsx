import Link from "next/link";

import Close from "@/assets/close.svg";
import { CreateCourseForm } from "@/schemas/course";
import { CoursePlaceProps } from "@/types/course";
import { getParams } from "@/utils/params";

import { FieldErrors } from "react-hook-form";

interface DefaultModeProps {
  fields: CoursePlaceProps[];
  errors: FieldErrors<CreateCourseForm>;
  onChangeReason: (index: number, reason: string) => void;
  remove: (index: number) => void;
}

export default function DefaultMode({ fields, errors, onChangeReason, remove }: DefaultModeProps) {
  const parmas = getParams({ tab: "find-by-map" });

  return (
    <>
      {fields.map((place, index) => (
        <div key={place.placeName} className="flex items-center gap-2.5 px-5 py-2.5">
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
    </>
  );
}
