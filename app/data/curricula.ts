export type Curriculum = {
  slug: string;
  title: string;
  shortTitle: string;
  type: "english" | "connect";
  grade: number;
  description: string;
};

export const curricula: Curriculum[] = Array.from({ length: 6 }, (_, index) => {
  const grade = index + 1;

  return [
    {
      slug: `english-primary-${grade}`,
      title: `English Primary ${grade}`,
      shortTitle: "English",
      type: "english" as const,
      grade,
      description: "Units, lessons, activities, practice and assessments.",
    },
    {
      slug: `connect-plus-primary-${grade}`,
      title: `Connect Plus Primary ${grade}`,
      shortTitle: "Connect Plus",
      type: "connect" as const,
      grade,
      description: "Units, lessons, activities, practice and assessments.",
    },
  ];
}).flat();

export function getCurriculum(slug: string) {
  return curricula.find((curriculum) => curriculum.slug === slug);
}
