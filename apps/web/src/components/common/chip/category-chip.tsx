import { CATEGORY } from "@/constants/category";
import { cn } from "@/lib/utils";
import { CategoryType } from "@/types/category";

interface CategoryChipProps {
  category: CategoryType;
}

const theme = {
  food: "bg-red-100 text-red-500",
  tour: "bg-blue-100 text-blue-900",
  healing: "bg-green-100 text-green-500",
};

export default function CategoryChip({ category }: CategoryChipProps) {
  return (
    <div className={cn("typo-regular w-max rounded-sm px-1.5 py-0.5", theme[category])}>
      {CATEGORY[category]}
    </div>
  );
}
