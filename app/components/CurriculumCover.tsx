import { portalAsset } from "../asset-path";

type CurriculumType = "english" | "connect";

type CurriculumCoverProps = {
  type: CurriculumType;
  grade: number;
};

export function CurriculumCover({ type, grade }: CurriculumCoverProps) {
  const isEnglish = type === "english";
  const title = isEnglish ? "English" : "Connect Plus";

  return (
    <div className={`curriculum-cover ${type}-curriculum-cover`}>
      <img
        src={portalAsset(isEnglish ? "/curriculum-covers/english-cover.png" : "/curriculum-covers/connect-plus-cover.png")}
        alt=""
      />
      <div className="curriculum-cover-shade" />
      <div className="curriculum-cover-title">
        <span>{title}</span>
        <strong>Primary {grade}</strong>
      </div>
    </div>
  );
}
