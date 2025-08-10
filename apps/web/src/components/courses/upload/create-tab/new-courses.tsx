import { useState } from "react";

import Checkbox from "@/components/checkbox";
import LocationInputCard from "@/components/common/card/location-input-card";
import { UploadCourseForm } from "@/schemas/course";

import { useFieldArray, UseFormReturn } from "react-hook-form";

interface NewCoursesProps {
  form: UseFormReturn<UploadCourseForm>;
}

const dummyNewCourses = [
  {
    placeName: "서울 타워",
    reason: "서울 타워",
    placeId: "1",
  },
  {
    placeName: "서울 타워1",
    reason: "서울 타워1",
    placeId: "2",
  },
  {
    placeName: "서울 타워2",
    reason: "서울 타워2",
    placeId: "3",
  },
];

export default function NewCourses({ form }: NewCoursesProps) {
  const removeCourseIds = form.watch("removeCourseIds") || [];
  const filteredCourses = dummyNewCourses.filter(
    (course) => !removeCourseIds.includes(course.placeName)
  );
  const [newCourses, setNewCourses] = useState(filteredCourses);
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);

  const isAllChecked = selectedCourseIds.length === newCourses.length;

  const { fields } = useFieldArray({
    control: form.control,
    name: "spots",
    keyName: "fieldId",
  });

  const onToggleAllCheckbox = () => {
    if (isAllChecked) {
      setSelectedCourseIds([]);
    } else {
      setSelectedCourseIds(newCourses.map((course) => course.placeName));
    }
  };

  const onToggleCheckbox = (courseId: string) => {
    if (selectedCourseIds.includes(courseId)) {
      setSelectedCourseIds(selectedCourseIds.filter((id) => id !== courseId));
    } else {
      setSelectedCourseIds([...selectedCourseIds, courseId]);
    }
  };

  const onAddCourses = () => {
    if (selectedCourseIds.length === 0) return;
    const addedCourses = newCourses.filter((course) =>
      selectedCourseIds.includes(course.placeName)
    );
    form.setValue("spots", [...fields, ...addedCourses]);
    onRemoveCourses();
  };

  const onRemoveCourses = () => {
    if (selectedCourseIds.length === 0) return;
    setNewCourses((prev) => prev.filter((course) => !selectedCourseIds.includes(course.placeName)));
    form.setValue("removeCourseIds", [...removeCourseIds, ...selectedCourseIds]);
    setSelectedCourseIds([]);
  };

  return (
    <>
      <div className="flex items-end gap-5 py-2.5">
        <h2 className="typo-semibold">NEW</h2>
        <button className="typo-regular" onClick={onToggleAllCheckbox}>
          전체 {isAllChecked ? "해제" : "선택"}
        </button>
        <button className="typo-regular" onClick={onAddCourses}>
          추가하기
        </button>
        <button className="typo-regular" onClick={onRemoveCourses}>
          삭제하기
        </button>
      </div>
      <div className="flex flex-col gap-2.5">
        {newCourses.length > 0 ? (
          newCourses.map((place) => (
            <div key={place.placeName} className="flex items-center gap-2.5 px-5 py-2.5">
              <Checkbox
                checked={selectedCourseIds.includes(place.placeName)}
                onChange={() => onToggleCheckbox(place.placeName)}
              />
              <LocationInputCard placeName={place.placeName} value={place.reason} readOnly />
            </div>
          ))
        ) : (
          <div className="my-3 flex flex-col items-center gap-2.5">
            <p className="text-6xl">🫥</p>
            <p className="typo-medium text-center text-gray-700">추가할 장소가 없어요</p>
          </div>
        )}
      </div>
    </>
  );
}
