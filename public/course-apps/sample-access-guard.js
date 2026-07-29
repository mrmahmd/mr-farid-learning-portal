(() => {
  let sampleMode = new URLSearchParams(window.location.search).get("sample") === "1";
  const isLaterContent = (text) => /\b(?:unit|lesson)\s*(?:[2-9]|1\d)\b/i.test(text);

  function numberAfter(prefix, value) {
    const match = String(value || "").match(new RegExp(`(?:^|[-_:])${prefix}(?:nit)?[-_]?([1-9]\\d*)`, "i"));
    return match ? Number(match[1]) : null;
  }

  function lessonNumber(value) {
    const match = String(value || "").match(/(?:^|[-_:]|u\d+)l(?:esson)?[-_]?([1-9]\d*)/i);
    return match ? Number(match[1]) : null;
  }

  function isLaterNavigation(target) {
    const interactive = target instanceof Element ? target.closest("a, button, [role='button'], [onclick]") : null;
    const cardContext = interactive?.closest("article, .unit-card, .module-card, .dashboard-module-card, .progress-row, .lesson-card, .lesson-node");
    if (cardContext && isLaterContent((cardContext.textContent || "").replace(/\s+/g, " "))) return true;
    let element = interactive;
    while (element && element !== document.body) {
      const dataset = element.dataset || {};
      // These values are zero-based indexes in the applications.
      const indexValues = [dataset.unitIndex, dataset.progressUnit, dataset.lesson];
      if (indexValues.some((value) => value !== undefined && Number(value) > 0)) return true;

      // data-open-unit is not consistent: some apps use a zero-based index and
      // others use the visible Unit number. Treat only values after Unit 1 as locked.
      if (dataset.openUnit !== undefined && Number.isFinite(Number(dataset.openUnit)) && Number(dataset.openUnit) > 1) return true;
      if (dataset.openLesson !== undefined && Number.isFinite(Number(dataset.openLesson)) && Number(dataset.openLesson) > 1) return true;

      const unitValues = [dataset.module, dataset.dashboardModule, dataset.unit, dataset.unitId, dataset.openUnit, dataset.openLesson, element.getAttribute("href"), element.id];
      if (unitValues.some((value) => {
        const unitNumber = numberAfter("u", value);
        return unitNumber !== null && unitNumber > 1;
      })) return true;
      if (unitValues.some((value) => {
        const number = lessonNumber(value);
        return number !== null && number > 1;
      })) return true;

      // Only inspect visible text on the clickable element itself. Inspecting a
      // parent panel would accidentally find “Unit 2” elsewhere in the menu
      // and block the first sample lesson as well.
      const signature = [
        element === interactive ? element.textContent : "",
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
