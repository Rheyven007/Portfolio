<?php
require_once __DIR__ . '/../config/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['contact_form'])) {
    $name = trim((string)($_POST['name'] ?? ''));
    $email = trim((string)($_POST['email'] ?? ''));
    $subject = trim((string)($_POST['subject'] ?? ''));
    $message = trim((string)($_POST['message'] ?? ''));

    if ($name === '' || $email === '' || $subject === '' || $message === '') {
        $_SESSION['contact_status'] = ['type' => 'error', 'message' => 'Please complete all fields before sending.'];
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['contact_status'] = ['type' => 'error', 'message' => 'Please enter a valid email address.'];
    } else {
        // Placeholder processing: no mail server required.
        $_SESSION['contact_status'] = [
            'type' => 'success',
            'message' => 'Thanks, ' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . '. Your inquiry has been received.'
        ];
    }

    header('Location: ' . strtok($_SERVER['REQUEST_URI'], '?') . '#contact');
    exit;
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="<?= htmlspecialchars($siteDescription) ?>">
    <meta name="theme-color" content="#050505" id="theme-color">
    <title><?= htmlspecialchars($siteTitle) ?></title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<div class="site-loader" aria-hidden="true">
    <div class="loader-word"><?= htmlspecialchars($siteName) ?></div>
    <div class="loader-line"><span></span></div>
</div>

<div class="cursor-dot" aria-hidden="true"></div>
<div class="cursor-ring" aria-hidden="true"></div>

<header class="site-header" id="site-header">
    <a class="brand" href="#top" aria-label="<?= htmlspecialchars($siteName) ?> home">
        <span>RB.</span>
    </a>

    <nav class="desktop-nav" aria-label="Primary navigation">
        <a href="#about">About</a>
        <a href="#work">Work</a>
        <a href="#services">Services</a>
        <a href="#process">Process</a>
        <a href="#contact">Contact</a>
    </nav>

    <div class="header-actions">
        <button class="theme-toggle magnetic" type="button" aria-label="Switch to light theme" aria-pressed="false">
            <i data-lucide="sun"></i><span class="theme-label">LIGHT</span>
        </button>
        <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
            <span></span><span></span>
        </button>
    </div>
</header>

<div class="mobile-menu" id="mobile-menu" aria-hidden="true">
    <div class="mobile-menu-inner">
        <span class="eyebrow">NAVIGATION / <?= htmlspecialchars($year) ?></span>
        <nav aria-label="Mobile navigation">
            <a href="#about"><span>01</span>About</a>
            <a href="#work"><span>02</span>Work</a>
            <a href="#services"><span>03</span>Services</a>
            <a href="#process"><span>04</span>Process</a>
            <a href="#contact"><span>05</span>Contact</a>
        </nav>
        <div class="mobile-menu-footer">
            <span><?= htmlspecialchars($location) ?></span>
            <span>Available for selected projects</span>
        </div>
    </div>
</div>
