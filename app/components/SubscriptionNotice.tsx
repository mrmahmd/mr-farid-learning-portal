"use client";

import { useEffect, useState } from "react";

const WHATSAPP_URL = "https://wa.me/966552019074";

export function SubscriptionNotice({ showSignIn: _showSignIn = false }: { showSignIn?: boolean }) {
  const [language, setLanguage] = useState<"ar" | "en">("en");

  useEffect(() => {
    const getLanguage = () => document.documentElement.lang === "ar" || localStorage.getItem("mrfarid-language") === "ar" ? "ar" : "en";
    const syncLanguage = () => setLanguage(getLanguage());
    const onLanguageChange = (event: Event) => setLanguage((event as CustomEvent<"ar" | "en">).detail === "ar" ? "ar" : "en");
    syncLanguage();
    window.addEventListener("mrfarid-language-change", onLanguageChange);
    window.addEventListener("storage", syncLanguage);
    return () => {
      window.removeEventListener("mrfarid-language-change", onLanguageChange);
      window.removeEventListener("storage", syncLanguage);
    };
  }, []);

  const arabic = language === "ar";
  return (
    <aside className={`subscription-notice${arabic ? " subscription-notice-ar" : ""}`} dir={arabic ? "rtl" : "ltr"} data-no-translate aria-label={arabic ? "محتوى المشتركين فقط" : "Subscribers only content"}>
      <div className="subscription-notice-icon" aria-hidden="true">🔒</div>
      <div className="subscription-notice-copy">
        <strong>{arabic ? "المحتوى متاح للمشتركين فقط" : "This content is for subscribers only"}</strong>
        <span>{arabic ? "فعّل اشتراكك لفتح المناهج والألعاب وكتب التقييمات والبوكلتس الخاصة بمرحلتك." : "Activate your subscription to unlock the curricula, games, assessment books, and booklets for your grade."}</span>
        <b>{arabic ? "للاشتراك والاستفسار: 00966552019074" : "Subscribe & ask: 00966552019074"}</b>
      </div>
      <a className="subscription-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label={arabic ? "الاشتراك عبر واتساب" : "Subscribe through WhatsApp"}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.74 11.74 0 0 0 12.16 0C5.67 0 .4 5.27.4 11.76c0 2.07.54 4.1 1.57 5.88L.3 24l6.52-1.64a11.75 11.75 0 0 0 5.34 1.28h.01c6.48 0 11.75-5.27 11.75-11.76 0-3.14-1.22-6.1-3.4-8.4Zm-8.36 18.17h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.22-3.87.97 1.03-3.77-.23-.39a9.79 9.79 0 1 1 8.44 4.78Zm5.38-7.34c-.29-.14-1.73-.85-2-.95-.27-.1-.46-.14-.66.15-.2.3-.76.95-.93 1.15-.17.2-.34.22-.63.07-.3-.15-1.26-.46-2.4-1.48-.89-.8-1.49-1.78-1.66-2.08-.17-.3-.02-.46.13-.61.13-.13.29-.34.44-.51.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.2-.24-.58-.48-.5-.66-.51h-.56c-.2 0-.51.07-.78.37-.27.3-1.02 1-1.02 2.44s1.05 2.83 1.2 3.03c.15.2 2.06 3.15 4.99 4.42.7.3 1.25.48 1.68.61.7.22 1.34.19 1.84.11.56-.08 1.73-.7 1.97-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.2-.56-.35Z" /></svg>
        {arabic ? "اشترك عبر واتساب" : "Subscribe on WhatsApp"}
      </a>
    </aside>
  );
}
