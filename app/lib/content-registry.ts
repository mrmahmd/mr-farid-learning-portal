export type ContentKind =
  | "curriculum"
  | "assessment-book"
  | "curriculum-game"
  | "booklet"
  | "free-game";

export type ContentTrack = "english" | "connect-plus" | "general";
export type ContentAvailability = "available" | "coming-soon" | "hidden";

export type PortalContentItem = {
  id: string;
  slug: string;
  title: { en: string; ar: string };
  kind: ContentKind;
  track: ContentTrack;
  grade: number | null;
  term: 1 | 2 | null;
  route: string;
  availability: ContentAvailability;
  appId?: string;
  appIdAliases?: readonly string[];
  embeddedPath?: string;
  cacheVersion?: string;
  downloadUrl?: string;
  artworkPath?: string;
};

const gradeArabic: Record<number, string> = {
  1: "الأول",
  2: "الثاني",
  3: "الثالث",
  4: "الرابع",
  5: "الخامس",
  6: "السادس",
};

const englishCurricula: PortalContentItem[] = Array.from({ length: 6 }, (_, index) => {
  const grade = index + 1;
  const slug = `english-primary-${grade}`;
  const versions: Record<number, string> = {
    1: "20260718-6",
    2: "20260729-2",
    3: "20260719-2",
    4: "20260717-12",
    5: "20260726-6",
    6: "20260801-1",
  };

  return {
    id: `curriculum:${slug}:term-1`,
    slug,
    title: {
      en: `English Primary ${grade} – First Term`,
      ar: `اللغة الإنجليزية - الصف ${gradeArabic[grade]} - الترم الأول`,
    },
    kind: "curriculum",
    track: "english",
    grade,
    term: 1,
    route: `/courses/${slug}/`,
    availability: "available",
    appId: `${slug}-first-term`,
    embeddedPath: `/course-apps/${slug}/index.html`,
    cacheVersion: versions[grade],
  };
});

const connectCurricula: PortalContentItem[] = Array.from({ length: 6 }, (_, index) => {
  const grade = index + 1;
  const slug = `connect-plus-primary-${grade}`;
  const published = [1, 2, 4].includes(grade);
  const appIds: Record<number, string> = {
    1: "connect-plus-primary-1-first-term",
    2: "connect-plus-primary-2-first-term",
    4: "connect-plus-4-term-1",
  };
  const aliases: Record<number, readonly string[]> = {
    4: ["connect-plus-primary-4-first-term"],
  };
  const versions: Record<number, string> = {
    1: "20260801-1",
    2: "20260811-1",
    4: "20260717-10",
  };

  return {
    id: `curriculum:${slug}:term-1`,
    slug,
    title: {
      en: `Connect Plus Primary ${grade} – First Term`,
      ar: `كونكت بلس - الصف ${gradeArabic[grade]} - الترم الأول`,
    },
    kind: "curriculum",
    track: "connect-plus",
    grade,
    term: 1,
    route: `/courses/${slug}/`,
    availability: published ? "available" : "coming-soon",
    appId: appIds[grade],
    appIdAliases: aliases[grade],
    embeddedPath: published ? `/course-apps/${slug}/index.html` : undefined,
    cacheVersion: versions[grade],
  };
});

const assessmentBooks: PortalContentItem[] = [
  {
    id: "assessment-book:english-primary-1:term-1",
    slug: "english-primary-1-assessment",
    title: { en: "English Primary 1 Assessment Book", ar: "كتاب تقييمات اللغة الإنجليزية - الصف الأول" },
    kind: "assessment-book",
    track: "english",
    grade: 1,
    term: 1,
    route: "/assessment-books/english-primary-1/",
    availability: "available",
    appId: "english-primary-1-assessment-first-term",
  },
  {
    id: "assessment-book:english-primary-2:term-1",
    slug: "english-primary-2-assessment",
    title: { en: "English Primary 2 Assessment Book", ar: "كتاب تقييمات اللغة الإنجليزية - الصف الثاني" },
    kind: "assessment-book",
    track: "english",
    grade: 2,
    term: 1,
    route: "/assessment-books/english-primary-2/",
    availability: "available",
    appId: "english-primary-2-assessment",
  },
  {
    id: "assessment-book:english-primary-4:term-1",
    slug: "english-primary-4-assessment",
    title: { en: "English Primary 4 Assessment Book", ar: "كتاب تقييمات اللغة الإنجليزية - الصف الرابع" },
    kind: "assessment-book",
    track: "english",
    grade: 4,
    term: 1,
    route: "/assessment-books/english-primary-4/",
    availability: "available",
    appId: "english-primary-4-assessment",
  },
  {
    id: "assessment-book:connect-plus-primary-4:term-1",
    slug: "connect-plus-primary-4-assessment",
    title: { en: "Connect Plus Primary 4 Activity Book", ar: "كتاب نشاط كونكت بلس - الصف الرابع" },
    kind: "assessment-book",
    track: "connect-plus",
    grade: 4,
    term: 1,
    route: "/assessment-books/connect-plus-primary-4/",
    availability: "hidden",
    appId: "connect-plus-primary-4-assessment",
  },
];

