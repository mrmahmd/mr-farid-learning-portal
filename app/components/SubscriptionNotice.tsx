import Link from "next/link";

const WHATSAPP_URL = "https://wa.me/966552019074";

export function SubscriptionNotice({ showSignIn = true }: { showSignIn?: boolean }) {
  return (
    <aside className="subscription-notice" aria-label="محتوى المشتركين فقط">
      <div className="subscription-notice-icon" aria-hidden="true">🔒</div>
      <div className="subscription-notice-copy" dir="rtl">
        <strong>هذا المحتوى متاح للمشتركين فقط</strong>
        <span>لمعرفة طريقة وتفاصيل الاشتراك، تواصل معي عبر واتساب على الرقم 00966552019074</span>
      </div>
      <div className="subscription-notice-actions">
        <a className="subscription-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
          <span aria-hidden="true">◉</span> واتساب
        </a>
        {showSignIn && <Link className="subscription-signin" href="/login">تسجيل الدخول</Link>}
      </div>
    </aside>
  );
}
