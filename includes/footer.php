<footer class="site-footer">
    <div class="footer-top">
        <a class="footer-mark" href="#top" aria-label="Back to top">RB.</a>
        <div class="footer-socials">
            <?php foreach ($socials as $label => $url): ?>
                <a href="<?= htmlspecialchars($url) ?>" target="_blank" rel="noopener noreferrer"><?= htmlspecialchars($label) ?></a>
            <?php endforeach; ?>
        </div>
    </div>
    <div class="footer-bottom">
        <span>© <?= htmlspecialchars($year) ?> <?= htmlspecialchars($siteName) ?></span>
        <button class="back-top" type="button">Back to top <i data-lucide="arrow-up"></i></button>
        <span>All rights reserved</span>
    </div>
</footer>

<script src="assets/js/script.js"></script>
<script>if (window.lucide) lucide.createIcons();</script>
</body>
</html>
