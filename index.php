<?php
declare(strict_types=1);
session_start();
require_once __DIR__ . '/includes/header.php';

$siteName = $siteName ?? 'RHEYVEN BAUSAS';
$location = $location ?? 'Philippines';
$year = $year ?? (int) date('Y');

$projects = [
    [
        'number' => '01',
        'title' => 'TALYNK',
        'category' => 'LOCAL JOB MATCHING PLATFORM',
        'description' => 'A hyper-local platform connecting skilled workers, residents, businesses, and community institutions.',
        'tech' => 'PHP / MYSQL / JAVASCRIPT',
        'year' => '2026',
        'image' => 'assets/images/project-01.jpg',
    ],
    [
        'number' => '02',
        'title' => 'UNIQUEUE',
        'category' => 'QUEUE MANAGEMENT SYSTEM',
        'description' => 'A queue intelligence platform designed around office operations, staff workflows, and student experiences.',
        'tech' => 'LARAVEL / MYSQL / EXPO',
        'year' => '2026',
        'image' => 'assets/images/uniqueue.png',
    ],

    [
        'number' => '03',
        'title' => 'TRACKADEMIC',
        'category' => 'STUDENT ACADEMIC PORTAL',
        'description' => 'A focused academic platform concept for organizing student records, progress, and campus workflows.',
        'tech' => 'PHP / MYSQL / JAVASCRIPT',
        'year' => '2025',
        'image' => 'assets/images/project-03.jpg',
    ],
    [
        'number' => '04',
        'title' => 'PROJECT FOUR',
        'category' => 'CREATIVE WEB EXPERIENCE',
        'description' => 'A placeholder case study for a future experimental digital experience.',
        'tech' => 'HTML / CSS / JAVASCRIPT',
        'year' => '2025',
        'image' => 'assets/images/project-04.jpg',
    ],
    [
        'number' => '05',
        'title' => 'DIGITAL STUDY',
        'category' => 'INTERACTIVE PRODUCT CONCEPT',
        'description' => 'An editorial interface study exploring motion, typography, and focused interaction.',
        'tech' => 'HTML / CSS / JAVASCRIPT',
        'year' => '2026',
        'image' => 'assets/images/project-01.jpg',
    ],
];
?>
<main id="top">
<section class="hero" id="hero">
    <div class="hero-grid" aria-hidden="true"></div>
    <div class="hero-meta hero-meta-left">
        <span>PORTFOLIO / <?= htmlspecialchars($year) ?></span>
        <span><?= htmlspecialchars($location) ?></span>
    </div>
    <div class="hero-meta hero-meta-right">
        <span>AVAILABLE FOR</span>
        <span>SELECTED PROJECTS</span>
    </div>

    <div class="hero-marquee hero-marquee-top" aria-hidden="true">
        <div class="marquee-track">
            <span><?= htmlspecialchars($siteName) ?></span><span><?= htmlspecialchars($siteName) ?></span><span><?= htmlspecialchars($siteName) ?></span><span><?= htmlspecialchars($siteName) ?></span>
        </div>
    </div>

    <div class="hero-marquee hero-marquee-bottom" aria-hidden="true">
        <div class="marquee-track">
            <span>DEVELOPER / DESIGNER / CREATIVE TECHNOLOGIST</span>
            <span>DEVELOPER / DESIGNER / CREATIVE TECHNOLOGIST</span>
            <span>DEVELOPER / DESIGNER / CREATIVE TECHNOLOGIST</span>
        </div>
    </div>

    <div class="hero-title" aria-label="<?= htmlspecialchars($siteName) ?>">
        <span>RHEYVEN</span>
        <span>BAUSAS</span>
    </div>

    <div class="hero-portrait-wrap">
        <div class="portrait-placeholder">
            <i data-lucide="image"></i>
            <span>ADD<br>PROFILE.PNG</span>
        </div>
        <img class="hero-portrait" src="assets/images/profile.png" alt="<?= htmlspecialchars($siteName) ?> transparent portrait"
             onerror="this.hidden=true; this.previousElementSibling.hidden=false;">
    </div>

    <div class="hero-role">
        <span>WEB DEVELOPER</span>
        <span>DESIGNER</span>
        <span>CREATIVE TECHNOLOGIST</span>
    </div>

    <a class="scroll-cue magnetic" href="#about">
        <span>SCROLL TO EXPLORE</span>
        <i data-lucide="arrow-down"></i>
    </a>

    <div class="hero-index">01 / 11</div>
</section>

<section class="statement section-pad" id="about">
    <div class="section-intro reveal">
        <span class="eyebrow">01 — ABOUT</span>
        <span class="section-line"></span>
    </div>
    <div class="statement-grid">
        <h2 class="display-title reveal">I BUILD <em>DIGITAL</em><br>EXPERIENCES<br>WITH INTENT.</h2>
        <div class="about-copy reveal">
            <p class="large-copy">I am a passionate developer and creative technologist focused on building digital experiences that are functional, thoughtful, and visually engaging.</p>
            <p>Placeholder copy for now. Replace this with your personal story, design philosophy, goals, and the kind of problems you enjoy solving.</p>
            <div class="fact-list">
                <div><span>BASED IN</span><strong><?= htmlspecialchars($location) ?></strong></div>
                <div><span>FOCUS</span><strong>WEB DEVELOPMENT</strong></div>
                <div><span>EXPERIENCE</span><strong>PLACEHOLDER</strong></div>
                <div><span>STATUS</span><strong>SELECTED PROJECTS</strong></div>
            </div>
        </div>
    </div>
