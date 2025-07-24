import { useState } from "react";

import Close from "@/assets/close.svg";
import Menu from "@/assets/menu.svg";
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
            className={cn(
              "flex items-center gap-2.5 bg-white px-5 py-2.5 transition-all duration-200",
              draggedIndex === index && "opacity-50",
              dragOverIndex === index && "translate-y-1 transform"
            )}
          >
            <Menu />
            <div className="shadow-layout flex w-full justify-between gap-2.5 rounded-xl p-2.5">
              <div className="w-full">
                <p className="typo-medium line-clamp-1">{place.placeName}</p>
                <input
                  className="typo-regular w-full"
                  value={place.reason}
                  onChange={(e) => onChangeReason(index, e.target.value)}
                  placeholder="장소에 대해 설명해주세요"
                />
              </div>
              <button onClick={() => remove(index)} aria-label={`${place.placeName} 삭제`}>
                <Close />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="my-3 flex flex-col items-center gap-2.5">
          <p className="text-6xl">🫥</p>
          <p className="typo-medium text-center text-gray-700">장소를 추가해주세요</p>
        </div>
      )}
    </>
  );
}
