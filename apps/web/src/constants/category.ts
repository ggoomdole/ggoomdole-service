export const CATEGORY = {
  food: "음식",
  tour: "관광",
  healing: "힐링",
} as const;

export const COURSE_CATEGORIES = [
  {
    name: "전체",
    path: "",
  },
  {
    name: "음식",
    path: "food",
  },
  {
    name: "관광",
    path: "tour",
  },
  {
    name: "힐링",
    path: "healing",
  },
];