</section>

<section class="skills section-pad" id="skills">
    <div class="section-intro reveal">
        <span class="eyebrow">02 — CAPABILITIES</span>
        <span class="section-line"></span>
    </div>
    <div class="skills-heading reveal">
        <h2 class="display-title">TOOLS <em>&</em><br>SKILLS.</h2>
        <p>Technologies and disciplines I use to turn ideas into useful digital products.</p>
    </div>
    <div class="skill-list">
        <?php
        $skills = ['PHP','JavaScript','MySQL','HTML / CSS','UI / UX','Responsive Design','Git / GitHub','API Integration'];
        foreach ($skills as $i => $skill):
        ?>
            <div class="skill-row reveal" data-hover>
                <span class="skill-number"><?= str_pad((string)($i + 1), 2, '0', STR_PAD_LEFT) ?></span>
                <h3><?= htmlspecialchars($skill) ?></h3>
                <i data-lucide="arrow-up-right"></i>
            </div>
        <?php endforeach; ?>
    </div>
</section>

<section class="work section-pad" id="work">
    <div class="section-intro reveal">
        <span class="eyebrow">03 — SELECTED WORK</span>
        <span class="section-line"></span>
    </div>
    <div class="work-heading reveal">
        <h2 class="display-title">SELECTED<br><em>WORK.</em></h2>
        <p>A small collection of systems, interfaces, and digital experiences. Replace these with your real case studies.</p>
    </div>

    <div class="project-list">
        <?php foreach ($projects as $project): ?>
            <article class="project reveal">
                <button class="project-media" type="button"
                        data-lightbox
                        data-project-index="<?= htmlspecialchars((string)($project['number'])) ?>"
                        data-title="<?= htmlspecialchars($project['title']) ?>"
                        data-category="<?= htmlspecialchars($project['category']) ?>"
                        data-description="<?= htmlspecialchars($project['description']) ?>"
                        data-image="<?= htmlspecialchars($project['image']) ?>"
                        aria-label="Open <?= htmlspecialchars($project['title']) ?> project preview">
                    <div class="project-image-placeholder"><i data-lucide="image"></i><span>PROJECT IMAGE</span></div>
                    <img src="<?= htmlspecialchars($project['image']) ?>" alt="<?= htmlspecialchars($project['title']) ?> project preview" loading="lazy"
                         onerror="this.hidden=true; this.previousElementSibling.hidden=false;">
                    <span class="project-view">VIEW <i data-lucide="arrow-up-right"></i></span>
                </button>
                <div class="project-info">
                    <div class="project-number"><?= htmlspecialchars($project['number']) ?></div>
                    <div class="project-main">
                        <h3><?= htmlspecialchars($project['title']) ?></h3>
                        <span><?= htmlspecialchars($project['category']) ?></span>
                    </div>
                    <p><?= htmlspecialchars($project['description']) ?></p>
                    <div class="project-meta">
                        <span><?= htmlspecialchars($project['tech']) ?></span>
                        <span><?= htmlspecialchars($project['year']) ?></span>
                    </div>
                </div>
            </article>
        <?php endforeach; ?>
    </div>
</section>

 
<section class="stats-band section-pad" aria-label="Portfolio highlights">
    <div class="stat reveal"><strong>05+</strong><span>PROJECT CONCEPTS</span></div>
    <div class="stat reveal"><strong>03</strong><span>CORE DISCIPLINES</span></div>
    <div class="stat reveal"><strong>∞</strong><span>IDEAS TO EXPLORE</span></div>
    <div class="stat reveal"><strong><?= htmlspecialchars($year) ?></strong><span>CURRENT CHAPTER</span></div>
</section>

<section class="manifesto section-pad" id="manifesto">
    <div class="section-intro reveal"><span class="eyebrow">03 — MANIFESTO</span><span class="section-line"></span></div>
    <div class="manifesto-grid">
        <p class="manifesto-kicker reveal">LESS NOISE.<br><em>MORE INTENT.</em></p>
        <div class="manifesto-copy reveal">
            <p>Good digital work should feel clear before it feels complicated. I combine structure, typography, motion, and code to make interfaces that communicate with purpose.</p>
            <div class="principles">
                <span>01 / CLARITY</span><span>02 / CRAFT</span><span>03 / MOTION</span><span>04 / FUNCTION</span>
            </div>
        </div>
    </div>
</section>

