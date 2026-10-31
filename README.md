# Syviana Africa Hair Braiding — Hostinger Deployment Guide

A high-performance, mobile-responsive website and appointment request platform built for **Syviana Africa Hair Braiding**, an African hair braiding salon serving Chicago, Illinois.

Optimized for instant deployment to **Hostinger Web Hosting (Shared / Cloud / LiteSpeed / cPanel)** or **Hostinger VPS / Node.js**.

---

## 1. Verified Business Details

| Field | Value | Verification Status | Source / Notes |
|---|---|---|---|
| **Business Name** | Syviana Africa Hair Braiding | **VERIFIED** | Google Business Profile & Client Brief |
| **Phone Number** | `(708) 971-9940` | **VERIFIED** | Click-to-call direct link on website |
| **Salon Address** | `3773 W 79th St, Chicago, IL 60652` | **VERIFIED** | Ashburn / SW Chicago corridor |
| **Operating Hours** | `7:00 AM – 9:00 PM (Monday – Sunday)` | **VERIFIED** | Open 7 days a week |
| **Notification Recipient** | `artworkexpressllc@gmail.com` | **CONFIGURED** | Target email for all appointment inquiries |
| **Service Pricing** | Custom consultation based on length & style | **CONSULTATION** | Stated clearly; no fabricated prices |

> **Central Configuration:** All business phone numbers, street addresses, hours, and service lists are centrally managed in `src/config/business.ts`. Updating this single file propagates everywhere across the website.

---

## 2. Technology Stack & Hostinger Architecture

- **Frontend:** React 19, TypeScript, Vite 8, Tailwind CSS v4, Lucide React icons.
- **Hostinger Apache/LiteSpeed Configuration:** `public/.htaccess` (automatically included in `dist/` upon build).
  - Handles React Single Page Application (SPA) routing so page refreshes never return 404 errors.
  - Automatically redirects `/api/appointment-request` to `api/appointment-request.php`.
  - Enforces HTTPS, GZIP compression, and security headers.
- **Hostinger Backend API:** `public/api/appointment-request.php`
  - Runs natively on Hostinger's PHP environment without requiring external server processes.
  - Dispatches emails to `artworkexpressllc@gmail.com` via Resend API (cURL) or Hostinger native PHP `mail()`.
- **Hostinger Node.js / VPS Alternative:** `server.ts` (Express server runnable via `npm start`).

---

## 3. Hostinger Deployment Instructions (Step-by-Step)

### Option A: Hostinger Web Hosting (Shared, Cloud, or WordPress Hosting) — Recommended

This is the standard and easiest Hostinger deployment method:

1. **Build the production files locally:**
   ```bash
   npm run build
   ```
   This generates the ready-to-deploy static bundle and PHP backend inside the `dist/` folder:
   - `dist/index.html`
   - `dist/assets/`
   - `dist/images/`
   - `dist/api/appointment-request.php`
   - `dist/.htaccess`

2. **Log into Hostinger hPanel:**
   - Go to [hostinger.com](https://hostinger.com) and log in.
   - Navigate to **Websites** and click **Manage** on your domain.

3. **Open the File Manager:**
   - In hPanel, search for **File Manager** and open it.
   - Double-click into the **`public_html`** directory.

4. **Upload the contents of `dist/`:**
   - Upload all files and folders located **inside** the `dist/` folder directly into `public_html`.
   - *Tip:* You can compress the contents of `dist/` into a `.zip` file, upload it in Hostinger File Manager, and click **Extract**.
   - Ensure that `.htaccess` (hidden file) is uploaded to `public_html`.

5. **Test Your Site:**
   - Visit your domain (e.g. `https://syvianaafricahairbraiding.com`).
   - Test navigation, service selection, and submitting an appointment request.

---

### Option B: Hostinger VPS or Node.js Application Manager

If you have a Hostinger VPS or use Hostinger's Node.js Manager:

1. **Upload or clone the repository to your Hostinger server:**
   ```bash
   git clone <your-repo-url>
   cd <project-folder>
   ```

2. **Install dependencies and build:**
   ```bash
   npm install
   npm run build
   ```

3. **Start the application:**
   ```bash
   npm start
   ```
   *Note:* In Hostinger Node.js Application Manager, set:
   - **Application root:** `/`
   - **Application startup file:** `server.ts` (with `tsx`) or build output `server.js`

---

## 4. Environment Variables on Hostinger

If you wish to use the Resend API for high-deliverability transactional emails, set these environment variables in Hostinger hPanel (or inside `public_html/.htaccess` or `server.ts`):

| Variable | Description | Default / Example |
|---|---|---|
| `SALON_EMAIL` | Destination email for appointment requests | `artworkexpressllc@gmail.com` |
| `RESEND_API_KEY` | Optional: Transactional email API key | `re_xxxxxxxxxxxxxxxxxxxx` |
| `SENDER_EMAIL` | Sender address | `Syviana Hair Braiding <onboarding@resend.dev>` |

*Note:* If `RESEND_API_KEY` is not provided, Hostinger's built-in PHP mailer handles delivery to `artworkexpressllc@gmail.com` automatically!

---

## 5. Local Testing Matrix

| Test Case | Method | Expected Result | Status |
|---|---|---|---|
| **Build Compilation** | `npm run build` | Produces `dist/` with `.htaccess` and `api/` | **PASS** |
| **Local Dev Server** | `npm run dev` | Intercepts `/api/appointment-request` | **PASS** |
| **Node.js Server** | `npm start` | Express server runs on `PORT 3000` | **PASS** |
| **PHP API Syntax** | `php -l public/api/appointment-request.php` | Clean PHP syntax with zero errors | **PASS** |
| **Form Validation** | Blank fields & invalid email test | Rejects and displays clear error banners | **PASS** |
| **Honeypot Protection** | Bot trap input test | Rejects automated submissions | **PASS** |
| **Service Auto-Select** | Click "Request This Style" | Form auto-selects style & scrolls down | **PASS** |
