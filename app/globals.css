@import "tailwindcss";

:root {
  --navy: #071c45;
  --blue: #0e5dd8;
  --sky: #4ad8ff;
  --gold: #ffc844;
  --white: #f8fbff;
  --muted: #b9cae8;
}

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  color: var(--white);
  background: #061631;
  font-family: "Segoe UI", Tahoma, Arial, sans-serif;
}

a { color: inherit; text-decoration: none; }
button, input, select { font: inherit; }
button, a { -webkit-tap-highlight-color: transparent; }

.hero-page, .inner-page {
  min-height: 100svh;
  position: relative;
  overflow: hidden;
  background: #071c45 url("/hero-learning-world.png") center center / cover no-repeat;
}

.site-header {
  position: relative;
  z-index: 20;
  width: min(1480px, calc(100% - 64px));
  height: 94px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 36px;
  border-bottom: 1px solid rgba(255,255,255,.16);
}

.brand { display: flex; align-items: center; gap: 12px; justify-self: start; }
.brand-mark, .mini-logo {
  position: relative;
  width: 48px; height: 48px;
  display: grid; place-items: center;
  border-radius: 15px;
  color: #052052;
  font-weight: 900;
  letter-spacing: -2px;
  background: linear-gradient(145deg, #fff4a8, var(--gold));
  box-shadow: 0 10px 30px rgba(255,200,68,.28), inset 0 2px rgba(255,255,255,.7);
}
.brand-mark span { position: absolute; top: -8px; right: -7px; color: #fff; font-size: 15px; text-shadow: 0 0 14px var(--sky); }
.brand-portrait { overflow: visible; padding: 3px; }
.brand-portrait img {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 12px;
  object-fit: cover;
  object-position: center 34%;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.45);
}
.brand-name { display: flex; flex-direction: column; }
.brand-name strong { font-size: 16px; letter-spacing: .2px; }
.brand-name small { margin-top: 2px; color: var(--muted); font-size: 10px; letter-spacing: .8px; text-transform: uppercase; }

.desktop-nav { display: flex; align-items: center; justify-content: center; justify-self: center; gap: 9px; direction: ltr; }
.desktop-nav a { padding: 10px 13px; border: 1px solid rgba(255,255,255,.13); border-radius: 12px; background: rgba(255,255,255,.055); backdrop-filter: blur(10px); white-space: nowrap; }
.desktop-nav a, .nav-login { color: #dce9ff; font-size: 13px; font-weight: 700; transition: .2s ease; }
.desktop-nav a:hover { color: #08214d; border-color: rgba(255,220,112,.85); background: var(--gold); transform: translateY(-1px); }
.nav-login:hover { color: var(--gold); }
.header-actions { display: flex; align-items: center; justify-self: end; gap: 17px; }
.nav-create {
  padding: 12px 18px;
  border: 1px solid rgba(255,255,255,.35);
  border-radius: 14px;
  background: rgba(255,255,255,.1);
  backdrop-filter: blur(12px);
  font-size: 13px;
  font-weight: 750;
  transition: .2s ease;
}
.nav-create:hover { background: white; color: var(--navy); transform: translateY(-1px); }
.mobile-menu { display: none; position: relative; }
.mobile-menu summary { list-style: none; cursor: pointer; font-size: 25px; }
.mobile-menu-panel { position: absolute; right: 0; top: 44px; min-width: 230px; padding: 14px; display: grid; gap: 8px; background: rgba(5,24,59,.96); border: 1px solid rgba(255,255,255,.2); border-radius: 18px; box-shadow: 0 25px 50px rgba(0,0,0,.35); }
.mobile-menu-panel a { padding: 10px 12px; border-radius: 10px; }
.mobile-menu-panel a:hover { background: rgba(255,255,255,.1); }

.hero-shade, .inner-shade {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, rgba(4,16,43,.28) 0%, rgba(4,16,43,0) 48%, rgba(4,15,42,.36) 100%);
}

.hero-content {
  position: relative;
  z-index: 5;
  min-height: calc(100svh - 94px);
  width: min(1380px, calc(100% - 80px));
  margin: 0 auto;
  padding: 64px 0 92px;
  display: grid;
  grid-template-columns: 1fr 470px;
  align-items: center;
  gap: 70px;
}

.hero-copy { max-width: 580px; align-self: start; padding-top: 54px; text-shadow: 0 3px 22px rgba(0,0,0,.48); }
.eyebrow { display: flex; align-items: center; gap: 10px; color: #e4edff; font-size: 12px; font-weight: 800; letter-spacing: 2.2px; text-transform: uppercase; }
.eyebrow span { width: 31px; height: 3px; border-radius: 5px; background: var(--gold); box-shadow: 0 0 14px var(--gold); }
.hero-copy h1 { max-width: 560px; margin: 18px 0; font-size: clamp(46px, 5.8vw, 84px); line-height: .96; letter-spacing: -4px; font-weight: 800; }
.hero-copy h1 strong { display: block; color: var(--gold); font-weight: 900; }
.hero-intro { max-width: 490px; color: #e8f1ff; font-size: 17px; line-height: 1.65; }
.curriculum-pills { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 26px; }
.curriculum-pills span { padding: 9px 14px; border: 1px solid rgba(255,255,255,.27); border-radius: 999px; background: rgba(4,25,65,.35); backdrop-filter: blur(10px); font-size: 12px; font-weight: 700; }

.glass-card, .wide-glass-card, .teacher-card, .about-card {
  border: 1px solid rgba(255,255,255,.3);
  background: linear-gradient(145deg, rgba(10,40,91,.68), rgba(4,17,49,.58));
  box-shadow: 0 28px 80px rgba(0,8,27,.48), inset 0 1px rgba(255,255,255,.22);
  backdrop-filter: blur(24px) saturate(130%);
}
.glass-card { border-radius: 32px; }
.login-card {
  align-self: center;
  padding: 34px 38px 30px;
  border-color: rgba(255,255,255,.46);
  background: linear-gradient(145deg, rgba(20,66,126,.28), rgba(3,16,45,.16));
  box-shadow: 0 28px 80px rgba(0,8,27,.32), inset 0 1px rgba(255,255,255,.34);
  backdrop-filter: blur(13px) saturate(135%);
}
.login-card .input-shell { background: rgba(2,15,43,.28); border-color: rgba(255,255,255,.28); }
.login-card .secondary-button { background: rgba(255,255,255,.04); border-color: rgba(255,255,255,.34); }
.card-heading, .form-title { display: flex; align-items: center; gap: 14px; margin-bottom: 26px; }
.mini-logo { width: 46px; height: 46px; border-radius: 14px; }
.card-heading p, .form-title p { margin: 0 0 2px; color: var(--sky); font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; }
.card-heading h2, .form-title h2 { margin: 0; font-size: 25px; letter-spacing: -.7px; }
.field-label, .account-form label, .standalone-form label { display: block; margin: 14px 0 8px; color: #e7effe; font-size: 12px; font-weight: 750; }
.label-row { display: flex; align-items: flex-end; justify-content: space-between; }
.quiet-link { color: var(--sky); font-size: 11px; }
.input-shell { height: 49px; display: flex; align-items: center; gap: 10px; padding: 0 15px; border: 1px solid rgba(255,255,255,.2); border-radius: 14px; background: rgba(1,14,42,.44); transition: .2s ease; }
.input-shell:focus-within { border-color: var(--sky); box-shadow: 0 0 0 3px rgba(74,216,255,.12); }
.input-shell span { color: var(--gold); font-size: 10px; }
.input-shell input { width: 100%; border: 0; outline: 0; color: white; background: transparent; font-size: 13px; }
input::placeholder { color: #8ca2c4; }
.primary-button, .secondary-button {
  min-height: 50px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-weight: 850;
  cursor: pointer;
  transition: .22s ease;
}
.primary-button { margin-top: 22px; color: #08214d; border: 0; background: linear-gradient(135deg, #ffe27a, var(--gold)); box-shadow: 0 12px 30px rgba(255,190,39,.24); }
.primary-button:hover { transform: translateY(-2px); box-shadow: 0 16px 36px rgba(255,190,39,.35); }
.secondary-button { color: white; border: 1px solid rgba(255,255,255,.28); background: rgba(255,255,255,.07); }
.secondary-button:hover { background: rgba(255,255,255,.16); }
.divider { display: flex; align-items: center; gap: 10px; margin: 19px 0; color: #9eb2d2; font-size: 10px; text-align: center; }
.divider::before, .divider::after { content: ""; flex: 1; height: 1px; background: rgba(255,255,255,.14); }
.privacy-note { margin: 18px 0 0; color: #8fa5c7; font-size: 10px; text-align: center; }

.hero-footer { position: absolute; z-index: 6; left: 5%; bottom: 28px; display: flex; align-items: center; gap: 13px; color: rgba(255,255,255,.72); font-size: 10px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; }
.hero-footer i { width: 4px; height: 4px; border-radius: 50%; background: var(--gold); }
.social-links { display: flex; gap: 12px; }
.social-floating { position: fixed; z-index: 30; right: 22px; bottom: 22px; flex-direction: column; }
.social-button { position: relative; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; gap: 9px; border: 1px solid rgba(255,255,255,.38); border-radius: 16px; color: white; box-shadow: 0 12px 25px rgba(0,0,0,.27); transition: .2s ease; }
.social-button svg { width: 25px; height: 25px; fill: currentColor; }
.social-button.whatsapp { background: #23c968; }
.social-button.facebook { background: #1877f2; }
.social-button:hover { transform: translateY(-3px) scale(1.04); }
.social-links:not(.social-floating) .social-button { width: auto; min-width: 150px; padding: 0 20px; }
.social-tooltip { position: absolute; right: 59px; padding: 7px 10px; border-radius: 8px; background: rgba(4,14,38,.92); opacity: 0; pointer-events: none; transform: translateX(6px); transition: .2s ease; font-size: 11px; font-weight: 700; white-space: nowrap; }
.social-button:hover .social-tooltip { opacity: 1; transform: translateX(0); }

.inner-page { overflow: auto; }
.inner-shade { background: linear-gradient(rgba(3,14,38,.72), rgba(3,14,38,.88)); }
.inner-content { position: relative; z-index: 5; width: min(1240px, calc(100% - 48px)); min-height: calc(100svh - 94px); margin: 0 auto; padding: 54px 0; display: grid; place-items: center; }
.wide-glass-card { width: 100%; display: grid; grid-template-columns: .9fr 1.1fr; overflow: hidden; border-radius: 34px; }
.form-intro { padding: 50px; background: linear-gradient(145deg, rgba(18,85,180,.52), rgba(6,35,84,.25)); }
.form-intro h1, .about-card h1, .teacher-copy h1 { margin: 16px 0; font-size: clamp(34px, 4vw, 58px); line-height: 1.05; letter-spacing: -2px; }
.form-intro > p:not(.eyebrow), .lead { color: #d9e7ff; line-height: 1.7; }
.benefit-list { margin: 32px 0 0; padding: 0; list-style: none; display: grid; gap: 18px; }
.benefit-list li { display: flex; align-items: center; gap: 15px; }
.benefit-list b { width: 38px; height: 38px; display: grid; place-items: center; border-radius: 12px; color: var(--navy); background: var(--gold); }
.benefit-list span { display: flex; flex-direction: column; }
.benefit-list small { margin-top: 3px; color: var(--muted); }
.account-form { padding: 44px 50px; background: rgba(3,18,49,.54); }
.account-form input, .account-form select, .standalone-form input { width: 100%; height: 49px; padding: 0 15px; border: 1px solid rgba(255,255,255,.2); border-radius: 13px; outline: none; color: white; background: rgba(0,12,37,.45); }
.account-form select { cursor: pointer; color-scheme: dark; }
.account-form input:focus, .account-form select:focus, .standalone-form input:focus { border-color: var(--sky); box-shadow: 0 0 0 3px rgba(74,216,255,.1); }
.field-help { margin: 7px 0 0; color: #9fb5d5; font-size: 10px; }
.two-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
.form-message { margin: 14px 0 0; padding: 11px 13px; border-radius: 11px; color: #c9fce0; background: rgba(35,201,104,.14); font-size: 12px; line-height: 1.5; }
.form-switch { margin: 18px 0 0; color: var(--muted); font-size: 12px; text-align: center; }
.form-switch a { color: var(--gold); font-weight: 800; }
.standalone-form { width: min(470px, 100%); padding: 40px; }
.centered-title { justify-content: center; text-align: left; }
.centered-title h1 { margin: 0; font-size: 27px; }

.teacher-card { width: 100%; display: grid; grid-template-columns: 380px 1fr; gap: 50px; padding: 42px; border-radius: 35px; }
.teacher-portrait-placeholder { min-height: 490px; display: grid; place-content: center; gap: 8px; border: 1px solid rgba(255,255,255,.25); border-radius: 27px; text-align: center; background: radial-gradient(circle at 50% 35%, rgba(74,216,255,.3), transparent 45%), linear-gradient(145deg, #164e9c, #09214d); }
.teacher-portrait-placeholder span { font-size: 86px; font-weight: 900; color: var(--gold); letter-spacing: -8px; }
.teacher-portrait-placeholder small { color: var(--muted); text-transform: uppercase; letter-spacing: 2px; }
.teacher-copy { align-self: center; }
.teacher-copy > p:not(.eyebrow) { color: #c8d8f0; line-height: 1.75; }
.contact-block { margin-top: 28px; padding-top: 25px; border-top: 1px solid rgba(255,255,255,.15); }
.contact-block > strong { font-size: 20px; }
.contact-block > p { color: var(--muted); font-size: 13px; }
.teacher-profile-card {
  width: 100%;
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 44px;
  padding: 38px;
  border: 1px solid rgba(255,255,255,.28);
  border-radius: 35px;
  background: linear-gradient(145deg, rgba(8,40,91,.78), rgba(3,17,48,.67));
  box-shadow: 0 28px 80px rgba(0,8,27,.46), inset 0 1px rgba(255,255,255,.2);
  backdrop-filter: blur(24px) saturate(130%);
}
.teacher-visual { display: flex; flex-direction: column; gap: 16px; }
.teacher-photo-frame { position: relative; min-height: 480px; overflow: hidden; border: 1px solid rgba(255,255,255,.27); border-radius: 28px; background: var(--gold); box-shadow: 0 22px 45px rgba(0,0,0,.25); }
.teacher-photo-frame::after { content: ""; position: absolute; inset: auto 0 0; height: 37%; background: linear-gradient(transparent, rgba(4,18,48,.83)); pointer-events: none; }
.teacher-photo-frame img { width: 100%; height: 100%; min-height: 480px; display: block; object-fit: cover; object-position: center; }
.teacher-status { position: absolute; z-index: 2; left: 20px; right: 20px; bottom: 18px; display: flex; align-items: center; justify-content: center; gap: 8px; color: white; font-size: 12px; font-weight: 800; }
.teacher-status i { width: 8px; height: 8px; border-radius: 50%; background: #39de7d; box-shadow: 0 0 13px #39de7d; }
.teacher-contact-panel { padding: 18px; border: 1px solid rgba(255,255,255,.14); border-radius: 21px; background: rgba(255,255,255,.06); }
.teacher-contact-panel > small { display: block; margin-bottom: 12px; color: var(--muted); font-size: 9px; font-weight: 800; letter-spacing: 1.5px; text-align: center; }
.teacher-contact-panel .social-links { justify-content: center; }
.teacher-contact-panel .social-button { min-width: 0; width: 48px; padding: 0; }
.teacher-contact-panel .social-button > span { display: none; }
.teacher-profile-copy { align-self: center; }
.teacher-profile-copy h1 { margin: 15px 0 8px; font-size: clamp(42px, 5vw, 68px); line-height: 1; letter-spacing: -2.7px; }
.teacher-titles { display: flex; flex-direction: column; gap: 5px; padding-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,.15); }
.teacher-titles strong { color: var(--gold); font-size: 19px; }
.teacher-titles span { color: #dbe8fb; font-size: 14px; }
.profile-detail-grid { margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 13px; }
.profile-detail-grid article { min-height: 138px; padding: 17px; display: flex; gap: 12px; border: 1px solid rgba(255,255,255,.12); border-radius: 19px; background: rgba(255,255,255,.055); }
.profile-detail-grid article > b { width: 37px; height: 37px; flex: 0 0 auto; display: grid; place-items: center; border-radius: 11px; color: #09214b; background: var(--gold); font-size: 10px; }
.profile-detail-grid h2 { margin: 1px 0 7px; font-size: 14px; }
.profile-detail-grid p { margin: 0; color: var(--muted); font-size: 11px; line-height: 1.55; }
.teacher-mission { margin: 15px 0 0; padding: 18px 22px; border-left: 3px solid var(--gold); border-radius: 4px 17px 17px 4px; background: rgba(255,200,68,.09); }
.teacher-mission small { color: var(--gold); font-size: 9px; font-weight: 900; letter-spacing: 1.7px; }
.teacher-mission p { margin: 7px 0 0; color: #f6f9ff; font-size: 15px; font-weight: 650; line-height: 1.55; }
.about-card { width: 100%; padding: 52px; border-radius: 35px; }
.about-card > h1 { max-width: 850px; }
.about-card > .lead { max-width: 800px; }
.creator-credit { width: fit-content; margin-top: 25px; padding: 11px 18px 11px 11px; display: flex; align-items: center; gap: 13px; border: 1px solid rgba(255,255,255,.3); border-radius: 18px; background: rgba(255,255,255,.08); }
.creator-credit img { width: 54px; height: 54px; border-radius: 14px; object-fit: cover; border: 2px solid var(--gold); }
.creator-credit div { display: flex; flex-direction: column; }
.creator-credit small { color: var(--gold); font-size: 8px; font-weight: 900; letter-spacing: 1.5px; }
.creator-credit strong { margin-top: 3px; font-size: 15px; }
.creator-credit span { margin-top: 2px; color: var(--muted); font-size: 10px; }
.feature-grid { margin-top: 35px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.feature-grid article { min-height: 210px; padding: 24px; border: 1px solid rgba(255,255,255,.14); border-radius: 22px; background: rgba(255,255,255,.06); }
.feature-grid b { color: var(--gold); font-size: 13px; }
.feature-grid h2 { margin: 28px 0 10px; font-size: 19px; }
.feature-grid p { margin: 0; color: var(--muted); font-size: 13px; line-height: 1.55; }

.curricula-card {
  width: 100%;
  padding: 44px;
  border: 1px solid rgba(255,255,255,.24);
  border-radius: 35px;
  background: linear-gradient(145deg, rgba(8,38,88,.77), rgba(3,17,48,.67));
  box-shadow: 0 28px 80px rgba(0,8,27,.4), inset 0 1px rgba(255,255,255,.2);
  backdrop-filter: blur(22px) saturate(125%);
}
.curricula-heading { max-width: 760px; margin-bottom: 30px; }
.curricula-heading .eyebrow { justify-content: flex-start; }
.curricula-heading h1 { margin: 12px 0; font-size: clamp(35px, 4vw, 56px); letter-spacing: -1.5px; }
.curricula-heading > p:not(.eyebrow) { margin: 0; color: #cbdaf1; line-height: 1.8; }
.grade-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
.grade-card { padding: 20px; border: 1px solid rgba(255,255,255,.14); border-radius: 24px; background: rgba(255,255,255,.055); }
.grade-card-active { border-color: rgba(255,200,68,.46); box-shadow: inset 0 0 30px rgba(255,200,68,.05); }
.grade-card header { display: flex; align-items: center; gap: 12px; margin-bottom: 17px; }
.grade-number { width: 48px; height: 48px; display: grid; place-items: center; flex: 0 0 auto; border-radius: 15px; color: #08214d; background: linear-gradient(145deg, #fff0a3, var(--gold)); font-weight: 900; }
.grade-card header div { margin-left: auto; }
.grade-card header small { color: var(--muted); font-size: 10px; }
.grade-card h2 { margin: 2px 0 0; font-size: 20px; direction: ltr; }
.starting-badge { padding: 7px 10px; border-radius: 999px; color: #baffd1; background: rgba(35,201,104,.16); font-size: 10px; white-space: nowrap; }
.curriculum-options { display: grid; gap: 9px; }
.curriculum-option { min-height: 67px; padding: 10px 12px; display: flex; align-items: center; gap: 12px; border: 1px solid rgba(255,255,255,.12); border-radius: 17px; background: rgba(0,13,40,.3); direction: ltr; }
.curriculum-option .book-icon { width: 40px; height: 44px; display: grid; place-items: center; flex: 0 0 auto; border-radius: 9px 13px 13px 9px; color: white; font-size: 12px; font-weight: 900; box-shadow: inset 4px 0 rgba(255,255,255,.18); }
.english-option .book-icon { background: linear-gradient(145deg, #25a7ff, #0b5ed3); }
.connect-option .book-icon { background: linear-gradient(145deg, #ff8057, #e34267); }
.curriculum-option div { display: flex; flex-direction: column; min-width: 0; }
.curriculum-option strong { font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.curriculum-option small { margin-top: 3px; color: var(--muted); font-size: 10px; }
.curriculum-option i { margin-left: auto; color: var(--gold); font-style: normal; font-size: 18px; }

.student-curricula-card {
  width: 100%;
  padding: 44px;
  border: 1px solid rgba(255,255,255,.26);
  border-radius: 35px;
  background: linear-gradient(145deg, rgba(8,38,88,.78), rgba(3,17,48,.7));
  box-shadow: 0 28px 80px rgba(0,8,27,.42), inset 0 1px rgba(255,255,255,.2);
  backdrop-filter: blur(22px) saturate(125%);
}
.student-welcome { display: flex; align-items: center; justify-content: space-between; gap: 30px; margin-bottom: 30px; }
.student-welcome h1 { margin: 13px 0 10px; font-size: clamp(34px, 4vw, 54px); line-height: 1.08; letter-spacing: -1.5px; }
.student-welcome > div > p:not(.eyebrow) { margin: 0; color: #cbdaf1; line-height: 1.7; }
.student-grade-badge { min-width: 120px; padding: 18px; display: flex; flex-direction: column; align-items: center; border: 1px solid rgba(255,200,68,.4); border-radius: 22px; color: var(--gold); background: rgba(255,200,68,.1); font-size: 18px; font-weight: 900; }
.student-grade-badge small { margin-bottom: 4px; color: #d9e6fb; font-size: 9px; font-weight: 700; letter-spacing: 1px; }
.student-curriculum-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.student-curriculum { min-height: 295px; padding: 24px; display: grid; grid-template-columns: 145px 1fr; gap: 22px; align-items: center; border: 1px solid rgba(255,255,255,.16); border-radius: 27px; background: rgba(255,255,255,.06); }
.curriculum-book-cover { height: 220px; padding: 18px 14px; display: flex; flex-direction: column; justify-content: center; align-items: center; border-radius: 10px 23px 23px 10px; box-shadow: inset 8px 0 rgba(255,255,255,.14), 0 18px 35px rgba(0,0,0,.22); }
.english-student-card .curriculum-book-cover { background: linear-gradient(145deg, #36c8ff, #0a56c8); }
.connect-student-card .curriculum-book-cover { background: linear-gradient(145deg, #ff8759, #d73576); }
.curriculum-book-cover span { font-size: 18px; font-weight: 900; }
.curriculum-book-cover b { margin: 6px 0; color: var(--gold); font-size: 64px; line-height: 1; }
.curriculum-book-cover small { letter-spacing: 2px; }
.student-curriculum-copy { align-self: center; }
.availability-dot { color: #aaffca; font-size: 9px; font-weight: 800; letter-spacing: .6px; }
.availability-dot::before { content: ""; width: 7px; height: 7px; margin-right: 7px; display: inline-block; border-radius: 50%; background: #36dc7b; box-shadow: 0 0 10px #36dc7b; }
.student-curriculum-copy h2 { margin: 11px 0 8px; font-size: 24px; }
.student-curriculum-copy p { margin: 0; color: var(--muted); font-size: 12px; line-height: 1.65; }
.student-curriculum-copy button { width: 100%; min-height: 45px; margin-top: 18px; padding: 0 16px; display: flex; justify-content: space-between; align-items: center; border: 0; border-radius: 13px; color: #08214d; background: linear-gradient(135deg, #ffe27a, var(--gold)); font-weight: 850; cursor: pointer; }
.student-access-note { margin: 22px 0 0; color: #9fb2cf; font-size: 11px; text-align: center; }
.student-access-note a { color: var(--gold); font-weight: 800; }

/* Shared liquid-glass treatment across every information surface. */
.glass-card,
.wide-glass-card,
.teacher-card,
.about-card,
.teacher-profile-card,
.curricula-card,
.student-curricula-card,
.grade-card,
.curriculum-option,
.student-curriculum,
.profile-detail-grid article,
.feature-grid article,
.teacher-contact-panel,
.creator-credit,
.mobile-menu-panel {
  border-color: rgba(255,255,255,.34);
  background:
    radial-gradient(circle at 8% 0%, rgba(255,255,255,.2), transparent 32%),
    linear-gradient(135deg, rgba(255,255,255,.115), rgba(5,31,76,.2) 46%, rgba(255,255,255,.055));
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.4),
    inset 0 -1px 0 rgba(255,255,255,.07),
    0 22px 55px rgba(0,9,31,.28);
  backdrop-filter: blur(18px) saturate(155%);
  -webkit-backdrop-filter: blur(18px) saturate(155%);
}
.login-card {
  background:
    radial-gradient(circle at 12% 0%, rgba(255,255,255,.22), transparent 34%),
    linear-gradient(145deg, rgba(255,255,255,.11), rgba(4,24,61,.15));
  backdrop-filter: blur(12px) saturate(155%);
  -webkit-backdrop-filter: blur(12px) saturate(155%);
}
.form-intro { background: linear-gradient(145deg, rgba(39,121,216,.18), rgba(255,255,255,.055)); }
.account-form { background: rgba(2,17,48,.13); }
.input-shell,
.login-card .input-shell,
.account-form input,
.account-form select,
.standalone-form input {
  color: #fff;
  border-color: rgba(255,255,255,.3);
  background: rgba(0,14,43,.3);
  box-shadow: inset 0 1px rgba(255,255,255,.07);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.inner-shade { background: linear-gradient(rgba(3,14,38,.56), rgba(3,14,38,.7)); }
.teacher-profile-copy,
.curricula-heading,
.student-welcome,
.about-card,
.form-intro,
.account-form,
.standalone-form { text-shadow: 0 2px 12px rgba(0,8,28,.5); }
.profile-detail-grid p,
.feature-grid p,
.curricula-heading > p:not(.eyebrow),
.student-welcome > div > p:not(.eyebrow),
.student-curriculum-copy p,
.teacher-profile-copy p,
.form-intro > p:not(.eyebrow) { color: #dce8fa; }

@media (max-width: 1100px) {
  .site-header { gap: 20px; }
  .desktop-nav { gap: 7px; }
  .desktop-nav a { font-size: 12px; }
  .header-actions { display: none; }
  .hero-content { grid-template-columns: 1fr 420px; gap: 30px; }
  .hero-copy h1 { font-size: 58px; }
  .feature-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 820px) {
  .site-header { width: calc(100% - 32px); height: 78px; grid-template-columns: 1fr auto; }
  .brand-name small, .header-actions { display: none; }
  .desktop-nav { display: none; }
  .mobile-menu { display: block; justify-self: end; }
  .hero-page, .inner-page { background-position: 34% center; }
  .hero-shade { background: linear-gradient(rgba(3,15,40,.25), rgba(3,15,40,.84) 50%, rgba(3,15,40,.96)); }
  .hero-content { width: calc(100% - 32px); min-height: auto; padding: 32px 0 94px; grid-template-columns: 1fr; }
  .hero-copy { padding-top: 10px; align-self: auto; }
  .hero-copy h1 { font-size: clamp(43px, 13vw, 66px); letter-spacing: -2.7px; }
  .login-card { width: min(100%, 470px); justify-self: center; }
  .hero-footer { display: none; }
  .wide-glass-card, .teacher-card, .teacher-profile-card { grid-template-columns: 1fr; }
  .form-intro, .account-form { padding: 34px 26px; }
  .teacher-card { padding: 22px; gap: 22px; }
  .teacher-profile-card { padding: 22px; gap: 24px; }
  .teacher-photo-frame, .teacher-photo-frame img { min-height: 420px; }
  .teacher-visual { max-width: 430px; width: 100%; margin: 0 auto; }
  .teacher-portrait-placeholder { min-height: 310px; }
  .grade-grid { grid-template-columns: 1fr; }
  .student-curriculum-grid { grid-template-columns: 1fr; }
}

@media (max-width: 560px) {
  .brand-name strong { font-size: 14px; }
  .brand-mark { width: 42px; height: 42px; }
  .hero-content { gap: 20px; }
  .hero-intro { font-size: 15px; }
  .login-card, .standalone-form { padding: 27px 22px; border-radius: 24px; }
  .social-floating { right: 12px; bottom: 12px; }
  .social-button { width: 44px; height: 44px; border-radius: 14px; }
  .inner-content { width: calc(100% - 24px); padding: 28px 0 78px; }
  .two-columns, .feature-grid { grid-template-columns: 1fr; }
  .about-card { padding: 28px 22px; }
  .curricula-card { padding: 28px 18px; }
  .student-curricula-card { padding: 28px 18px; }
  .student-welcome { align-items: flex-start; }
  .student-grade-badge { min-width: 95px; padding: 12px; }
  .student-curriculum { grid-template-columns: 92px 1fr; padding: 16px; gap: 14px; min-height: 230px; }
  .curriculum-book-cover { height: 175px; padding: 10px; }
  .curriculum-book-cover b { font-size: 44px; }
  .student-curriculum-copy h2 { font-size: 18px; }
  .feature-grid article { min-height: 0; }
  .social-links:not(.social-floating) { flex-direction: column; }
  .teacher-contact-panel .social-links { flex-direction: row; }
  .profile-detail-grid { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; transition: none !important; }
}