<section class="process section-pad" id="process">
    <div class="section-intro reveal"><span class="eyebrow">07 — PROCESS</span><span class="section-line"></span></div>
    <div class="process-heading reveal"><h2 class="display-title">FROM IDEA<br><em>TO IMPACT.</em></h2><p>A simple process keeps creative work focused while leaving room for experimentation.</p></div>
    <div class="process-grid">
        <article class="process-card reveal"><span>01</span><h3>DISCOVER</h3><p>Understand the problem, audience, constraints, and desired outcome.</p></article>
        <article class="process-card reveal"><span>02</span><h3>DEFINE</h3><p>Shape the content, structure, visual direction, and technical approach.</p></article>
        <article class="process-card reveal"><span>03</span><h3>BUILD</h3><p>Turn the direction into responsive, accessible, and maintainable code.</p></article>
        <article class="process-card reveal"><span>04</span><h3>REFINE</h3><p>Polish motion, interactions, details, performance, and responsive behavior.</p></article>
    </div>
</section>

<section class="availability section-pad">
    <div class="availability-inner reveal">
        <span class="eyebrow">08 — AVAILABILITY</span>
        <h2>OPEN TO<br><em>GOOD IDEAS.</em></h2>
        <p>Available for selected freelance, academic, collaborative, and experimental projects.</p>
        <a class="outline-link magnetic" href="#contact">START A CONVERSATION <i data-lucide="arrow-down-right"></i></a>
    </div>
</section>

<section class="services section-pad" id="services">
    <div class="section-intro reveal">
        <span class="eyebrow">09 — SERVICES</span>
        <span class="section-line"></span>
    </div>
    <div class="services-heading reveal">
        <h2 class="display-title">WHAT I<br><em>CREATE.</em></h2>
    </div>
    <div class="service-list">
        <?php
        $services = [
            'Web Development',
            'UI / UX Design',
            'PHP / MySQL Development',
            'Frontend Development',
            'System Development',
            'Website Maintenance'
        ];
        foreach ($services as $i => $service):
        ?>
            <div class="service-row reveal" data-hover>
                <span><?= str_pad((string)($i + 1), 2, '0', STR_PAD_LEFT) ?></span>
                <h3><?= htmlspecialchars($service) ?></h3>
                <i data-lucide="arrow-up-right"></i>
            </div>
        <?php endforeach; ?>
    </div>
</section>

<section class="timeline section-pad">
    <div class="section-intro reveal">
        <span class="eyebrow">10 — JOURNEY</span>
        <span class="section-line"></span>
    </div>
    <div class="timeline-list">
        <article class="timeline-item reveal"><span>2026</span><div><h3>FULL-STACK DEVELOPMENT</h3><p>Building modern web systems and digital platforms.</p></div></article>
        <article class="timeline-item reveal"><span>2025</span><div><h3>WEB DEVELOPMENT</h3><p>Developed academic and personal projects while exploring product design.</p></div></article>
        <article class="timeline-item reveal"><span>2024</span><div><h3>STARTED BUILDING</h3><p>Explored web development, interface design, and creative coding.</p></div></article>
    </div>
</section>

<section class="contact section-pad" id="contact">
    <div class="contact-intro reveal">
        <span class="eyebrow">11 — CONTACT</span>
        <span class="section-line"></span>
    </div>
    <div class="contact-grid">
        <div class="contact-title reveal">
            <h2>LET'S<br><em>WORK</em><br>TOGETHER.</h2>
            <p>Have a project, collaboration, or idea? Let's talk.</p>
            <a class="text-link" href="mailto:<?= htmlspecialchars($contactRecipient) ?>">Email directly <i data-lucide="arrow-up-right"></i></a>
        </div>
        <div class="contact-form-wrap reveal">
            <?php if (isset($_SESSION['contact_status'])): $status = $_SESSION['contact_status']; unset($_SESSION['contact_status']); ?>
                <div class="form-message <?= htmlspecialchars($status['type']) ?>" role="status"><?= $status['message'] ?></div>
            <?php endif; ?>
            <form method="post" action="#contact" class="contact-form">
                <input type="hidden" name="contact_form" value="1">
                <label><span>01 / NAME</span><input type="text" name="name" autocomplete="name" required></label>
                <label><span>02 / EMAIL</span><input type="email" name="email" autocomplete="email" required></label>
                <label><span>03 / SUBJECT</span><input type="text" name="subject" required></label>
                <label><span>04 / MESSAGE</span><textarea name="message" rows="5" required></textarea></label>
                <button class="submit-button magnetic" type="submit">SEND INQUIRY <i data-lucide="arrow-up-right"></i></button>
            </form>
        </div>
    </div>
</section>
</main>

<div class="lightbox" id="lightbox" aria-hidden="true">
    <button class="lightbox-close" type="button" aria-label="Close project preview"><i data-lucide="x"></i></button>
    <button class="lightbox-prev" type="button" aria-label="Previous project"><i data-lucide="arrow-left"></i></button>
    <button class="lightbox-next" type="button" aria-label="Next project"><i data-lucide="arrow-right"></i></button>
    <div class="lightbox-content">
        <div class="lightbox-image"><img src="" alt=""></div>
        <div class="lightbox-copy">
            <span class="eyebrow" id="lightbox-category"></span>
            <h2 id="lightbox-title"></h2>
            <p id="lightbox-description"></p>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
