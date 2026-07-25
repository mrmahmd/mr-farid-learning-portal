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
  "Quick help": "مساعدة سريعة",
  "Your learning space": "مساحتك التعليمية",
  "Choose a section from your student menu and continue your learning journey.": "اختر قسمًا من قائمة الطالب لمواصلة رحلتك التعليمية.",
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
  "Assessment resources": "مصادر التقييم",
  "Explore interactive assessment workbooks organized by primary grade. The available book opens directly in your browser and does not require a student account at this stage.": "استكشف كتب التقييمات التفاعلية المنظمة حسب المرحلة الدراسية. يفتح الكتاب المتاح مباشرة في المتصفح ولا يحتاج إلى حساب طالب في الوقت الحالي.",
  "Open Book": "فتح الكتاب",
  "Learning starts with wonder": "التعلّم يبدأ بالفضول",
  "Step into your learning world.": "ادخل إلى عالمك التعليمي.",
  "Step into your": "ادخل إلى",
  " learning world.": " عالمك التعليمي.",
  "learning world.": "عالمك التعليمي.",
  "A joyful English learning portal made for young explorers from Primary 1 to Primary 6.": "بوابة ممتعة لتعلّم اللغة الإنجليزية، مصممة لطلاب المرحلة الابتدائية من الصف الأول إلى السادس.",
  "A joyful English learning portal made for young explorers from": "بوابة ممتعة لتعلّم اللغة الإنجليزية، مصممة للطلاب من",
  "Primary 1 to Primary 6.": "الصف الأول إلى الصف السادس.",
  "Primary 1–6": "الصفوف 1–6",
  "The platform is under development": "المنصة قيد التطوير",
  "New curricula and interactive learning resources are being added gradually.": "تُضاف المناهج والمصادر التعليمية التفاعلية تدريجيًا.",
  "Choose your curriculum": "اختر منهجك",
  "About Mr.Mohamed Farid": "عن مستر محمد فريد",
  "Meet the teacher": "تعرّف على المعلم",
  "Senior English Instructor": "معلم أول لغة إنجليزية",
  "Education": "المؤهلات العلمية",
  "Current Position": "المنصب الحالي",
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
  "A clear learning path": "مسار تعلّم واضح",
  "Each grade is organised into curricula, units, lessons and activities.": "يُنظَّم كل صف في مناهج ووحدات ودروس وأنشطة.",
  "Made for young learners": "مصمم للمتعلمين الصغار",
  "A cheerful, simple experience that works beautifully on phones and computers.": "تجربة ممتعة وبسيطة تعمل بشكل رائع على الهواتف وأجهزة الكمبيوتر.",
  "Progress that matters": "تقدّم يستحق المتابعة",
  "Students will be able to continue lessons and follow their achievements.": "يستطيع الطلاب متابعة دروسهم ومتابعة إنجازاتهم.",
  "Teacher connection": "التواصل مع المعلم",
  "Direct communication with Mr. Mohamed Farid through trusted channels.": "تواصل مباشر مع مستر محمد فريد عبر قنوات موثوقة.",
  "Mr.Farid Learning Portal brings English and Connect Plus curricula from Primary 1 to Primary 6 together in one welcoming portal.": "تجمع بوابة مستر فريد مناهج اللغة الإنجليزية وConnect Plus من الصف الأول إلى الصف السادس في بوابة تعليمية واحدة.",
  "DESIGNED & DEVELOPED BY": "تصميم وتطوير",
  "English Teacher & Educational Content Designer": "معلم لغة إنجليزية ومصمم محتوى تعليمي",
  "Bachelor of Arts and Education, Faculty of Education, Mansoura University — 2007.": "ليسانس الآداب والتربية، كلية التربية، جامعة المنصورة — 2007.",
  "English Teacher at AlAndalus Private Schools — Egyptian Section, Al-Hamdaniyah, Jeddah.": "معلم لغة إنجليزية في مدارس الأندلس الخاصة — القسم المصري، الحمدانية، جدة.",
  "Designs interactive educational applications, digital learning experiences, worksheets, games, and AI-powered learning content.": "يصمم تطبيقات تعليمية تفاعلية وتجارب تعلم رقمية وأوراق عمل وألعابًا ومحتوى تعليميًا مدعومًا بالذكاء الاصطناعي.",
  "Supports and trains teachers in using artificial intelligence for lesson planning and educational content creation.": "يدعم المعلمين ويدرّبهم على استخدام الذكاء الاصطناعي في تخطيط الدروس وإنشاء المحتوى التعليمي.",
  "“To make English clear, enjoyable, practical, and memorable for every learner.”": "لجعل اللغة الإنجليزية واضحة وممتعة وعملية ولا تُنسى لكل متعلم.",
  "MY MISSION": "رسالتي",
  "CONNECT WITH THE TEACHER": "تواصل مع المعلم",
  "Educational Games": "الألعاب التعليمية",
  "Learn, play, remember": "تعلّم، العب، وتذكّر",
  "Your grade appears first. All other primary grades remain visible as locked learning levels.": "تظهر مرحلتك أولًا، بينما تبقى المراحل الأخرى ظاهرة كمستويات تعليمية مغلقة.",
  "Booklets & Explanations": "البوكلتس والشروحات",
  "Explanations and printable booklets": "شروحات وبوكلتس قابلة للطباعة",
  "Student space": "مساحة الطالب",
  "Student portal": "بوابة الطالب",
  "STUDENT": "الطالب",
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
  "New curriculum": "منهج جديد",
  "RECENTLY ADDED": "أُضيف حديثًا",
  "ASSESSMENT BOOKS": "كتب التقييمات",
  "Interactive assessment workbook": "كتاب تقييمات تفاعلي",
  "Interactive activity book": "كتاب أنشطة تفاعلي",
  "Open →": "فتح ←",
  "Soon": "قريبًا",
  "🔒 Locked": "🔒 مغلق",
  "Student sign in required": "يلزم تسجيل دخول الطالب",
  "Sign in to open the educational games for your primary grade.": "سجّل الدخول لفتح الألعاب التعليمية الخاصة بمرحلتك.",
  "Create your private password first": "أنشئ كلمة مرورك الخاصة أولًا",
  "For your account security, choose a new personal password before opening the games.": "لحماية حسابك، اختر كلمة مرور شخصية جديدة قبل فتح الألعاب.",
  "For your account security, choose a new personal password before opening the booklets.": "لحماية حسابك، اختر كلمة مرور شخصية جديدة قبل فتح البوكلتس.",
  "Choose your primary grade first": "اختر مرحلتك الدراسية أولًا",
  "Select your real grade so the portal can show only the curricula, games and booklets prepared for you.": "اختر مرحلتك الحقيقية حتى تعرض البوابة المناهج والألعاب والبوكلتس المناسبة لك.",
  "Choose carefully. To change your grade later, contact Mr.Farid on WhatsApp.": "اختر بعناية. لتغيير مرحلتك لاحقًا، تواصل مع مستر فريد عبر واتساب.",
  "Choose My Grade · اختيار المرحلة": "اختيار مرحلتي · Choose My Grade",
  "Create your student account": "أنشئ حساب الطالب",
  "Choose the student's grade to open the right curricula, games and booklets from the first sign in.": "اختر مرحلة الطالب لفتح المناهج والألعاب والبوكلتس المناسبة منذ أول تسجيل دخول.",
  "Create one account": "أنشئ حسابًا واحدًا",
  "Use a simple username and password": "استخدم اسم مستخدم وكلمة مرور بسيطين",
  "Choose your primary grade": "اختر مرحلتك الدراسية",
  "Your learning content appears automatically": "سيظهر محتواك التعليمي تلقائيًا",
  "Learn in one organised space": "تعلّم في مساحة منظمة واحدة",
  "English and Connect Plus for your grade": "اللغة الإنجليزية وConnect Plus لمرحلتك",
  "Student registration": "تسجيل الطالب",
  "New Account": "حساب جديد",
  "Full Name": "الاسم بالكامل",
  "English letters and numbers only. Dots, dashes and underscores are allowed.": "استخدم الحروف الإنجليزية والأرقام فقط. يُسمح بالنقاط والشرطات والشرطة السفلية.",
  "Choose the student's grade": "اختر مرحلة الطالب",
  "The student will see this grade and the higher locked grades.": "سيظهر للطالب هذا الصف والصفوف الأعلى مغلقة.",
  "At least 8 characters": "8 أحرف على الأقل",
  "Repeat password": "أعد كتابة كلمة المرور",
  "Already registered?": "هل لديك حساب بالفعل؟",
  "Sign in here": "سجّل الدخول هنا",
  "New student?": "طالب جديد؟",
  "Create an account": "أنشئ حسابًا",
  "Forgot your password?": "هل نسيت كلمة المرور؟",
  "Contact Mr.Farid": "تواصل مع مستر فريد",
  "Curriculum access unavailable": "الوصول إلى المنهج غير متاح",
  "Choose Another Curriculum": "اختيار منهج آخر",
  "Opening your curriculum...": "جارٍ فتح المنهج...‏",
  "Checking your student account.": "جارٍ التحقق من حساب الطالب.",
  "Your curriculum space is ready": "مساحة منهجك جاهزة",
  "Portal Home": "الصفحة الرئيسية للبوابة",
  "Contact Mr. Mohamed Farid on WhatsApp at +966 55 201 9074": "تواصل مع مستر محمد فريد عبر واتساب على الرقم +966 55 201 9074",
  "Visit Mr. Mohamed Farid on Facebook": "زيارة صفحة مستر محمد فريد على فيسبوك",
  "Visit Mr. Mohamed Farid on YouTube": "زيارة قناة مستر محمد فريد على يوتيوب",
  "WhatsApp": "واتساب",
  "Facebook": "فيسبوك",
  "YouTube": "يوتيوب",
  "Vocabulary, grammar and lesson games": "ألعاب المفردات والقواعد والدروس",
  "Interactive practice for Connect Plus lessons": "تدريبات تفاعلية لدروس Connect Plus",
  "Learn": "تعلّم",
  "Explore": "اكتشف",
  "Shine": "تألّق",
  "Your account stays signed in on this device.": "سيظل حسابك مسجلًا على هذا الجهاز.",
  "A safe learning space for every young learner.": "مساحة تعلم آمنة لكل طالب صغير.",
  "Full portal": "البوابة كاملة",
  "Grade needs assignment": "المرحلة تحتاج إلى تحديد",
  "Booklets on": "البوكلتس مفعّلة",
  "Booklets off": "البوكلتس متوقفة",
  "Continue learning where you stopped": "واصل التعلم من حيث توقفت",
  "Ready to learn?": "هل أنت مستعد للتعلم؟",
  "Student shortcuts": "اختصارات الطالب",
  "Every primary grade from Primary 1 to Primary 6 includes two dedicated learning pathways. English and Connect Plus. This page provides an overview of the curricula available across the portal. Students access their assigned curricula from their personal accounts after signing in.": "يضم كل صف من الصف الأول إلى الصف السادس مسارين تعليميين: اللغة الإنجليزية وConnect Plus. تعرض هذه الصفحة نظرة عامة على المناهج المتاحة في البوابة، ويدخل الطلاب إلى مناهجهم من حساباتهم الشخصية بعد تسجيل الدخول.",
  "Every primary grade from": "يضم كل صف من",
  "includes two dedicated learning pathways.": "مسارين تعليميين مخصصين.",
  "This page provides an overview of the curricula available across the portal.": "تعرض هذه الصفحة نظرة عامة على المناهج المتاحة في البوابة.",
  "Students access their assigned curricula from their personal accounts after signing in.": "يدخل الطلاب إلى مناهجهم من حساباتهم الشخصية بعد تسجيل الدخول.",
  "Your grade appears first. All other primary grades remain visible as locked levels.": "تظهر مرحلتك أولًا، بينما تبقى المراحل الأخرى ظاهرة كمستويات مغلقة.",
  "Your account remains active until Mr.Farid assigns your grade.": "يظل حسابك نشطًا حتى يحدد لك مستر فريد مرحلتك الدراسية.",
  "Booklets and printable explanations organized by primary grade and curriculum.": "بوكلتس وشروحات قابلة للطباعة منظمة حسب المرحلة والمنهج.",
  "Download PDF ↗": "تحميل ملف PDF ↗",
  "Learning resources, interactive curricula, games and assessment books for young learners.": "مصادر تعلم ومناهج تفاعلية وألعاب وكتب تقييمات للطلاب الصغار.",
  "Your learning journey": "رحلتك التعليمية",
  "Your progress is saved to your account and follows you across your devices.": "يُحفظ تقدمك في حسابك ويظل متاحًا لك على أجهزتك المختلفة.",
  "The available book opens directly in your browser.": "يفتح الكتاب المتاح مباشرة في المتصفح.",
  "English": "اللغة الإنجليزية",
  "Connect Plus": "Connect Plus",
  "Confirm Password": "تأكيد كلمة المرور",
  "Create My Account": "إنشاء حسابي",
  "Creating Account...": "جارٍ إنشاء الحساب...",
  "Signing In...": "جارٍ تسجيل الدخول...",
  "Enter & View All Curricula": "الدخول إلى المنصة",
};

