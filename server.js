// server.ts
import express from "express";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// netlify/functions/appointment-request.mjs
import { Resend } from "resend";
function escapeHtml(str) {
  if (!str) return "";
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
var handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers,
      body: ""
    };
  }
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed. Only POST is accepted." })
    };
  }
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing request payload." })
      };
    }
    let data;
    try {
      data = JSON.parse(event.body);
    } catch {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Invalid JSON payload format." })
      };
    }
    if (data.bot_trap || data.hp_company) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Spam submission detected." })
      };
    }
    const name = (data.name || "").trim();
    const email = (data.email || "").trim().toLowerCase();
    const phone = (data.phone || "").trim();
    const hairstyle = (data.hairstyle || "").trim();
    const date = (data.date || "").trim();
    const time = (data.time || "").trim();
    const comments = (data.comments || "").trim();
    const errors = [];
    if (!name || name.length < 2) {
      errors.push("Full Name is required (minimum 2 characters).");
    }
    if (name.length > 100) {
      errors.push("Name exceeds maximum limit of 100 characters.");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.push("A valid email address is required.");
    }
    if (!phone || phone.length < 7) {
      errors.push("A valid phone number is required.");
    }
    if (phone.length > 30) {
      errors.push("Phone number exceeds maximum limit of 30 characters.");
    }
    if (!hairstyle) {
      errors.push("Preferred Hairstyle is required.");
    }
    if (comments.length > 1500) {
      errors.push("Additional comments exceed maximum limit of 1500 characters.");
    }
    if (errors.length > 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: errors.join(" ") })
      };
    }
    const resendApiKey = process.env.RESEND_API_KEY;
    const salonRecipient = process.env.SALON_EMAIL || "artworkexpressllc@gmail.com";
    const senderEmail = process.env.SENDER_EMAIL || "Syviana Hair Braiding <onboarding@resend.dev>";
    if (!resendApiKey) {
      console.warn("RESEND_API_KEY environment variable is not configured.");
      return {
        statusCode: 503,
        headers,
        body: JSON.stringify({
          error: "The salon email notification service is currently awaiting API key configuration (RESEND_API_KEY). Please contact Syviana Africa Hair Braiding directly at (708) 971-9940."
        })
      };
    }
    const resend = new Resend(resendApiKey);
    const submissionTimestamp = (/* @__PURE__ */ new Date()).toLocaleString("en-US", {
      timeZone: "America/Chicago",
      dateStyle: "full",
      timeStyle: "long"
    });
    const plainTextBody = `
New Appointment Request \u2014 Syviana Africa Hair Braiding
======================================================

Customer Information:
\u2022 Customer Name: ${name}
\u2022 Customer Email: ${email}
\u2022 Customer Phone: ${phone}

Requested Service Details:
\u2022 Preferred Hairstyle: ${hairstyle}
\u2022 Preferred Date: ${date || "Not specified (flexible)"}
\u2022 Preferred Time: ${time || "Not specified (flexible)"}

Additional Comments / Notes:
${comments || "None provided"}

------------------------------------------------------
Submission Time (Chicago CT): ${submissionTimestamp}
Note: This is an appointment inquiry. Please call or email the client to confirm availability.
`.trim();
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0b0b; color: #1f2937; margin: 0; padding: 20px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
    .header { background: #0b0b0b; padding: 24px 32px; border-bottom: 3px solid #D6A52B; text-align: center; }
    .header h1 { color: #ffffff; font-size: 20px; margin: 0 0 4px 0; font-weight: 700; letter-spacing: 0.5px; }
    .header p { color: #D6A52B; font-size: 13px; margin: 0; font-weight: 500; text-transform: uppercase; letter-spacing: 1.5px; }
    .content { padding: 32px; }
    .alert-banner { background: #FEF9C3; border-left: 4px solid #D6A52B; padding: 12px 16px; margin-bottom: 24px; font-size: 13px; color: #713F12; }
    .section-title { font-size: 14px; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #f3f4f6; padding-bottom: 6px; margin-top: 24px; margin-bottom: 12px; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
    .info-table td { padding: 8px 0; vertical-align: top; font-size: 14px; }
    .label { width: 38%; color: #6b7280; font-weight: 500; }
    .val { color: #111827; font-weight: 600; }
    .highlight-style { color: #9A6F00; font-size: 16px; font-weight: 700; }
    .comments-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 14px; font-size: 14px; color: #374151; white-space: pre-wrap; margin-top: 8px; }
    .action-bar { text-align: center; margin: 28px 0 12px 0; }
    .btn-call { display: inline-block; background: #D6A52B; color: #000000; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 700; font-size: 14px; }
    .footer { background: #f9fafb; padding: 16px 32px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f3f4f6; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Syviana Africa Hair Braiding</h1>
      <p>New Appointment Request</p>
    </div>
    <div class="content">
      <div class="alert-banner">
        <strong>Action Needed:</strong> A potential client submitted an appointment request. Review their details below and contact them directly to confirm date and time.
      </div>

      <div class="section-title">Client Information</div>
      <table class="info-table">
        <tr>
          <td class="label">Client Name:</td>
          <td class="val">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td class="label">Email Address:</td>
          <td class="val"><a href="mailto:${escapeHtml(email)}" style="color:#2563EB;">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <td class="label">Phone Number:</td>
          <td class="val"><a href="tel:${escapeHtml(phone)}" style="color:#2563EB; font-weight:700;">${escapeHtml(phone)}</a></td>
        </tr>
      </table>

      <div class="section-title">Requested Braiding Details</div>
      <table class="info-table">
        <tr>
          <td class="label">Preferred Hairstyle:</td>
          <td class="val highlight-style">${escapeHtml(hairstyle)}</td>
        </tr>
        <tr>
          <td class="label">Preferred Date:</td>
          <td class="val">${escapeHtml(date) || "Flexible / No date selected"}</td>
        </tr>
        <tr>
          <td class="label">Preferred Time:</td>
          <td class="val">${escapeHtml(time) || "Flexible / Any time"}</td>
        </tr>
      </table>

      <div class="section-title">Client Notes / Requests</div>
      <div class="comments-box">${escapeHtml(comments) || "No special requests provided."}</div>

      <div class="action-bar">
        <a href="tel:${escapeHtml(phone)}" class="btn-call">Call Client Now: ${escapeHtml(phone)}</a>
      </div>
    </div>
    <div class="footer">
      Received on ${escapeHtml(submissionTimestamp)} &bull; Syviana Africa Hair Braiding Website Notification
    </div>
  </div>
</body>
</html>
`;
    const { data: resendData, error: resendError } = await resend.emails.send({
      from: senderEmail,
      to: [salonRecipient],
      replyTo: email,
      subject: `New Appointment Request: ${hairstyle} \u2014 ${name}`,
      text: plainTextBody,
      html: htmlBody
    });
    if (resendError) {
      console.error("Resend API delivery error:", resendError);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({
          error: "Failed to dispatch email via transactional provider. Please call us directly at (708) 971-9940."
        })
      };
    }
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Thank you! Your appointment request has been submitted successfully. Syviana Africa Hair Braiding will contact you to discuss your request and confirm availability.",
        id: resendData?.id
      })
    };
  } catch (err) {
    console.error("Unexpected server error in appointment-request:", err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "An unexpected server error occurred. Please contact Syviana Africa Hair Braiding by phone at (708) 971-9940."
      })
    };
  }
};

// server.ts
dotenv.config();
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var PORT = process.env.PORT || 3e3;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post(["/api/appointment-request", "/.netlify/functions/appointment-request"], async (req, res) => {
  try {
    const event = {
      httpMethod: "POST",
      body: JSON.stringify(req.body),
      headers: req.headers
    };
    const result = await handler(event, {});
    res.status(result.statusCode);
    for (const [key, val] of Object.entries(result.headers || {})) {
      res.setHeader(key, val);
    }
    res.send(result.body);
  } catch (error) {
    console.error("Server error processing appointment request:", error);
    res.status(500).json({
      error: "An unexpected error occurred. Please call Syviana Africa Hair Braiding at (708) 971-9940."
    });
  }
});
var distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});
app.listen(PORT, () => {
  console.log(`Syviana Africa Hair Braiding server running on http://localhost:${PORT}`);
});
