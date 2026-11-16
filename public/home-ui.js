document.head.insertAdjacentHTML("beforeend", `<style>
.hero{background:linear-gradient(135deg,#0A2540,#1d4ed8);color:#fff;border-radius:20px;padding:22px;margin-bottom:14px}
.hero h2{margin:0;font-size:22px}.hero p{margin:6px 0 0;opacity:.85;font-size:14px}
.sgrid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px}
.sc{background:#fff;border-radius:18px;padding:16px;box-shadow:0 2px 8px rgba(10,37,64,.08);cursor:pointer;transition:transform .1s}
.sc:active{transform:scale(.97)}
.sc b{display:block;font-size:30px;color:#0A2540}.sc span{font-size:13px;color:#475569}
body.dark .sc{background:#1e293b}body.dark .sc b{color:#f1f5f9}body.dark .sc span{color:#cbd5e1}
</style>`);
window.homeUI = async function () {
  if (me.role === "teacher") return window.teacherHome();
  const adm = me.role === "super_admin" || me.role === "school_admin";
  if (adm) window.welcomeHero("Soo dhawoow, " + (me.role === "super_admin" ? "Super Admin" : "Maamule"));
  else {
    const h = document.createElement("section");
    h.className = "hero";
    h.innerHTML = "<h2>" + t("welcome") + ", " + esc(me.full_name) + "</h2><p>" + esc(me.role) + "</p>";
    $("main").appendChild(h);
  }
  const st = me.role === "student" ? {} : await api("/api/stats");
  if (adm) { delete st.users; delete st.teachers; }
  const GO = { students: "students", active_students: "students", classes: "setup", present_today: "att", absent_today: "att" };
  const g = document.createElement("section");
  g.className = "sgrid";
  g.innerHTML = Object.keys(st).map(k => "<div class='sc' data-go='" + (me.role === "super_admin" ? "schools" : (GO[k] || "home")) + "'><b>" + esc(st[k]) + "</b><span>" + esc(L[k] || k) + "</span></div>").join("");
  $("main").appendChild(g);
  g.querySelectorAll(".sc").forEach(x => x.onclick = () => {
    const k = x.dataset.go;
    if (MENU.some(m => m.k === k && (m.r === "*" || m.r.includes(me.role)))) show(k);
  });
};
document.head.insertAdjacentHTML("beforeend", `<style>
#main .sgrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px;margin:18px 0}
#main .sc{position:relative;overflow:hidden;min-height:112px;padding:18px 15px;border:1px solid #e2e8f0;border-radius:20px;background:linear-gradient(145deg,#fff,#f1f5f9);box-shadow:0 5px 16px rgba(10,37,64,.09);transition:transform .2s,box-shadow .2s}
#main .sc:before{content:"";display:block;width:38px;height:4px;border-radius:8px;background:#E6C36A;margin-bottom:15px}
#main .sc:after{content:"";position:absolute;width:85px;height:85px;border-radius:50%;right:-35px;top:-35px;background:rgba(230,195,106,.13)}
#main .sc:active{transform:scale(.97)}
#main .sc b{position:relative;z-index:1;display:block;font-size:32px;font-weight:800;color:#0A2540;margin-bottom:7px}
#main .sc span{position:relative;z-index:1;display:block;font-size:13px;font-weight:600;color:#475569}
body.dark #main .sc{background:linear-gradient(145deg,#1e293b,#172554);border-color:#334155}
body.dark #main .sc b{color:#f8fafc}
body.dark #main .sc span{color:#cbd5e1}
@media(max-width:360px){#main .sgrid{gap:9px}#main .sc{padding:14px 11px}}
</style>`);

document.head.insertAdjacentHTML("beforeend", `<style>
#main .sc:nth-child(4n+1){background:linear-gradient(145deg,#123c70,#2563eb);border-color:#3b82f6}
#main .sc:nth-child(4n+2){background:linear-gradient(145deg,#064e4b,#0d9488);border-color:#14b8a6}
#main .sc:nth-child(4n+3){background:linear-gradient(145deg,#4c1d95,#7c3aed);border-color:#8b5cf6}
#main .sc:nth-child(4n){background:linear-gradient(145deg,#78350f,#d97706);border-color:#f59e0b}
#main .sc b{color:#fff!important;font-size:36px}
#main .sc span{color:#f8fafc!important}
#main .sc:before{background:#facc15;height:5px}
#main .sc:after{background:rgba(255,255,255,.09)}
</style>`);

document.head.insertAdjacentHTML("beforeend", `<style>
#main .sc:before{background:linear-gradient(90deg,#facc15,#fff1a8,#f59e0b)!important;width:55px;height:6px;border-radius:10px;box-shadow:0 0 10px rgba(250,204,21,.65)}
</style>`);

document.head.insertAdjacentHTML("beforeend", `<style>
#main .sc span:before{display:block;font-size:32px;margin-bottom:10px;content:"🏫"}
#main .sc:nth-child(4n+2) span:before{content:"⭐"}
#main .sc:nth-child(4n+3) span:before{content:"🎓"}
#main .sc:nth-child(4n) span:before{content:"⏳"}
</style>`);

document.head.insertAdjacentHTML("beforeend", `<style>
#main .sc{animation:cardEnter .65s cubic-bezier(.2,.8,.2,1) both;transition:transform .25s,box-shadow .25s}
#main .sc:nth-child(2){animation-delay:.08s}
#main .sc:nth-child(3){animation-delay:.16s}
#main .sc:nth-child(4){animation-delay:.24s}
#main .sc:active{transform:translateY(-4px) scale(.96);box-shadow:0 12px 24px rgba(0,0,0,.2)}
@keyframes cardEnter{from{opacity:0;transform:translateY(18px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
@media(prefers-reduced-motion:reduce){#main .sc{animation:none!important;transition:none!important}}
</style>`);
