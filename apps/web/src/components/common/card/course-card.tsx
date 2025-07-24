import Image from "next/image";
import Link from "next/link";

import BronzeMedal from "@/assets/bronze-medal.svg";
import GoldMedal from "@/assets/gold-medal.svg";
import SilverMedal from "@/assets/silver-medal.svg";
import { CategoryType } from "@/types/category";

import CategoryChip from "../chip/category-chip";

interface CourseCardProps {
  id: number;
  category: CategoryType;
  title: string;
  intro: string;
  imageUrl: string;
  people: number;
  level: "gold" | "silver" | "bronze" | "normal";
  edit?: string;
}

const getLevelIcon = (level: "gold" | "silver" | "bronze" | "normal") => {
  switch (level) {
    case "gold":
      return <GoldMedal />;
    case "silver":
      return <SilverMedal />;
    case "bronze":
      return <BronzeMedal />;
    default:
      return null;
  }
};

export default function CourseCard({
  id,
  category,
  title,
  intro,
  imageUrl,
  people,
  level,
  edit,
}: CourseCardProps) {
  const link = edit ? `/courses/upload?id=${id}` : `/courses/${id}`;

  return (
    <Link
      href={link}
      className="flex items-center justify-between gap-2.5 border-b border-b-gray-100 py-2.5"
    >
      <div className="flex flex-col gap-1 overflow-hidden">
        <div className="flex items-center gap-1">
          {getLevelIcon(level)}
          <CategoryChip category={category} />
        </div>
        <p className="typo-semibold truncate">{title}</p>
        <p className="typo-regular text-gray-500">현재 {people}명이 참여했습니다!</p>
        <p className="typo-medium truncate">{intro}</p>
      </div>
      <Image
        src={imageUrl}
        alt={title}
        width={60}
        height={60}
        className="aspect-square rounded-sm object-cover"
      />
    </Link>
  );
}
