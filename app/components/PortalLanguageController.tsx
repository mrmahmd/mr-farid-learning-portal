"use client";

import { useEffect } from "react";

type PortalLanguage = "en" | "ar";

const translations: Record<string, string> = {
  "Learning Portal": "بوابة التعلّم",
  "Home": "الرئيسية",
  "Meet the Teacher": "تعرّف على المعلم",
  "Curricula": "المناهج",
  "My Curricula": "مناهجي",
  "Assessment Books": "كتب التقييمات",
  "Games": "الألعاب",
  "What's New?": "ما الجديد؟",
  "Booklets": "البوكلتس",
  "About the Portal": "عن البوابة",
  "Student Dashboard": "صفحة الطالب",
  "Sign In": "تسجيل الدخول",
  "Sign Out": "تسجيل الخروج",
  "Create Account": "إنشاء حساب",
  "Create New Account": "إنشاء حساب جديد",
  "New": "جديد",
  "Welcome back": "مرحبًا بعودتك",
  "Student Login": "دخول الطالب",
  "Username": "اسم المستخدم",
  "Password": "كلمة المرور",
  "Need help?": "تحتاج مساعدة؟",
  "Enter Learning Portal": "دخول بوابة التعلّم",
  "New to our learning world?": "جديد في عالمنا التعليمي؟",
  "You are signed in": "تم تسجيل دخولك",
  "My Progress": "تقدّمي",
  "Last Activity": "آخر نشاط",
  "Continue": "استمرار",
  "Settings": "الإعدادات",
  "My Information": "معلوماتي",
  "My Favorite Curricula": "مناهجي المفضلة",
  "Help": "المساعدة",
  "Choose your grade": "اختر مرحلتك",
  "Our Curricula": "مناهجنا",
  "Primary Grade": "المرحلة الابتدائية",
  "PRIMARY GRADE": "المرحلة الابتدائية",
  "PRIMARY STAGE": "المرحلة الابتدائية",
  "First Term": "الترم الأول",
  "Second Term": "الترم الثاني",
  "Coming soon": "قريبًا",
  "Enter": "دخول",
  "English Curriculum": "منهج اللغة الإنجليزية",
  "Connect Plus Curriculum": "منهج Connect Plus",
  "Interactive assessment workbook": "كتاب تقييمات تفاعلي",
  "Assessment resources": "مصادر التقييم",
  "Explore interactive assessment workbooks organized by primary grade. The available book opens directly in your browser and does not require a student account at this stage.": "استكشف كتب التقييمات التفاعلية المنظمة حسب المرحلة الدراسية. يفتح الكتاب المتاح مباشرة في المتصفح ولا يحتاج إلى حساب طالب في الوقت الحالي.",
  "Open Book": "فتح الكتاب",
  "Learning starts with wonder": "التعلّم يبدأ بالفضول",
  "Step into your learning world.": "ادخل إلى عالمك التعليمي.",
  "A joyful English learning portal made for young explorers from Primary 1 to Primary 6.": "بوابة ممتعة لتعلّم اللغة الإنجليزية، مصممة لطلاب المرحلة الابتدائية من الصف الأول إلى السادس.",
  "The platform is under development": "المنصة قيد التطوير",
  "New curricula and interactive learning resources are being added gradually.": "تُضاف المناهج والمصادر التعليمية التفاعلية تدريجيًا.",
  "Choose your curriculum": "اختر منهجك",
  "About Mr.Mohamed Farid": "عن مستر محمد فريد",
  "Senior English Instructor": "معلم أول لغة إنجليزية",
  "Education": "المؤهلات العلمية",
  "Educational Technology": "تكنولوجيا التعليم",
  "Teacher Development": "تطوير المعلمين",
  "My Mission": "رسالتي",
  "Connect with the Teacher": "تواصل مع المعلم",
  "Download": "تحميل",
  "Download Booklet": "تحميل البوكلت",
  "Term 1": "الترم الأول",
  "Term 2": "الترم الثاني",
  "Available": "متاح",
  "Locked": "مغلق",
  "Open": "فتح",
  "Back": "رجوع",
  "Save": "حفظ",
  "Cancel": "إلغاء",
  "What’s New?": "ما الجديد؟",
  "Discover the latest curricula, learning apps, games, and features added to Mr.Farid Learning Portal.": "اكتشف أحدث المناهج والتطبيقات التعليمية والألعاب والخصائص المضافة إلى بوابة مستر فريد.",
  "More exciting learning experiences are coming soon.": "تجارب تعليمية ممتعة جديدة ستُضاف قريبًا.",
  "A complete English learning world for every primary learner.": "عالم متكامل لتعلّم اللغة الإنجليزية لكل طالب في المرحلة الابتدائية.",
  "Mr.Farid Learning Portal brings English and Connect Plus curricula from Primary 1 to Primary 6 together in one welcoming portal.": "تجمع بوابة مستر فريد مناهج اللغة الإنجليزية وConnect Plus من الصف الأول إلى الصف السادس في بوابة تعليمية واحدة.",
  "DESIGNED & DEVELOPED BY": "تصميم وتطوير",
  "English Teacher & Educational Content Designer": "معلم لغة إنجليزية ومصمم محتوى تعليمي",
  "MY MISSION": "رسالتي",
  "CONNECT WITH THE TEACHER": "تواصل مع المعلم",
  "Student sign in required": "يلزم تسجيل دخول الطالب",
  "Sign in to open the educational games for your primary grade.": "سجّل الدخول لفتح الألعاب التعليمية الخاصة بمرحلتك.",
  "Educational Games": "الألعاب التعليمية",
  "Your grade appears first. All other primary grades remain visible as locked learning levels.": "تظهر مرحلتك أولًا، بينما تبقى المراحل الأخرى ظاهرة كمستويات تعليمية مغلقة.",
  "Booklets & Explanations": "البوكلتس والشروحات",
  "Explanations and printable booklets": "شروحات وبوكلتس قابلة للطباعة",
  "Student space": "مساحة الطالب",
  "Your personal learning dashboard.": "لوحة التعلم الشخصية الخاصة بك.",
  "Student Menu": "قائمة الطالب",
  "Dashboard": "لوحة الطالب",
  "My Grade & Curricula": "مرحلتي ومناهجي",
  "My Profile": "ملفي الشخصي",
  "Help & Support": "المساعدة والدعم",
  "Ready to keep learning": "مستعد لمواصلة التعلم",
  "Your progress and favourite curricula are saved to your account.": "يتم حفظ تقدمك ومناهجك المفضلة في حسابك.",
  "No activity yet": "لا يوجد نشاط بعد",
  "Choose a curriculum to begin learning.": "اختر منهجًا لبدء التعلم.",
  "Choose a curriculum": "اختر منهجًا",
  "Need a hand?": "هل تحتاج إلى مساعدة؟",
  "Contact Mr.Farid directly on WhatsApp.": "تواصل مع مستر فريد مباشرة عبر واتساب.",
  "Open WhatsApp": "فتح واتساب",
  "Manage your account": "إدارة حسابك",
  "Full name": "الاسم بالكامل",
  "Primary grade": "المرحلة الدراسية",
  "Your grade is fixed to keep your learning organised. To change it, contact Mr.Farid on WhatsApp.": "مرحلتك مثبتة للحفاظ على تنظيم تعلمك. لتغييرها، تواصل مع مستر فريد عبر واتساب.",
  "Save Settings": "حفظ الإعدادات",
  "Your registered learning stage": "مرحلتك التعليمية المسجلة",
  "Your latest activity will appear here as you explore a curriculum.": "سيظهر آخر نشاط لك هنا أثناء استكشافك للمناهج.",
  "Welcome, Student!": "مرحبًا بك أيها الطالب!",
};

