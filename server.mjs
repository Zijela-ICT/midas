import express from "express";
import nodemailer from "nodemailer";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = Number(process.env.PORT || 3001);
const root = path.dirname(fileURLToPath(import.meta.url));
const recipients = (process.env.CONTACT_TO || "info@shipwithmidas.com,chidubem@shipwithmidas.com,tayo@shipwithmidas.com")
  .split(",").map((address) => address.trim()).filter(Boolean);
const requiredMailSettings = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"];
const missingSettings = requiredMailSettings.filter((key) => !process.env[key]);
const transporter = missingSettings.length ? null : nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

app.disable("x-powered-by");
app.use(express.json({ limit: "20kb" }));

const recentRequests = new Map();
app.use("/api/contact", (request, response, next) => {
  const now = Date.now();
  const key = request.ip || "unknown";
  const attempts = (recentRequests.get(key) || []).filter((time) => now - time < 60_000);
  if (attempts.length >= 5) return response.status(429).json({ message: "Too many enquiries. Please try again shortly." });
  attempts.push(now);
  recentRequests.set(key, attempts);
  next();
});

const clean = (value, maxLength) => typeof value === "string" ? value.trim().slice(0, maxLength) : "";
const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
})[character]);

app.post("/api/contact", async (request, response) => {
  const name = clean(request.body.name, 120);
  const email = clean(request.body.email, 254);
  const company = clean(request.body.company, 160);
  const phone = clean(request.body.phone, 60);
  const service = clean(request.body.service, 160);
  const message = clean(request.body.message, 5000);
  const website = clean(request.body.website, 200);

  if (website) return response.status(200).json({ message: "Enquiry sent." });
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
    return response.status(400).json({ message: "Please provide your name, a valid email, and project details." });
  }
  if (!transporter) {
    console.error(`Contact email is not configured. Missing: ${missingSettings.join(", ")}`);
    return response.status(503).json({ message: "Email service is temporarily unavailable." });
  }

  const fields = [["Name", name], ["Email", email], ["Company", company || "Not provided"],
    ["Phone", phone || "Not provided"], ["Service", service || "Not provided"], ["Message", message]];
  try {
    await transporter.sendMail({
      from: `Midas website <${process.env.SMTP_USER}>`, to: recipients, replyTo: email,
      subject: `Website enquiry from ${name}`,
      text: fields.map(([label, value]) => `${label}:\n${value}`).join("\n\n"),
      html: `<h2>New website enquiry</h2>${fields.map(([label, value]) => `<p><strong>${label}</strong><br>${escapeHtml(value).replace(/\n/g, "<br>")}</p>`).join("")}`,
    });
    response.json({ message: "Thank you. Your enquiry has been sent." });
  } catch (error) {
    console.error("Unable to send contact email:", error instanceof Error ? error.message : error);
    response.status(502).json({ message: "We could not send your enquiry. Please try again." });
  }
});

app.use(express.static(path.join(root, "dist")));
app.get("/{*path}", (_request, response) => response.sendFile(path.join(root, "dist", "index.html")));
app.listen(port, () => console.log(`Midas server listening on http://localhost:${port}`));