const placeholders: Record<string, string> = {
  "Enter your username": "اكتب اسم المستخدم",
  "Enter your password": "اكتب كلمة المرور",
  "Full name": "الاسم بالكامل",
  "Confirm password": "تأكيد كلمة المرور",
  "Enter the student's full name": "اكتب الاسم الكامل للطالب",
  "Choose a username": "اختر اسم مستخدم",
  "At least 8 characters": "8 أحرف على الأقل",
  "Repeat password": "أعد كتابة كلمة المرور",
};

const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();
const originalElementText = new WeakMap<Element, string>();
const gradeOrdinals: Record<string, string> = {
  "1": "الأول",
  "2": "الثاني",
  "3": "الثالث",
  "4": "الرابع",
  "5": "الخامس",
  "6": "السادس",
};

function translatedText(value: string) {
  const trimmed = value.trim();
  let translated = translations[trimmed];
  const lockedGradeSentence = "Your grade appears first. All other primary grades remain visible as locked levels.";
  const lockedLearningSentence = "Your grade appears first. All other primary grades remain visible as locked learning levels.";
  if (!translated && trimmed.includes(lockedGradeSentence)) {
    translated = trimmed.replace(lockedGradeSentence, translations[lockedGradeSentence]);
  }
  if (!translated && trimmed.includes(lockedLearningSentence)) {
    translated = trimmed.replace(lockedLearningSentence, translations[lockedLearningSentence]);
  }
  const gradeMatch = trimmed.match(/^Primary (\d+)$/);
  if (!translated && gradeMatch) translated = `الصف ${gradeOrdinals[gradeMatch[1]] ?? gradeMatch[1]}`;
  const englishGradeMatch = trimmed.match(/^English Primary (\d+)(.*)$/);
  if (!translated && englishGradeMatch) translated = `اللغة الإنجليزية - الصف ${gradeOrdinals[englishGradeMatch[1]] ?? englishGradeMatch[1]}${englishGradeMatch[2]}`;
  const connectGradeMatch = trimmed.match(/^Connect Plus Primary (\d+)(.*)$/);
  if (!translated && connectGradeMatch) translated = `Connect Plus - الصف ${gradeOrdinals[connectGradeMatch[1]] ?? connectGradeMatch[1]}${connectGradeMatch[2]}`;
  const studentSpaceMatch = trimmed.match(/^Your Primary (\d+) learning space$/);
  if (!translated && studentSpaceMatch) translated = `مساحتك التعليمية - الصف ${gradeOrdinals[studentSpaceMatch[1]] ?? studentSpaceMatch[1]}`;
  const welcomeStudentMatch = trimmed.match(/^Welcome, (.+)\.$/);
  if (!translated && welcomeStudentMatch) translated = `مرحبًا بك، ${welcomeStudentMatch[1]}، في مساحتك التعليمية.`;
  if (!translated && trimmed.startsWith("Welcome back, ")) {
    translated = `مرحبًا بعودتك، ${trimmed.slice("Welcome back, ".length)}`;
  }
  if (!translated && trimmed.startsWith("Ready to keep learning, ") && trimmed.endsWith("?")) {
    const name = trimmed.slice("Ready to keep learning, ".length, -1);
    translated = `مستعد لمواصلة التعلم، ${name}؟`;
  }
  if (!translated && trimmed.startsWith("Welcome, ")) {
    const separator = trimmed.indexOf(". ");
    if (separator > 0) {
      const name = trimmed.slice("Welcome, ".length, separator);
      const remainder = trimmed.slice(separator + 2);
      translated = `مرحبًا بك، ${name}. ${translatedText(remainder).trim()}`;
    }
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

  document.body.querySelectorAll("h1, h2, h3, h4, p, strong, span, small, a, button, label, option").forEach((element) => {
    if (element.children.length > 0 || element.closest("script, style, code, pre, iframe, svg, [data-no-translate]")) return;
    const currentValue = element.textContent ?? "";
    const storedSource = element.getAttribute("data-portal-en-text");
    let source = storedSource ?? originalElementText.get(element) ?? currentValue;
    if (!storedSource) element.setAttribute("data-portal-en-text", source);
    originalElementText.set(element, source);
    const nextValue = language === "ar" ? translatedText(source) : source;
    if (element.textContent !== nextValue) element.textContent = nextValue;
  });

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();
  while (current) {
    const text = current as Text;
    if (!shouldSkip(text) && text.parentElement?.children.length !== 0 && text.nodeValue?.trim()) {
      const renderedValue = text.nodeValue;
      let source = originalText.get(text);
      if (!source) {
        source = renderedValue;
        originalText.set(text, source);
      } else if (language === "en" && renderedValue !== source && renderedValue !== translatedText(source)) {
        // A translated text node must never replace its original English
        // source, otherwise switching back to English leaves mixed content.
        source = renderedValue;
        originalText.set(text, source);
      }
      const nextValue = language === "ar" ? translatedText(source) : source;
      if (text.nodeValue !== nextValue) text.nodeValue = nextValue;
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
      const nextValue = language === "en" ? source : placeholders[source] ?? translations[source] ?? source;
      if (element.getAttribute(attribute) !== nextValue) element.setAttribute(attribute, nextValue);
    });
    originalAttributes.set(element, saved);
  });
}

export function PortalLanguageController() {
  useEffect(() => {
    const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
    let language = (
      requestedLanguage === "ar" || requestedLanguage === "en"
        ? requestedLanguage
        : localStorage.getItem("mrfarid-language") === "ar"
          ? "ar"
          : "en"
    ) as PortalLanguage;
    if (requestedLanguage === "ar" || requestedLanguage === "en") {
      localStorage.setItem("mrfarid-language", requestedLanguage);
    }
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
      observer.disconnect();
      applyLanguage(language);
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ["placeholder", "aria-label", "title"],
      });
    };

    const syncLanguage = (event: StorageEvent) => {
      if (event.key !== "mrfarid-language") return;
      language = event.newValue === "ar" ? "ar" : "en";
      observer.disconnect();
      applyLanguage(language);
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ["placeholder", "aria-label", "title"],
      });
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
