<?php
/**
 * Syviana Africa Hair Braiding - Appointment Request Handler (Hostinger Compatible)
 * 
 * Works out-of-the-box on Hostinger Shared Hosting, Cloud Hosting, and cPanel/LiteSpeed.
 * Supports Resend API (via cURL) with a reliable PHP mail() fallback.
 * Recipient: artworkexpressllc@gmail.com
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Only POST is accepted.']);
    exit;
}

// Read raw JSON input
$rawInput = file_get_contents('php://input');
if (!$rawInput) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing request payload.']);
    exit;
}

$data = json_decode($rawInput, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON payload.']);
    exit;
}

// Honeypot spam check
if (!empty($data['bot_trap']) || !empty($data['hp_company'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Spam submission detected.']);
    exit;
}

// Extract and sanitize fields
$name      = trim($data['name'] ?? '');
$email     = trim(strtolower($data['email'] ?? ''));
$phone     = trim($data['phone'] ?? '');
$hairstyle = trim($data['hairstyle'] ?? '');
$date      = trim($data['date'] ?? '');
$time      = trim($data['time'] ?? '');
$comments  = trim($data['comments'] ?? '');

// Server-side validation
$errors = [];
if (strlen($name) < 2) {
    $errors[] = 'Full Name is required (minimum 2 characters).';
}
if (strlen($name) > 100) {
    $errors[] = 'Name exceeds maximum limit of 100 characters.';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email address is required.';
}

if (strlen($phone) < 7) {
    $errors[] = 'A valid phone number is required.';
}
if (strlen($phone) > 30) {
    $errors[] = 'Phone number exceeds maximum limit of 30 characters.';
}

if (empty($hairstyle)) {
    $errors[] = 'Preferred Hairstyle is required.';
}

if (strlen($comments) > 1500) {
    $errors[] = 'Comments exceed maximum limit of 1500 characters.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['error' => implode(' ', $errors)]);
    exit;
}

// Hostinger Configuration
// Priority: Environment Variable -> Config file or default
$recipientEmail = getenv('SALON_EMAIL') ?: 'artworkexpressllc@gmail.com';
$resendApiKey   = getenv('RESEND_API_KEY') ?: '';
$senderEmail    = getenv('SENDER_EMAIL') ?: 'Syviana Hair Braiding <onboarding@resend.dev>';

// Timestamp in Chicago (Central Time)
date_default_timezone_set('America/Chicago');
$submissionTime = date('l, F j, Y - g:i A T');

$safeName      = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safeEmail     = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safePhone     = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$safeHairstyle = htmlspecialchars($hairstyle, ENT_QUOTES, 'UTF-8');
$safeDate      = htmlspecialchars($date ?: 'Flexible / No date specified', ENT_QUOTES, 'UTF-8');
$safeTime      = htmlspecialchars($time ?: 'Flexible / Any time', ENT_QUOTES, 'UTF-8');
$safeComments  = nl2br(htmlspecialchars($comments ?: 'None provided.', ENT_QUOTES, 'UTF-8'));

$emailSubject = "New Appointment Request: {$hairstyle} — {$name}";

// Plain Text Body
$plainTextBody = <<<EOT
New Appointment Request — Syviana Africa Hair Braiding
======================================================

Customer Information:
• Customer Name: {$name}
• Customer Email: {$email}
• Customer Phone: {$phone}

Requested Service Details:
• Preferred Hairstyle: {$hairstyle}
• Preferred Date: {$date}
• Preferred Time: {$time}

Additional Comments / Notes:
{$comments}

------------------------------------------------------
Submission Time (Chicago CT): {$submissionTime}
Note: This is an appointment request. Please contact the client to confirm availability.
EOT;

// HTML Body
$htmlBody = <<<EOT
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0b0b; color: #1f2937; margin: 0; padding: 20px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
    .header { background: #0b0b0b; padding: 24px 32px; border-bottom: 3px solid #D6A52B; text-align: center; }
    .header h1 { color: #ffffff; font-size: 20px; margin: 0 0 4px 0; font-weight: 700; }
    .header p { color: #D6A52B; font-size: 13px; margin: 0; font-weight: 500; text-transform: uppercase; letter-spacing: 1.5px; }
    .content { padding: 32px; }
    .alert-banner { background: #FEF9C3; border-left: 4px solid #D6A52B; padding: 12px 16px; margin-bottom: 24px; font-size: 13px; color: #713F12; }
    .section-title { font-size: 14px; font-weight: 700; color: #111827; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #f3f4f6; padding-bottom: 6px; margin-top: 24px; margin-bottom: 12px; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
    .info-table td { padding: 8px 0; vertical-align: top; font-size: 14px; }
    .label { width: 38%; color: #6b7280; font-weight: 500; }
    .val { color: #111827; font-weight: 600; }
    .highlight-style { color: #9A6F00; font-size: 16px; font-weight: 700; }
    .comments-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 14px; font-size: 14px; color: #374151; margin-top: 8px; }
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
          <td class="val">{$safeName}</td>
        </tr>
        <tr>
          <td class="label">Email Address:</td>
          <td class="val"><a href="mailto:{$safeEmail}" style="color:#2563EB;">{$safeEmail}</a></td>
        </tr>
        <tr>
          <td class="label">Phone Number:</td>
          <td class="val"><a href="tel:{$safePhone}" style="color:#2563EB; font-weight:700;">{$safePhone}</a></td>
        </tr>
      </table>

      <div class="section-title">Requested Braiding Details</div>
      <table class="info-table">
        <tr>
          <td class="label">Preferred Hairstyle:</td>
          <td class="val highlight-style">{$safeHairstyle}</td>
        </tr>
        <tr>
          <td class="label">Preferred Date:</td>
          <td class="val">{$safeDate}</td>
        </tr>
        <tr>
          <td class="label">Preferred Time:</td>
          <td class="val">{$safeTime}</td>
        </tr>
      </table>

      <div class="section-title">Client Notes / Requests</div>
      <div class="comments-box">{$safeComments}</div>

      <div class="action-bar">
        <a href="tel:{$safePhone}" class="btn-call">Call Client Now: {$safePhone}</a>
      </div>
    </div>
    <div class="footer">
      Received on {$submissionTime} &bull; Syviana Africa Hair Braiding (Hostinger Deployment)
    </div>
  </div>
</body>
</html>
EOT;

$emailSent = false;

// 1. Try Resend API via cURL if API key is provided
if (!empty($resendApiKey) && function_exists('curl_init')) {
    $postPayload = json_encode([
        'from'     => $senderEmail,
        'to'       => [$recipientEmail],
        'reply_to' => $email,
        'subject'  => $emailSubject,
        'html'     => $htmlBody,
        'text'     => $plainTextBody,
    ]);

    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postPayload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $resendApiKey,
        'Content-Type: application/json',
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 300) {
        $emailSent = true;
    }
}

// 2. Fallback to Hostinger native PHP mail() if Resend API key is not configured or fails
if (!$emailSent) {
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: Syviana Africa Hair Braiding <no-reply@" . ($_SERVER['SERVER_NAME'] ?? 'hostinger.com') . ">\r\n";
    $headers .= "Reply-To: {$email}\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    if (@mail($recipientEmail, $emailSubject, $htmlBody, $headers)) {
        $emailSent = true;
    }
}

if ($emailSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your appointment request has been submitted successfully. Syviana Africa Hair Braiding will contact you to discuss your request and confirm availability.',
    ]);
} else {
    // If neither method could send, return informative message with salon phone
    http_response_code(503);
    echo json_encode([
        'error' => 'Unable to dispatch email notification right now. Please call Syviana Africa Hair Braiding directly at (708) 971-9940.',
    ]);
}
