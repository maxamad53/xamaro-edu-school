window.settingsUI = function () {
  const d = document.createElement("div");
  d.innerHTML =
    "<h1 style='font-size:18px;margin:0 0 10px'>" + t("lang") + "</h1>" +
    "<select id='lg'>" +
    "<option value='so'>🇸🇴 Soomaali</option>" +
    "<option value='am'>🇪🇹 አማርኛ</option>" +
    "<option value='en'>🇬🇧 English</option>" +
    "</select>" +
    "<h1 style='font-size:18px;margin:16px 0 10px'>" + t("theme") + "</h1>" +
    "<button id='th'>" + t("light") + " / " + t("dark") + "</button>";

  $("main").appendChild(d);
  $("lg").value = LANG;

  $("lg").onchange = () => {
    setLang($("lg").value);
    build();
    show("set");
  };

  $("th").onclick = () => $("tg").click();
  window.accountUI();
};
