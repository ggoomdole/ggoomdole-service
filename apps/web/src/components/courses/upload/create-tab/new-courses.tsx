import { useEffect, useState } from "react";

import Checkbox from "@/components/checkbox";
import LocationInputCard from "@/components/common/card/location-input-card";
import { RequestSpotResponseDTO } from "@/models/spot";
import { UploadCourseForm } from "@/schemas/course";

import { Loader2 } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";

interface NewCoursesProps {
  form: UseFormReturn<UploadCourseForm>;
  requestSpots: RequestSpotResponseDTO[];
  isLoadingRequestSpots: boolean;
}

export default function NewCourses({ form, requestSpots, isLoadingRequestSpots }: NewCoursesProps) {
  const removeCourseIds = form.watch("removeCourseIds") || [];

  const filteredCourses = requestSpots.filter(
    (spot) => !removeCourseIds.includes(spot.spot.spotId)
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
      setSelectedCourseIds(newCourses.map((course) => course.spot.spotId));
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
    const addedCourses = newCourses
      .filter((course) => selectedCourseIds.includes(course.spot.spotId))
      .map((course) => ({
        placeName: course.spot.name,
        reason: course.introSpot,
        placeId: course.spot.spotId,
        address: course.spot.address,
        latitude: course.spot.latitude,
        longitude: course.spot.longitude,
      }));
    form.setValue("spots", [...fields, ...addedCourses]);
    onRemoveCourses();
  };

  const onRemoveCourses = () => {
    if (selectedCourseIds.length === 0) return;
    setNewCourses((prev) =>
      prev.filter((course) => !selectedCourseIds.includes(course.spot.spotId))
    );
    form.setValue("removeCourseIds", [...removeCourseIds, ...selectedCourseIds]);
    setSelectedCourseIds([]);
  };

  useEffect(() => {
    if (!isLoadingRequestSpots) {
      setNewCourses(requestSpots);
    }
  }, [isLoadingRequestSpots]);

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
        {isLoadingRequestSpots ? (
          <div className="flex flex-col items-center justify-center gap-2.5 py-5">
            <Loader2 className="size-4 animate-spin text-gray-500" />
            <span className="typo-regular">요청 들어온 장소 조회중...</span>
          </div>
        ) : newCourses.length > 0 ? (
          newCourses.map((place) => (
            <div
              key={`request-item-${place.spot.spotId}`}
              className="flex items-center gap-2.5 px-5 py-2.5"
            >
              <Checkbox
                checked={selectedCourseIds.includes(place.spot.spotId)}
                onChange={() => onToggleCheckbox(place.spot.spotId)}
              />
              <LocationInputCard placeName={place.spot.name} value={place.introSpot} readOnly />
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