const placeholders: Record<string, string> = {
  "Enter your username": "اكتب اسم المستخدم",
  "Enter your password": "اكتب كلمة المرور",
  "Full name": "الاسم بالكامل",
  "Confirm password": "تأكيد كلمة المرور",
};

const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();

function translatedText(value: string) {
  const trimmed = value.trim();
  let translated = translations[trimmed];
  const gradeMatch = trimmed.match(/^Primary (\d+)$/);
  if (!translated && gradeMatch) translated = `الصف ${gradeMatch[1]}`;
  if (!translated && trimmed.startsWith("Welcome back, ")) {
    translated = `مرحبًا بعودتك، ${trimmed.slice("Welcome back, ".length)}`;
  }
  if (!translated) return value;
  const start = value.match(/^\s*/)?.[0] ?? "";
  const end = value.match(/\s*$/)?.[0] ?? "";
  return `${start}${translated}${end}`;
}

function shouldSkip(node: Node) {
  const parent = node.parentElement;
  return Boolean(parent?.closest("script, style, code, pre, iframe, [data-no-translate]"));
}

function applyLanguage(language: PortalLanguage) {
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("portal-arabic", language === "ar");

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();
  while (current) {
    const text = current as Text;
    if (!shouldSkip(text) && text.nodeValue?.trim()) {
      const renderedValue = text.nodeValue;
      let source = originalText.get(text);
      if (!source) {
        source = renderedValue;
        originalText.set(text, source);
      } else {
        const expectedValue = language === "ar" ? translatedText(source) : source;
        if (renderedValue !== expectedValue) {
          source = renderedValue;
          originalText.set(text, source);
        }
      }
      text.nodeValue = language === "ar" ? translatedText(source) : source;
    }
    current = walker.nextNode();
  }

  document.querySelectorAll("input, textarea, [aria-label], [title]").forEach((element) => {
    const saved = originalAttributes.get(element) ?? new Map<string, string>();
    ["placeholder", "aria-label", "title"].forEach((attribute) => {
      const value = element.getAttribute(attribute);
      let source = saved.get(attribute);
      if (value && !source) {
        source = value;
        saved.set(attribute, source);
      } else if (value && source) {
        const expectedValue = language === "ar" ? placeholders[source] ?? translations[source] ?? source : source;
        if (value !== expectedValue) {
          source = value;
          saved.set(attribute, source);
        }
      }
      if (!source) return;
      if (language === "en") element.setAttribute(attribute, source);
      else element.setAttribute(attribute, placeholders[source] ?? translations[source] ?? source);
    });
    originalAttributes.set(element, saved);
  });
}

export function PortalLanguageController() {
  useEffect(() => {
    let language = (localStorage.getItem("mrfarid-language") === "ar" ? "ar" : "en") as PortalLanguage;
    let applying = false;
    const observer = new MutationObserver(() => {
      if (applying) return;
      applying = true;
      observer.disconnect();
      applyLanguage(language);
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ["placeholder", "aria-label", "title"],
      });
      applying = false;
    });

    const changeLanguage = (event: Event) => {
      language = (event as CustomEvent<PortalLanguage>).detail;
      applyLanguage(language);
    };

    const syncLanguage = (event: StorageEvent) => {
      if (event.key !== "mrfarid-language") return;
      language = event.newValue === "ar" ? "ar" : "en";
      applyLanguage(language);
    };

    applyLanguage(language);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["placeholder", "aria-label", "title"],
    });
    window.addEventListener("mrfarid-language-change", changeLanguage);
    window.addEventListener("storage", syncLanguage);
    return () => {
      observer.disconnect();
      window.removeEventListener("mrfarid-language-change", changeLanguage);
      window.removeEventListener("storage", syncLanguage);
    };
  }, []);

  return null;
}