const curriculumGames: PortalContentItem[] = [
  {
    id: "curriculum-game:english-primary-1",
    slug: "english-primary-1-games",
    title: { en: "English Primary 1 Game World", ar: "منصة ألعاب اللغة الإنجليزية - الصف الأول" },
    kind: "curriculum-game",
    track: "english",
    grade: 1,
    term: 1,
    route: "/games/english-primary-1-game-world/",
    availability: "available",
    appId: "english-primary-1-games",
  },
  {
    id: "curriculum-game:english-primary-3",
    slug: "english-primary-3-games",
    title: { en: "English Primary 3 Game World", ar: "منصة ألعاب اللغة الإنجليزية - الصف الثالث" },
    kind: "curriculum-game",
    track: "english",
    grade: 3,
    term: 1,
    route: "/games/english-primary-3-games/",
    availability: "available",
    appId: "english-primary-3-game-world",
  },
  {
    id: "curriculum-game:english-primary-4",
    slug: "english-primary-4-games",
    title: { en: "English Primary 4 Game World", ar: "منصة ألعاب اللغة الإنجليزية - الصف الرابع" },
    kind: "curriculum-game",
    track: "english",
    grade: 4,
    term: 1,
    route: "/games/english-primary-4-games/",
    availability: "available",
    appId: "english-primary-4-games",
  },
];

const bookletUrls: Record<number, string> = {
  1: "https://ia600604.us.archive.org/10/items/booklets2026-2027/Primary%201%20first%20term%202027%20Mr.%20Mohamed%20Farid.pdf",
  2: "https://ia600604.us.archive.org/10/items/booklets2026-2027/Primary%202%20first%20term%202027%20Mr.%20Mohamed%20Farid.pdf",
  3: "https://ia600604.us.archive.org/10/items/booklets2026-2027/Primary%203%20first%20term%202027%202.pdf",
  4: "https://ia600604.us.archive.org/10/items/booklets2026-2027/Primary%204%20first%20term%202027%20Mr.%20Mohamed%20Farid.pdf",
  5: "https://ia600604.us.archive.org/10/items/booklets2026-2027/primary%205%20first%20term%202027%20Mr.%20Mohamed%20Farid.pdf",
  6: "https://ia600604.us.archive.org/10/items/booklets2026-2027/primary%206%20first%20term%202027%20Mr.%20Mohamed%20Farid.pdf",
};

const booklets: PortalContentItem[] = Array.from({ length: 6 }, (_, index) => {
  const grade = index + 1;
  return {
    id: `booklet:english-primary-${grade}:term-1`,
    slug: `english-primary-${grade}-booklet`,
    title: {
      en: `English Primary ${grade} Booklet – First Term`,
      ar: `بوكلت اللغة الإنجليزية - الصف ${gradeArabic[grade]} - الترم الأول`,
    },
    kind: "booklet",
    track: "english",
    grade,
    term: 1,
    route: bookletUrls[grade],
    downloadUrl: bookletUrls[grade],
    availability: "available",
  };
});

const freeGames: PortalContentItem[] = [
  {
    id: "free-game:grammar-goal-champions",
    slug: "grammar-goal-champions",
    title: { en: "Grammar Goal Champions", ar: "أبطال ركلات القواعد" },
    kind: "free-game",
    track: "general",
    grade: null,
    term: null,
    route: "/play-learn/grammar-goal-champions/",
    availability: "available",
    artworkPath: "/play-learn/grammar-goal-champions/assets/opening-bg.webp",
  },
  {
    id: "free-game:pronoun-blaster",
    slug: "pronoun-blaster",
    title: { en: "Pronoun Blaster: Grammar Galaxy", ar: "مدفع الضمائر: مجرة القواعد" },
    kind: "free-game",
    track: "general",
    grade: null,
    term: null,
    route: "/play-learn/pronoun-blaster/",
    availability: "available",
    artworkPath: "/play-learn/pronoun-blaster/game-cover.svg",
  },
];

export const contentRegistry: readonly PortalContentItem[] = [
  ...englishCurricula,
  ...connectCurricula,
  ...assessmentBooks,
  ...curriculumGames,
  ...booklets,
  ...freeGames,
];

export function getContentByKind(kind: ContentKind) {
  return contentRegistry.filter((item) => item.kind === kind);
}

export function getAvailableContentByKind(kind: ContentKind) {
  return getContentByKind(kind).filter((item) => item.availability === "available");
}

export function getContentBySlug(slug: string, kind?: ContentKind) {
  return contentRegistry.find((item) => item.slug === slug && (!kind || item.kind === kind));
}

export function getContentByAppId(appId: string | null | undefined) {
  if (!appId) return undefined;
  return contentRegistry.find((item) => item.appId === appId || item.appIdAliases?.includes(appId));
}

export function getCurriculumContent(slug: string) {
  return getContentBySlug(slug, "curriculum");
}
