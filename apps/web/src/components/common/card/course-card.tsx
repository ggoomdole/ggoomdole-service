import Image from "next/image";
import Link from "next/link";

import BronzeMedal from "@/assets/bronze-medal.svg";
import GoldMedal from "@/assets/gold-medal.svg";
import SilverMedal from "@/assets/silver-medal.svg";
import { NativeType } from "@/constants/user";
import { RoadResponseDTO } from "@/models/road";
import { CategoryType } from "@/types/category";

import CategoryChip from "../chip/category-chip";

interface CourseCardProps extends RoadResponseDTO {
  href: string;
}

const getLevelIcon = (level: NativeType) => {
  switch (level) {
    case "RESIDENT":
      return <GoldMedal />;
    case "LONG_TERM":
      return <SilverMedal />;
    case "MID_TERM":
      return <BronzeMedal />;
    default:
      return null;
  }
};

const DEFAULT_IMAGE_URL = "/static/default-thumbnail.png";

export default function CourseCard({
  categoryId,
  title,
  intro,
  imageUrl,
  participants,
  native,
  href,
}: CourseCardProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between gap-2.5 border-b border-b-gray-100 py-2.5"
    >
      <div className="flex flex-col gap-1 overflow-hidden">
        <div className="flex items-center gap-1">
          {getLevelIcon(native)}
          <CategoryChip category={categoryId as CategoryType} />
        </div>
        <p className="typo-semibold truncate">{title}</p>
        <p className="typo-regular text-gray-500">현재 {participants}명이 참여했어요!</p>
        <p className="typo-medium truncate">{intro}</p>
      </div>
      <Image
        src={imageUrl || DEFAULT_IMAGE_URL}
        alt={title}
        width={60}
        height={60}
        className="aspect-square rounded-sm object-cover"
      />
    </Link>
  );
}
