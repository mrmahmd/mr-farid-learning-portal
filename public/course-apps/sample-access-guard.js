(() => {
  let sampleMode = new URLSearchParams(window.location.search).get("sample") === "1";
  const isLaterContent = (text) => /\b(?:unit|lesson)\s*(?:[2-9]|1\d)\b/i.test(text);

  function numberAfter(prefix, value) {
    const match = String(value || "").match(new RegExp(`(?:^|[-_:])${prefix}(?:nit)?[-_]?([1-9]\\d*)`, "i"));
    return match ? Number(match[1]) : null;
  }

  function isLaterNavigation(target) {
    let element = target instanceof Element ? target : null;
    while (element && element !== document.body) {
      const dataset = element.dataset || {};
      const indexValues = [dataset.unitIndex, dataset.openUnit, dataset.progressUnit, dataset.lesson, dataset.openLesson];
      if (indexValues.some((value) => value !== undefined && Number(value) > 0)) return true;

      const unitValues = [dataset.module, dataset.dashboardModule, dataset.unit, dataset.unitId, element.getAttribute("href"), element.id];
      if (unitValues.some((value) => {
        const unitNumber = numberAfter("u", value);
        return unitNumber !== null && unitNumber > 1;
      })) return true;

      const signature = [
        element.textContent,
        element.getAttribute("aria-label"),
        element.getAttribute("title"),
        element.id,
        element.className,
      ].filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
      if (isLaterContent(signature)) return true;
      element = element.parentElement;
    }
    return false;
  }

  function showNotice(message) {
    if (!document.getElementById("mrfarid-sample-style")) {
      const style = document.createElement("style");
      style.id = "mrfarid-sample-style";
      style.textContent = '#mrfarid-sample-notice{position:fixed;z-index:2147483647;left:50%;bottom:18px;transform:translateX(-50%);width:min(760px,calc(100% - 28px));display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:8px 14px;padding:13px 18px;border:1px solid #b8c9ff;border-radius:18px;background:rgba(246,249,255,.97);box-shadow:0 16px 42px rgba(24,48,112,.24);color:#18336d;font:700 14px system-ui;text-align:center}#mrfarid-sample-notice strong{color:#2459d2;font-size:16px}#mrfarid-sample-notice a{display:inline-flex;padding:9px 13px;border-radius:12px;background:#12a95a;color:#fff;text-decoration:none;font-weight:900}.mrfarid-sample-locked{opacity:.45!important;filter:grayscale(.55)!important;cursor:not-allowed!important}';
      document.head.appendChild(style);
    }
    let notice = document.getElementById("mrfarid-sample-notice");
    if (!notice) {
      notice = document.createElement("div");
      notice.id = "mrfarid-sample-notice";
      notice.innerHTML = '<strong>Free sample: Unit 1, Lesson 1</strong><span>This content opens with your subscription.</span><a href="https://wa.me/966552019074" target="_blank" rel="noreferrer">Subscribe on WhatsApp</a>';
      document.body.appendChild(notice);
    }
    if (message) notice.querySelector("span").textContent = message;
  }

  function lockLaterItems() {
    if (!sampleMode || !document.body) return;
    document.documentElement.dataset.mrfaridSample = "true";
    showNotice();
    document.querySelectorAll("a, button, [role='button'], [onclick]").forEach((element) => {
      const text = (element.textContent || "").replace(/\s+/g, " ").trim();
      if (!(isLaterContent(text) || isLaterNavigation(element)) || element.dataset.mrfaridSampleLocked) return;
      element.dataset.mrfaridSampleLocked = "true";
      element.classList.add("mrfarid-sample-locked");
      element.setAttribute("aria-disabled", "true");
      element.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        showNotice("This is part of the full course. Subscribe to continue.");
      }, true);
    });
  }

  function start() {
    lockLaterItems();
    document.addEventListener("click", (event) => {
      if (!sampleMode || !isLaterNavigation(event.target)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      showNotice("This is part of the full course. Subscribe to continue.");
    }, true);
    new MutationObserver(lockLaterItems).observe(document.documentElement, { childList: true, subtree: true });
  }

  window.addEventListener("message", (event) => {
    if (event.origin !== window.location.origin || event.data?.type !== "mrfarid-course-access") return;
    sampleMode = event.data.mode === "sample";
    lockLaterItems();
  });
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", start, { once: true }) : start();
})();
