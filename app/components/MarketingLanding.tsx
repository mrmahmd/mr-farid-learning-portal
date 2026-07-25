"use client";

import { useEffect, useMemo, useState } from "react";
import { portalAsset } from "../asset-path";
import styles from "./MarketingLanding.module.css";

type PortalLanguage = "ar" | "en";

const copy = {
  ar: {
    featureNav: "مميزات المنصة",
    language: "English",
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    eyebrow: "بوابة تعليمية صُنعت بحب",
    heroTitle: "رحلة تعليمية",
    heroHighlight: "يتذكرها طفلك",
    heroLead:
      "منصة تجمع المناهج التفاعلية، والألعاب التعليمية، وكتب التقييمات والبوكلتس في تجربة واحدة ممتعة وآمنة لطلاب المرحلة الابتدائية.",
    start: "ابدأ مجانًا",
    haveAccount: "لدي حساب بالفعل",
    trust: [
      "من الصف الأول إلى السادس",
      "تقدم محفوظ على كل الأجهزة",
      "محتوى تفاعلي ممتع",
    ],
    discover: "اكتشف المنصة",
    introEyebrow: "كل ما يحتاجه الطالب في مكان واحد",
    introTitle: "تعلّم منظم بطريقة تجعل الطفل متحمسًا للعودة",
    introLead:
      "صُممت كل مساحة داخل البوابة لتقود الطالب بوضوح، وتحفظ إنجازه، وتحول الدرس إلى تجربة تفاعلية مليئة بالاكتشاف.",
    stats: [
      ["6", "صفوف ابتدائية"],
      ["2", "منهجان لكل صف"],
      ["24/7", "تعلم من أي جهاز"],
      ["100%", "تجربة تفاعلية"],
    ],
    features: [
      {
        title: "مناهج تفاعلية متكاملة",
        description:
          "كل صف له مساحته الخاصة، ووحداته ودروسه وتمارينه، بتصميم واضح يجعل الطالب يعرف أين يبدأ وكيف يستمر دون تشتت.",
        chips: ["English", "Connect Plus", "الترم الأول والثاني"],
        image: "/marketing/curricula.png",
        alt: "واجهة المناهج التفاعلية",
      },
      {
        title: "ألعاب تحول الدرس إلى مغامرة",
        description:
          "عوالم تعليمية مليئة بالتحديات والمكافآت، تساعد الطفل على تثبيت المفردات والقواعد والاستماع بطريقة ممتعة ومناسبة لعمره.",
        chips: ["تحديات", "نقاط ومكافآت", "تعلم باللعب"],
        image: "/marketing/games.png",
        alt: "منصة الألعاب التعليمية",
      },
      {
        title: "تقدم محفوظ أينما ذهب",
        description:
          "يبدأ الطالب على الكمبيوتر ثم يكمل من الهاتف أو التابلت. يظهر له آخر نشاط ونسبة الإنجاز ويعود إلى المكان المناسب بسهولة.",
        chips: ["حفظ سحابي", "آخر نشاط", "كل الأجهزة"],
        image: "/marketing/progress.png",
        alt: "لوحة تقدم الطالب",
      },
      {
        title: "تدريب وتقييم يوضح مستوى الطالب",
        description:
          "كتب تقييمات تفاعلية، وبوكلتس منظمة، وأسئلة متنوعة تساعد الطالب على التدريب والمراجعة والاستعداد بثقة.",
        chips: ["كتب تقييمات", "بوكلتس", "تدريب مستمر"],
        image: "/marketing/assessment.jpg",
        alt: "كتب التقييمات والتدريبات",
      },
    ],
    teacherTitle: "دعم مباشر من المعلم",
    teacherLead:
      "عند وجود سؤال أو مشكلة، يستطيع الطالب أو ولي الأمر التواصل مباشرة مع مستر محمد فريد عبر واتساب.",
    whatsapp: "تواصل عبر واتساب",
    closingTitle: "هل أنت مستعد لبدء الرحلة؟",
    closingLead:
      "أنشئ حساب الطالب الآن، واختر مرحلته، وابدأ تجربة تعليمية تفاعلية تجعل التعلم أوضح وأكثر متعة.",
    createNew: "إنشاء حساب جديد",
    previewLabel: "Mr.Farid Learning Portal",
  },
  en: {
    featureNav: "Portal Features",
    language: "العربية",
    login: "Sign In",
    register: "Create Account",
    eyebrow: "A learning portal made with care",
    heroTitle: "A learning journey",
    heroHighlight: "your child remembers",
    heroLead:
      "Interactive curricula, educational games, assessment books and booklets come together in one joyful, safe experience for primary learners.",
    start: "Start for free",
    haveAccount: "I already have an account",
    trust: [
      "Primary 1 to Primary 6",
      "Progress saved on every device",
      "Joyful interactive content",
    ],
    discover: "Discover the portal",
    introEyebrow: "Everything a learner needs in one place",
    introTitle: "Organised learning that children want to return to",
    introLead:
      "Every space guides the learner clearly, saves achievements and turns each lesson into an interactive journey of discovery.",
    stats: [
      ["6", "Primary grades"],
      ["2", "Curricula per grade"],
      ["24/7", "Learn from any device"],
      ["100%", "Interactive experience"],
    ],
    features: [
      {
        title: "Complete interactive curricula",
        description:
          "Every grade has its own space, units, lessons and practice, with a clear design that shows learners where to begin and how to continue.",
        chips: ["English", "Connect Plus", "First & Second Term"],
        image: "/marketing/curricula.png",
        alt: "Interactive curricula interface",
      },
      {
        title: "Games that turn lessons into adventures",
        description:
          "Rewarding educational worlds help children practise vocabulary, grammar and listening through age-appropriate play.",
        chips: ["Challenges", "Points & rewards", "Learning through play"],
        image: "/marketing/games.png",
        alt: "Educational games platform",
      },
      {
        title: "Progress that follows every learner",
        description:
          "Start on a computer and continue on a phone or tablet. The latest activity and progress stay connected to the student account.",
        chips: ["Cloud progress", "Latest activity", "Every device"],
        image: "/marketing/progress.png",
        alt: "Student progress dashboard",
      },
      {
        title: "Practice and assessment with purpose",
        description:
          "Interactive assessment books, organised booklets and varied questions support confident practice, revision and preparation.",
        chips: ["Assessment books", "Booklets", "Continuous practice"],
        image: "/marketing/assessment.jpg",
        alt: "Assessment books and practice",
      },
    ],
    teacherTitle: "Direct teacher support",
    teacherLead:
      "Students and parents can contact Mr. Mohamed Farid directly on WhatsApp whenever they need help.",
    whatsapp: "Contact on WhatsApp",
    closingTitle: "Ready to start the journey?",
    closingLead:
      "Create a student account, choose the grade and begin an interactive learning experience designed for clarity and joy.",
    createNew: "Create a new account",
    previewLabel: "Mr.Farid Learning Portal",
  },
} as const;

