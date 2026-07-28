(function () {
  "use strict";
  const COURSE_ID = "connect-plus-4-term-1";
  let options = {};
  let profile = null;
  let connected = false;

  function status(type, label) {
    options.onStatus?.({ type, label, signedIn: connected });
  }

  function mergeState(local, remote) {
    if (!remote || typeof remote !== "object") return local;
    const merged = { ...local, ...remote };
    merged.activities = { ...(local.activities || {}), ...(remote.activities || {}) };
    Object.keys(local.activities || {}).forEach((id) => {
      const a = local.activities[id], b = remote.activities?.[id];
      if (!b) return;
      const answers = { ...(a.answers || {}), ...(b.answers || {}) };
      merged.activities[id] = {
        ...a,
        ...b,
        answers,
        score: Math.max(Number(a.score || 0), Number(b.score || 0)),
        index: Math.max(Number(a.index || 0), Number(b.index || 0)),
        completed: Boolean(a.completed || b.completed),
      };
    });
    merged.pointAwards = { ...(local.pointAwards || {}), ...(remote.pointAwards || {}) };
    merged.rewards = { ...(local.rewards || {}), ...(remote.rewards || {}) };
    merged.badges = [...new Set([...(local.badges || []), ...(remote.badges || [])])];
    merged.xp = Math.max(Number(local.xp || 0), Number(remote.xp || 0));
    merged.coins = Math.max(Number(local.coins || 0), Number(remote.coins || 0));
    merged.stars = Math.max(Number(local.stars || 0), Number(remote.stars || 0));
    merged.updatedAt = Math.max(Number(local.updatedAt || 0), Number(remote.updatedAt || 0));
    return merged;
  }

  async function init() {
    const bridge = window.MrFaridCourseProgress;
    if (!bridge) {
      status("offline", "Platform connection is unavailable");
      return { signedIn: false };
    }
    const session = await bridge.requireAccount({
      loginUrl: new URL("../../../login/", window.location.href).href,
    });
    if (!session) return { signedIn: false };
    const client = bridge.getClient();
    const result = client
      ? await client.from("profiles").select("id,full_name,username,class_name,grade").eq("id", session.user.id).maybeSingle()
      : { data: null, error: null };
    profile = result.data || {
      id: session.user.id,
      full_name: session.user.user_metadata?.full_name || session.user.email || "Student",
      username: session.user.user_metadata?.username || "Student",
      class_name: session.user.user_metadata?.class_name || "",
      grade: session.user.user_metadata?.grade || "",
    };
    connected = true;
    options.onSession?.({
      signedIn: true,
      profile,
      studentCode: profile.username || profile.full_name,
      userId: session.user.id,
    });
    status("cloud", "Connecting your saved progress…");
    const resultProgress = await bridge.connect({
      courseId: COURSE_ID,
      getState: options.getState,
      setState: options.setState,
      mergeState,
      onReady: () => status("cloud", "Progress saved to your account"),
      onStatus: (info) => status(info.online ? "cloud" : "saving", info.message),
    });
    if (!resultProgress.connected) status("error", resultProgress.error || "Cloud progress needs attention");
    return { signedIn: true, profile, studentCode: profile.username || profile.full_name };
  }

  async function signOut() {
    await window.MrFaridCourseProgress?.getClient()?.auth.signOut();
    connected = false;
  }

  window.ConnectCloud = {
    configure(next) { options = next || {}; },
    init,
    available: () => Boolean(window.MrFaridCourseProgress),
    isSignedIn: () => connected,
    scheduleSync: () => window.MrFaridCourseProgress?.queueSave(),
    syncNow: () => window.MrFaridCourseProgress?.saveNow(),
    refreshAccess: async () => {},
    signOut,
    uploadAvatar: async () => { throw new Error("Profile pictures are managed from the student portal."); },
  };
})();
