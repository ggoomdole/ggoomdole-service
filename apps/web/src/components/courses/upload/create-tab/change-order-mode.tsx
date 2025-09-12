import { useRef, useState } from "react";

import Menu from "@/assets/menu.svg";
import LocationInputCard from "@/components/common/card/location-input-card";
import { cn } from "@/lib/utils";
import { CoursePlaceProps } from "@/types/course";

interface ChangeOrderModeProps {
  fields: CoursePlaceProps[];
  onChangeReason: (index: number, reason: string) => void;
  remove: (index: number) => void;
  onReorder: (newOrder: CoursePlaceProps[]) => void;
}

export default function ChangeOrderMode({
  fields,
  onChangeReason,
  remove,
  onReorder,
}: ChangeOrderModeProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchCurrentY, setTouchCurrentY] = useState<number | null>(null);
  const touchStartIndex = useRef<number | null>(null);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const onDragLeave = () => {
    setDragOverIndex(null);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newOrder = [...fields];
    const [draggedItem] = newOrder.splice(draggedIndex, 1);
    newOrder.splice(dropIndex, 0, draggedItem);

    onReorder(newOrder);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const onDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // 터치 이벤트 핸들러들
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>, index: number) => {
    const touch = e.touches[0];
    setTouchStartY(touch.clientY);
    setTouchCurrentY(touch.clientY);
    touchStartIndex.current = index;
    setDraggedIndex(index);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartY === null || touchStartIndex.current === null) return;

    e.preventDefault();
    const touch = e.touches[0];
    setTouchCurrentY(touch.clientY);

    // 터치 이동 거리에 따라 드롭 인덱스 계산
    const deltaY = touch.clientY - touchStartY;
    const itemHeight = 60; // 대략적인 아이템 높이
    const newDropIndex = Math.round(deltaY / itemHeight) + touchStartIndex.current;

    if (
      newDropIndex >= 0 &&
      newDropIndex < fields.length &&
      newDropIndex !== touchStartIndex.current
    ) {
      setDragOverIndex(newDropIndex);
    }
  };

  const onTouchEnd = () => {
    if (touchStartIndex.current === null || dragOverIndex === null) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      setTouchStartY(null);
      setTouchCurrentY(null);
      touchStartIndex.current = null;
      return;
    }

    if (touchStartIndex.current !== dragOverIndex) {
      const newOrder = [...fields];
      const [draggedItem] = newOrder.splice(touchStartIndex.current, 1);
      newOrder.splice(dragOverIndex, 0, draggedItem);
      onReorder(newOrder);
    }

    setDraggedIndex(null);
    setDragOverIndex(null);
    setTouchStartY(null);
    setTouchCurrentY(null);
    touchStartIndex.current = null;
  };

  return (
    <>
      {fields.length > 0 ? (
        fields.map((place, index) => (
          <div
            key={place.placeName}
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={(e) => onDragOver(e, index)}
            onDragLeave={onDragLeave}
            onDrop={(e) => onDrop(e, index)}
            onDragEnd={onDragEnd}
            onTouchStart={(e) => onTouchStart(e, index)}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className={cn(
              "flex touch-none items-center gap-2.5 bg-white px-5 py-2.5 transition-all duration-200",
              draggedIndex === index && "opacity-50",
              dragOverIndex === index && "translate-y-1 transform"
            )}
            style={{
              transform:
                draggedIndex === index && touchCurrentY !== null && touchStartY !== null
                  ? `translateY(${touchCurrentY - touchStartY}px)`
                  : undefined,
            }}
          >
            <Menu />
            <LocationInputCard
              placeName={place.placeName}
              value={place.reason}
              onChange={(e) => onChangeReason(index, e.target.value)}
              placeholder="장소에 대해 설명해주세요"
              onRemove={() => remove(index)}
            />
          </div>
        ))
      ) : (
        <div className="my-3 flex flex-col items-center gap-2.5">
          <p className="text-6xl">🫥</p>
          <p className="typo-medium text-center text-gray-700">최소 3개의 장소를 추가해주세요</p>
        </div>
      )}
    </>
  );
}
