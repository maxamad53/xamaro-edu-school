const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const bcrypt = require("bcryptjs");
const { db, migrate } = require("./db");
const { sign, auth } = require("./auth");
migrate();
const saEmail=(process.env.SUPER_ADMIN_EMAIL||"").trim().toLowerCase();
const saPassword=process.env.SUPER_ADMIN_PASSWORD||"";
const saName=(process.env.SUPER_ADMIN_NAME||"Super Admin").trim();
if(saEmail&&saPassword.length>=12){const role=db.prepare("SELECT id FROM roles WHERE name='super_admin'").get();const old=db.prepare("SELECT id,role_id FROM users WHERE lower(email)=?").get(saEmail);if(!old){db.prepare("INSERT INTO users (school_id,role_id,full_name,email,password_hash) VALUES (NULL,?,?,?,?)").run(role.id,saName,saEmail,bcrypt.hashSync(saPassword,12));console.log("Super Admin created from environment");}else if(old.role_id!==role.id){console.log("Configured email belongs to another role; no changes made");}}

const app = express();
app.set("trust proxy", 1);
app.use(helmet());
app.use(express.json({ limit: "100kb" }));
app.get("/api/health", (q, r) => r.json({ ok: true }));
const Q = "SELECT u.*, r.name AS role, s.status AS school_status, s.approved AS school_approved FROM users u JOIN roles r ON r.id=u.role_id LEFT JOIN schools s ON s.id=u.school_id WHERE lower(u.email)=?";
app.post("/api/login", rateLimit({ windowMs: 900000, max: 20 }), (req, res) => {
  const { email, password } = req.body || {};
  if (typeof email !== "string" || typeof password !== "string")
    return res.status(400).json({ error: "Email iyo password waa loo baahan yahay" });
  const u = db.prepare(Q).get(email.trim().toLowerCase());
  if (!u || !bcrypt.compareSync(password, u.password_hash))
    return res.status(401).json({ error: "Email ama password khaldan" });
  if (u.school_approved === 0) return res.status(403).json({ error: "Dugsigaaga weli lama ogolaan. Sug ogolaanshaha." });
  if (u.status !== "active" || u.school_status === "suspended")
    return res.status(403).json({ error: "Koontada waa xiran tahay" });
  db.prepare("INSERT INTO audit_logs (school_id,user_id,action,ip) VALUES (?,?,?,?)").run(u.school_id, u.id, "login", req.ip);
  res.json({ token: sign(u), user: { id: u.id, name: u.full_name, role: u.role, school_id: u.school_id } });
});
app.get("/api/me", auth, (req, res) => {
  const u = db.prepare("SELECT id, full_name, email, language, school_id, (SELECT name FROM schools WHERE id=users.school_id) AS school_name FROM users WHERE id=?").get(req.user.id);
  res.json({ ...u, role: req.user.role });
});
app.use("/api/schools", require("./schools"));
app.use("/api/students", require("./students"));
app.use(express.static(require("path").join(__dirname, "..", "public")));
app.use(express.static(require("path").join(__dirname, "..", "public")));
app.use("/api/stats", require("./stats"));
app.use("/api/attendance", require("./attendance"));
app.use("/api/exams", require("./exams"));
app.use("/api/finance", require("./finance"));
app.use("/api/users", require("./users"));
app.use("/api/account", require("./account"));
app.use("/api/portal", require("./portal"));
app.use("/api/signup", require("./signup"));
app.use("/api/reports", require("./reports"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server wuu socdaa: http://localhost:" + PORT));
const runBackup = () => { try { require("child_process").fork(require("path").join(__dirname, "backup.js")); } catch (e) { console.log("Backup failed"); } };
runBackup();
setInterval(runBackup, 24 * 3600 * 1000);
