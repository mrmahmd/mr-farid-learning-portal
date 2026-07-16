window.MrFaridCourseProgress = (() => {
  const url = "https://tygekqfjytwbkvdkjcrg.supabase.co";
  const key = "sb_publishable_QiA5NUT4QgIZCyQL3eXEIQ_m0xw3FBP";
  const portalOrigin = window.location.origin;
  let client;
  let userId;
  let appId;
  let readState;
  let applyState;
  let mergeStates;
  let writeTimer;
  let writePromise;
  let writeAgain = false;
  let dirty = false;
  let changeVersion = 0;
  let reportStatus;
  let sessionSignal;

  function status(online, message) {
    reportStatus?.({ online, message });
  }

  function ensureClient() {
    if (!window.supabase) return null;
    if (!client) {
      client = window.supabase.createClient(url, key, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
      });
    }
    return client;
  }

  window.addEventListener("message", async (event) => {
    if (
      event.origin !== portalOrigin ||
      event.data?.type !== "mrfarid-progress-session" ||
      !client ||
      !event.data.accessToken ||
      !event.data.refreshToken
    ) return;

    try {
      await client.auth.setSession({
        access_token: event.data.accessToken,
        refresh_token: event.data.refreshToken,
      });
      sessionSignal?.();
    } catch (error) {
      status(false, "Sign in again to enable cloud progress.");
    }
  });

  async function portalSession() {
    const current = await client.auth.getSession();
    if (current.data.session) return current.data.session;

    if (window.parent !== window) {
      window.parent.postMessage({ type: "mrfarid-progress-session-request" }, portalOrigin);
      await new Promise((resolve) => {
        const timer = setTimeout(resolve, 3500);
        sessionSignal = () => {
          clearTimeout(timer);
          sessionSignal = undefined;
          resolve();
        };
      });
    }

    return (await client.auth.getSession()).data.session;
  }

  async function requireAccount({ loginUrl } = {}) {
    if (!ensureClient()) {
      window.top.location.replace(loginUrl || new URL("../../login/", window.location.href).href);
      return null;
    }

    const session = await portalSession();
    if (!session) {
      window.top.location.replace(loginUrl || new URL("../../login/", window.location.href).href);
      return null;
    }
    return session;
  }

  async function connect({ courseId, getState, setState, mergeState, onReady, onStatus }) {
    reportStatus = onStatus;
    applyState = setState;
    mergeStates = mergeState;
    readState = getState;
    appId = courseId;
    status(false, "Connecting your saved progress...");

    if (!window.supabase) {
      status(false, "Cloud progress could not start. Refresh the page.");
      return { connected: false, error: "Learning sync is not available." };
    }

    ensureClient();

    const session = await portalSession();
    if (!session) {
      status(false, "Sign in again to enable cloud progress.");
      return { connected: false, error: "Please sign in to the portal first." };
    }

    userId = session.user.id;
    const { data, error } = await client
      .from("course_progress")
      .select("state,updated_at")
      .eq("user_id", userId)
      .eq("app_id", appId)
      .maybeSingle();

    if (error) {
      status(false, "Cloud progress needs attention.");
      return { connected: false, error: error.message };
    }

    if (data?.state) applyState(mergeStates(readState(), data.state));
    dirty = true;
    changeVersion += 1;
    const saved = await saveNow();
    if (!saved) return { connected: false, error: "Progress could not be saved." };

    onReady?.();
    status(true, "Progress saved to your account");
    return { connected: true };
  }

  function queueSave() {
    dirty = true;
    changeVersion += 1;
    if (!client || !userId || !appId || !readState) return;
    clearTimeout(writeTimer);
    writeTimer = setTimeout(() => void saveNow(), 250);
  }

  async function performSave() {
    if (!dirty || !client || !userId || !appId || !readState) return false;
    const savingVersion = changeVersion;
    const snapshot = readState();
    status(false, "Saving progress...");

    const { error } = await client.from("course_progress").upsert(
      { user_id: userId, app_id: appId, state: snapshot, updated_at: new Date().toISOString() },
      { onConflict: "user_id,app_id" },
    );

    if (error) {
      status(false, "Cloud save failed. Check your connection.");
      return false;
    }

    if (changeVersion === savingVersion) dirty = false;
    status(true, "Progress saved to your account");
    return true;
  }

  async function saveNow() {
    clearTimeout(writeTimer);
    if (writePromise) {
      writeAgain = true;
      return writePromise;
    }

    writePromise = performSave();
    const result = await writePromise;
    writePromise = undefined;

    const changedWhileSaving = writeAgain;
    writeAgain = false;

    // Only follow up immediately when the previous write succeeded and the
    // student made another change while it was in flight. When a write fails,
    // keep the dirty state for the scheduled/online retry instead of creating
    // an endless retry loop that can hold up navigation away from a course.
    if (result && changedWhileSaving && dirty) {
      return saveNow();
    }
    return result;
  }

  window.addEventListener("online", () => { if (dirty) void saveNow(); });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden" && dirty) void saveNow();
  });
  setInterval(() => { if (dirty) void saveNow(); }, 15000);

  return { connect, queueSave, saveNow, requireAccount };
})();
