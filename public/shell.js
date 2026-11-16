document.head.insertAdjacentHTML("beforeend", `<style>
#app{display:none;position:fixed;inset:0;z-index:5;overflow:auto;background:#f1f5f9}
.top{position:sticky;top:0;background:#0A2540;color:#fff;display:flex;align-items:center;gap:12px;padding:12px 16px;z-index:6}
.top button{width:auto;background:transparent;border:0;font-size:24px;padding:4px 8px;margin:0;color:#fff}
.top b{flex:1;font-size:18px}
#drawer{position:fixed;top:0;left:-290px;width:270px;height:100%;background:#0A2540;color:#fff;transition:left .25s;z-index:20;padding:20px 12px;box-sizing:border-box;overflow:auto}
#drawer.open{left:0}
#shade{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:15}
#shade.open{display:block}
.dh{color:#fff!important;font-size:20px!important;margin:0 0 18px 8px!important}
.mi{display:flex;align-items:center;gap:12px;padding:13px 14px;border-radius:12px;color:#cbd5e1;font-size:16px;cursor:pointer;margin:2px 0}
.mi.on{background:#2563eb;color:#fff}
#main{padding:16px;max-width:720px;margin:0 auto}
#main>div{background:#fff;border-radius:16px;padding:18px;margin-bottom:14px;box-shadow:0 1px 3px rgba(0,0,0,.08)}
body.dark #app{background:#0f172a}
body.dark #main>div{background:#1e293b;color:#e2e8f0}
</style>`);
const MENU = [
  { k: "home", i: "🏠", t: "Dashboard", r: "*" },
  { k: "schools", i: "🏫", t: "Dugsiyada", r: ["super_admin"] },
  { k: "students", i: "🎓", t: "Ardayda", r: ["school_admin"] },
  { k: "att", i: "✅", t: "Imaanshaha", r: ["school_admin"] },
  { k: "users", i: "👥", t: "Isticmaalayaasha", r: ["school_admin"] },
  { k: "exams", i: "📝", t: "Imtixaanka", r: ["school_admin"] },
  { k: "setup", i: "🏫", t: "Fasallada & Maaddooyinka", r: ["school_admin"] },
  { k: "reports", i: "📋", t: "Warbixinaha", r: ["school_admin", "super_admin"] },
  { k: "set", i: "⚙️", t: "Settings", r: "*" }
];
let me;
const card = h => { const d = document.createElement("div"); d.innerHTML = h; $("main").appendChild(d); };
const H = t => "<h1 style='font-size:18px;margin:0 0 10px'>" + t + "</h1>";
const SECT = {
  home: () => window.homeUI(),
  schools: async () => {
    const rows = await api("/api/schools");
    card(H("Dugsiyada") + rows.map(r => "<div class='row' data-sid='" + r.id + "' style='cursor:pointer'>" + esc(r.name) + (r.approved ? "<span class='tag'>Firfircoon</span>" : "<span class='tag'><button data-a='ok' data-id='" + r.id + "' style='width:auto;padding:6px 10px;margin:0 4px'>Ogolow</button><button data-a='no' data-id='" + r.id + "' style='width:auto;padding:6px 10px;margin:0;background:#dc2626'>Diid</button></span>") + "<div style='clear:both;font-size:13px;opacity:.8;margin-top:4px'>Arday " + esc(r.students) + " · Macalin " + esc(r.teachers) + " · Joogo " + esc(r.present_today) + " · Maqan " + esc(r.absent_today) + "</div></div>").join(""));
    document.querySelectorAll(".row[data-sid]").forEach(x => x.onclick = e => { if (!e.target.closest("button")) window.schoolDetail(x.dataset.sid); });
    document.querySelectorAll("button[data-a]").forEach(b => b.onclick = async () => {
      try { await api("/api/schools/" + b.dataset.id + (b.dataset.a === "ok" ? "/approve" : "/reject"), { method: b.dataset.a === "ok" ? "PATCH" : "DELETE" }); show("schools"); } catch (e) { alert(e.message); }
    });
  },
  students: () => window.studentsUI(false),
  att: async () => { await window.attendanceUI(false); await window.attReportUI(false); },
  res: () => window.resultsUI(),
  myatt: () => window.myAttUI(),
  users: () => window.usersUI(),
  exams: () => window.examsUI(),
  setup: () => window.setupUI(),
  reports: () => window.reportsUI(),
  set: () => window.settingsUI()
};
const toggle = o => { $("drawer").classList.toggle("open", o); $("shade").classList.toggle("open", o); };
async function show(k) {
  $("main").innerHTML = "";
  document.querySelectorAll(".mi[data-k]").forEach(x => x.classList.toggle("on", x.dataset.k === k));
  $("ttl").textContent = t(k); $("back").style.display = k === "home" ? "none" : "block";
  toggle(false);
  try { await SECT[k](); } catch (e) { card(esc(e.message)); }
}
function build() {
  const old = $("app"); if (old) old.remove();
  const a = document.createElement("div");
  a.id = "app";
  const items = MENU.filter(x => x.r === "*" || x.r.includes(me.role)).map(x => "<div class='mi' data-k='" + x.k + "'>" + x.i + " " + t(x.k) + "</div>").join("");
  a.innerHTML = "<div class='top'><button id='hb'>☰</button><button id='back' style='display:none'>←</button><b id='ttl'></b></div><div id='shade'></div><div id='drawer'><h1 class='dh'>🏫 Smart School</h1>" + items + "<div class='mi' id='lo'>🚪 " + t("out") + "</div></div><div id='main'></div>";
  document.body.appendChild(a);
  $("hb").onclick = () => toggle(true); $("back").onclick = () => show("home");
  $("shade").onclick = () => toggle(false);
  a.querySelectorAll(".mi[data-k]").forEach(x => x.onclick = () => show(x.dataset.k));
  $("lo").onclick = () => { localStorage.removeItem("t"); location.reload(); };
  $("box").style.display = "none";
  ["landing", "authshade"].forEach(i => { const e = $(i); if (e) e.remove(); });
  $("box").classList.remove("auth");
  a.style.display = "block";
}
async function dash() {
  try { me = await api("/api/me"); build(); show("home"); }
  catch (e) { localStorage.removeItem("t"); $("msg").textContent = e.message; }
}
if (token) dash();
