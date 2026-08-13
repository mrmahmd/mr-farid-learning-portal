import { getContentByKind, type ContentAvailability } from "../lib/content-registry";

export type Curriculum = {
  slug: string;
  title: string;
  shortTitle: string;
  type: "english" | "connect";
  grade: number;
  description: string;
  availability: ContentAvailability;
  appId?: string;
  embeddedPath?: string;
  cacheVersion?: string;
};

export const curricula: Curriculum[] = getContentByKind("curriculum")
  .filter((item): item is typeof item & { grade: number } => item.grade !== null)
  .map((item) => ({
    slug: item.slug,
    title: item.title.en.replace(" – First Term", ""),
    shortTitle: item.track === "english" ? "English" : "Connect Plus",
    type: item.track === "english" ? "english" : "connect",
    grade: item.grade,
    description: "Units, lessons, activities, practice and assessments.",
    availability: item.availability,
    appId: item.appId,
    embeddedPath: item.embeddedPath,
    cacheVersion: item.cacheVersion,
  }))
  .sort((left, right) => left.grade - right.grade || (left.type === right.type ? 0 : left.type === "english" ? -1 : 1));

export function getCurriculum(slug: string) {
  return curricula.find((curriculum) => curriculum.slug === slug);
}