function setPortalLanguage(language: PortalLanguage) {
  localStorage.setItem("mrfarid-language", language);
  window.dispatchEvent(new CustomEvent("mrfarid-language-change", { detail: language }));
}

export function MarketingLanding() {
  const [language, setLanguage] = useState<PortalLanguage>("ar");
  const content = copy[language];

  useEffect(() => {
    const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
    const savedLanguage = localStorage.getItem("mrfarid-language");
    const initialLanguage =
      requestedLanguage === "ar" || requestedLanguage === "en"
        ? requestedLanguage
        : savedLanguage === "ar" || savedLanguage === "en"
          ? savedLanguage
          : "ar";
    setLanguage(initialLanguage);
    setPortalLanguage(initialLanguage);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add(styles.visible);
        });
      },
      { threshold: 0.14 },
    );

    const featureElements = document.querySelectorAll("[data-marketing-feature]");
    featureElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const links = useMemo(() => {
    const suffix = `?lang=${language}`;
    return {
      login: `${portalAsset("/login/")}${suffix}`,
      register: `${portalAsset("/register/")}${suffix}`,
    };
  }, [language]);

  function toggleLanguage() {
    const nextLanguage = language === "ar" ? "en" : "ar";
    setLanguage(nextLanguage);
    setPortalLanguage(nextLanguage);
  }

  return (
    <main
      className={`${styles.landing} ${language === "ar" ? styles.arabic : styles.english}`}
      lang={language}
      dir={language === "ar" ? "rtl" : "ltr"}
      data-no-translate
    >
      <div className={styles.ambient} aria-hidden="true" />

      <header className={styles.topbar}>
        <a className={styles.brand} href="#marketing-top" aria-label={content.previewLabel}>
          <img src={portalAsset("/mr-farid-avatar.png")} alt="" />
          <span>
            <strong>Mr.Farid</strong>
            <small>LEARNING PORTAL</small>
          </span>
        </a>

        <nav className={styles.topActions} aria-label={content.featureNav}>
          <a className={styles.navLink} href="#features">{content.featureNav}</a>
          <button className={styles.languageButton} type="button" onClick={toggleLanguage}>
            {content.language}
          </button>
          <a className={`${styles.button} ${styles.buttonLight}`} href={links.login}>
            {content.login}
          </a>
          <a className={`${styles.button} ${styles.buttonPrimary}`} href={links.register}>
            {content.register}
          </a>
        </nav>
      </header>

      <section className={styles.hero} id="marketing-top">
        <div className={styles.heroBackground} aria-hidden="true" />
        <div className={styles.shell}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>{content.eyebrow}<i /></span>
            <h1>
              {content.heroTitle}
              <span>{content.heroHighlight}</span>
            </h1>
            <p>{content.heroLead}</p>
            <div className={styles.heroActions}>
              <a className={`${styles.button} ${styles.buttonPrimary}`} href={links.register}>
                {content.start} <span aria-hidden="true">←</span>
              </a>
              <a className={`${styles.button} ${styles.buttonLight}`} href={links.login}>
                {content.haveAccount}
              </a>
            </div>
            <div className={styles.trustRow}>
              {content.trust.map((item) => <span key={item}>✓ {item}</span>)}
            </div>
          </div>
        </div>
        <a className={styles.scrollCue} href="#features">{content.discover}<i /></a>
      </section>

      <section className={`${styles.intro} ${styles.shell}`} id="features">
        <span className={styles.eyebrow}><i />{content.introEyebrow}</span>
        <h2>{content.introTitle}</h2>
        <p>{content.introLead}</p>
        <div className={styles.stats}>
          {content.stats.map(([value, label]) => (
            <article className={styles.stat} key={label}>
              <b>{value}</b>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.features} ${styles.shell}`}>
        {content.features.map((feature, index) => (
          <article className={styles.feature} data-marketing-feature key={index}>
            <div className={styles.featureMedia}>
              <img src={portalAsset(feature.image)} alt={feature.alt} />
            </div>
            <div className={styles.featureCopy}>
              <span className={styles.featureNumber}>{String(index + 1).padStart(2, "0")}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className={styles.chips}>
                {feature.chips.map((chip) => <span key={chip}>{chip}</span>)}
              </div>
            </div>
          </article>
        ))}

        <aside className={styles.teacher}>
          <div className={styles.teacherInfo}>
            <img src={portalAsset("/mr-farid-avatar.png")} alt="Mr. Mohamed Farid" />
            <div>
              <h3>{content.teacherTitle}</h3>
              <p>{content.teacherLead}</p>
            </div>
          </div>
          <a className={styles.teacherButton} href="https://wa.me/966552019074" target="_blank" rel="noreferrer">
            {content.whatsapp}
          </a>
        </aside>
      </section>

      <section className={`${styles.closing} ${styles.shell}`}>
        <div className={styles.closingCard}>
          <h2>{content.closingTitle}</h2>
          <p>{content.closingLead}</p>
          <div className={styles.closingActions}>
            <a className={`${styles.button} ${styles.buttonPrimary}`} href={links.register}>{content.createNew}</a>
            <a className={`${styles.button} ${styles.buttonLight}`} href={links.login}>{content.login}</a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>© Mr.Farid Learning Portal</footer>
    </main>
  );
}
