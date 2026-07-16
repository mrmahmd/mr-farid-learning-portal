type CurriculumType = "english" | "connect";

type CurriculumIconProps = {
  type: CurriculumType;
  grade: number;
  compact?: boolean;
};

export function CurriculumIcon({ type, grade, compact = false }: CurriculumIconProps) {
  const label = type === "english" ? "English" : "Connect Plus";

  return (
    <span
      className={`curriculum-art ${type}-curriculum-art grade-${grade}${compact ? " compact-curriculum-art" : ""}`}
      aria-label={`${label} Primary ${grade}`}
      role="img"
    >
      <span className="curriculum-art-code">{type === "english" ? "EN" : "C+"}</span>
      <span className="curriculum-art-grade">{grade}</span>
      <span className="curriculum-art-spark" aria-hidden="true">✦</span>
    </span>
  );
}
