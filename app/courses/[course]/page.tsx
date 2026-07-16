import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerPageShell } from "../../components/InnerPageShell";
import { AuthenticatedCourse } from "../../components/AuthenticatedCourse";
import { curricula, getCurriculum } from "../../data/curricula";

type CoursePageProps = {
  params: Promise<{ course: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return curricula.map((curriculum) => ({ course: curriculum.slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { course } = await params;
  const curriculum = getCurriculum(course);

  return {
    title: curriculum?.title ?? "Curriculum",
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { course } = await params;
  const curriculum = getCurriculum(course);

  if (!curriculum) notFound();

  return (
    <InnerPageShell className="course-app-page">
      <AuthenticatedCourse curriculum={curriculum} />
    </InnerPageShell>
  );
}
