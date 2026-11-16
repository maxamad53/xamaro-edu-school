const DICT = {
  so: {
    reports: "Warbixinaha", home: "Dashboard", schools: "Dugsiyada",
    students: "Ardayda", att: "Imaanshaha", exams: "Imtixaanka",
    users: "Isticmaalayaasha", setup: "Fasallada & Maaddooyinka",
    res: "Natiijooyinka", myatt: "Imaanshahayga", set: "Settings",
    out: "Ka bax", welcome: "Soo dhawoow", lang: "Luuqadda",
    theme: "Muuqaalka", light: "Iftiin", dark: "Mugdi",
    pass: "Beddel password", cur: "Password-ka hadda",
    nw: "Password cusub (8+)", change: "Beddel", ok: "Waa la beddelay"
  },
  en: {
    reports: "Reports", home: "Dashboard", schools: "Schools",
    students: "Students", att: "Attendance", exams: "Exams",
    users: "Users", setup: "Classes & Subjects",
    res: "Results", myatt: "My attendance", set: "Settings",
    out: "Log out", welcome: "Welcome", lang: "Language",
    theme: "Appearance", light: "Light", dark: "Dark",
    pass: "Change password", cur: "Current password",
    nw: "New password (8+)", change: "Change", ok: "Password changed"
  },
  am: {
    reports: "ሪፖርቶች", home: "ዳሽቦርድ", schools: "ትምህርት ቤቶች",
    students: "ተማሪዎች", att: "መገኘት", exams: "ፈተናዎች",
    users: "ተጠቃሚዎች", setup: "ክፍሎች እና ትምህርቶች",
    res: "ውጤቶች", myatt: "የእኔ መገኘት", set: "ቅንብሮች",
    out: "ውጣ", welcome: "እንኳን ደህና መጡ", lang: "ቋንቋ",
    theme: "ገጽታ", light: "ብርሃን", dark: "ጨለማ",
    pass: "የይለፍ ቃል ቀይር", cur: "የአሁኑ የይለፍ ቃል",
    nw: "አዲስ የይለፍ ቃል (8+)", change: "ቀይር", ok: "ተቀይሯል"
  }
};

let LANG = "so";
try {
  const saved = localStorage.getItem("lang");
  LANG = DICT[saved] ? saved : "so";
} catch (e) {}

const t = k => (DICT[LANG] && DICT[LANG][k]) || DICT.so[k] || k;

function setLang(l) {
  LANG = DICT[l] ? l : "so";
  try { localStorage.setItem("lang", LANG); } catch (e) {}
  document.documentElement.lang = LANG;
  document.documentElement.dir = "ltr";
}

setLang(LANG);
