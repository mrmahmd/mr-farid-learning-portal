window.MrFaridCourseProgress = (() => {
  const url = "https://tygekqfjytwbkvdkjcrg.supabase.co";
  const key = "sb_publishable_QiA5NUT4QgIZCyQL3eXEIQ_m0xw3FBP";
  let client;
  let userId;
  let appId;
  let readState;
  let writeTimer;

  async function connect({ courseId, getState, setState, mergeState, onReady }) {
    if (!window.supabase) return { connected: false };

    client = window.supabase.createClient(url, key, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
    });
    const { data: sessionData } = await client.auth.getSession();
    const session = sessionData.session;
    if (!session) return { connected: false };

    userId = session.user.id;
    appId = courseId;
    readState = getState;

    const { data, error } = await client
      .from("course_progress")
      .select("state")
      .eq("user_id", userId)
      .eq("app_id", appId)
      .maybeSingle();

    if (!error && data?.state) setState(mergeState(getState(), data.state));
    await saveNow();
    onReady?.();
    return { connected: !error };
  }

  function queueSave() {
    if (!client || !userId || !appId || !readState) return;
    clearTimeout(writeTimer);
    writeTimer = setTimeout(saveNow, 700);
  }

  async function saveNow() {
    if (!client || !userId || !appId || !readState) return;
    await client.from("course_progress").upsert(
      { user_id: userId, app_id: appId, state: readState(), updated_at: new Date().toISOString() },
      { onConflict: "user_id,app_id" },
    );
  }

  return { connect, queueSave, saveNow };
})();
