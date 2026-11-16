(function () {
  if (localStorage.getItem("t")) return;
  const HEADS = ["Waxbarashadu Waa Furaha Mustaqbalka", "Education Is The Foundation Of Development", "Knowledge Today, Leadership Tomorrow"];
  const V1 = "Waxbarashadu waa saldhigga horumarka bulshada. Waxay qofka siisaa aqoon, xirfad iyo awood uu ku dhiso mustaqbalkiisa. Bulsho waxbaratay waa bulsho leh horumar, nabad iyo mustaqbal wanaagsan.";
  const V2 = "Education is the foundation of social development. It empowers individuals with knowledge, skills and opportunities to build a better future.";
  const TX = {
    so: { sub: "Xafiiska Waxbarashada Degmada Xamaro", login: "Gal", signup: "Is-diiwaangeli", pill: "KU SOO DHAWOW XAMARO EDU", cta: "Bilow hadda", vt: "QIIMAHA WAXBARASHADA", msgs: ["Aqoontu waa iftiinka bulshada.", "Waxbarashaduna waa jidka horumarka.", "Waxbarasho maanta, horumar berri."] },
    am: { sub: "የሐማሮ ወረዳ ትምህርት ጽሕፈት ቤት", login: "ግባ", signup: "ይመዝገቡ", pill: "ወደ XAMARO EDU እንኳን በደህና መጡ", cta: "አሁን ይጀምሩ", vt: "የትምህርት ጥቅም", msgs: ["እውቀት የማህበረሰብ ብርሃን ነው።", "ትምህርት የእድገት መንገድ ነው።", "ዛሬ ተማር፣ ነገ እደግ።"] },
    en: { sub: "Xamaro District Education Office", login: "Login", signup: "Sign Up", pill: "WELCOME TO XAMARO EDU", cta: "Get started", vt: "THE VALUE OF EDUCATION", msgs: ["Knowledge is the light of society.", "Education is the path to progress.", "Learn today, progress tomorrow."] }
  };
  const IC = "<svg width='30' height='30' viewBox='0 0 24 24' fill='none' stroke='#E6C36A' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'>";
  const ICONS = IC + "<path d='M2 5h7a3 3 0 0 1 3 3v11a2 2 0 0 0-2-2H2z M22 5h-7a3 3 0 0 0-3 3v11a2 2 0 0 1 2-2h8z'/></svg>" + IC + "<path d='M2 9l10-5 10 5-10 5z M6 11v5c3 2 9 2 12 0v-5'/></svg>" + IC + "<circle cx='12' cy='12' r='9'/><path d='M3 12h18 M12 3c3 3 3 15 0 18 M12 3c-3 3-3 15 0 18'/></svg>";
  const root = document.createElement("div");
  root.id = "landing";
  document.body.appendChild(root);
  function render() {
    const x = TX[LANG] || TX.so;
    root.innerHTML = "<nav class='ln-nav'><img class='ln-logo' src='/logo.png' alt='XAMARO EDU'><div class='ln-brand'>XAMARO EDU</div>" +
      "<button class='ln-btn' id='lnl'>" + x.login + "</button><button class='ln-btn gold' id='lns'>" + x.signup + "</button><button class='ln-btn' id='lng'>" + ({ so: "አማ", am: "EN", en: "SO" }[LANG] || "አማ") + "</button></nav>" +
      "<section class='ln-hero'><img class='ln-hlogo' src='/logo.png' alt=''><br><span class='ln-pill'>" + x.pill + "</span><div class='ln-h1'><span></span><i></i></div><div class='ln-msg' id='lnm'></div>" +
      "<div class='ln-cta'><button class='ln-btn gold' id='lnc'>" + x.cta + "</button></div><div class='ln-img' id='lni'><img src='/hero.jpg' alt=''></div></section>" +
      "<section class='ln-val ln-rise'><h2>" + x.vt + "</h2><p>" + V1 + "</p><p class='en'>" + V2 + "</p><div class='ln-icons'>" + ICONS + "</div></section>" +
      "<footer class='ln-foot'><b>© Xamaro District Education Office</b><br>Erer Region · Somali Regional State · Ethiopia</footer>";
  }
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let hi = 0, ci = 0, mi = 0, t1, t2;
  function typer() {
    const el = root.querySelector(".ln-h1 span");
    if (!el || !root.isConnected) return;
    const full = HEADS[hi % HEADS.length];
    if (reduce) { el.textContent = full; hi++; t1 = setTimeout(typer, 5000); return; }
    ci++; el.textContent = full.slice(0, ci);
    if (ci >= full.length) { ci = 0; hi++; t1 = setTimeout(typer, 2600); } else t1 = setTimeout(typer, 55);
  }
  function carousel() {
    clearInterval(t2);
    const set = () => { const m = $("lnm"); if (m) m.textContent = (TX[LANG] || TX.so).msgs[mi % 3]; };
    set();
    t2 = setInterval(() => {
      const m = $("lnm");
      if (!m || !root.isConnected) return clearInterval(t2);
      m.classList.add("out");
      setTimeout(() => { mi++; set(); m.classList.remove("out"); }, 500);
    }, 4500);
  }
  const shade = document.createElement("div");
  shade.id = "authshade";
  document.body.appendChild(shade);
  const xb = document.createElement("button");
  xb.className = "ln-x"; xb.textContent = "✕";
  $("box").insertBefore(xb, $("box").firstChild);
  const closeA = () => { $("box").classList.remove("auth"); shade.style.display = "none"; };
  const openA = s => { $("box").classList.add("auth"); shade.style.display = "block"; if (typeof sf !== "undefined") sf.style.display = s ? "block" : "none"; };
  xb.onclick = closeA; shade.onclick = closeA;
  function bind() {
    $("lnl").onclick = () => openA(false);
    $("lns").onclick = () => openA(true);
    $("lnc").onclick = () => openA(false);
    $("lng").onclick = () => { setLang(({ so: "am", am: "en", en: "so" })[LANG] || "so"); start(); };
    const img = root.querySelector(".ln-img img");
    img.onerror = () => { img.remove(); $("lni").innerHTML = ICONS; $("lni").querySelectorAll("svg").forEach(s => { s.setAttribute("width", 52); s.setAttribute("height", 52); }); };
    root.querySelectorAll(".ln-logo,.ln-hlogo").forEach(g => { g.onerror = () => { g.style.display = "none"; }; });
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) en.target.classList.add("in"); }), { root: root, threshold: 0.2 });
    root.querySelectorAll(".ln-rise").forEach(el => io.observe(el));
  }
  function start() { clearTimeout(t1); render(); bind(); ci = 0; typer(); carousel(); }
  $("box").style.display = "none";
  start();
})();
