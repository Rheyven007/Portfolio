# Orange studio poster

Audience: prospective clients and internship teams.
Job: recognize Rheyven, explore real projects, and start a conversation.
Tone: bold, direct, energetic.
Constraints: supplied orange/black/white reference, clean typography, static HTML/CSS/JS,
existing RB identity, real project screenshots, enlarged main portrait with orange gradient overlay.

Candidates: orange studio poster, industrial orange index, monochrome editorial with orange accents.
Selected: Orange studio poster, following the supplied reference.
World: independent creative studio portfolios and printed typographic posters.
Signature move: oversized foreground name crossing a central cutout portrait, with a faint
background name on an orange field. The portrait blends into the field with an orange tint and fade.
Composition: reference-led poster hero, unequal project spreads, ruled toolkit, alternating full-width bands.
Corners: square surfaces and image frames.
Banned: decorative serif/italics, invented testimonials or metrics, generic icon-card grids.

## Type
Space Grotesk 400/500/700 for headings, DM Sans 400/500/600/700 for body and labels.
Body: 16px/1.6, compact hero copy 13px; desktop hero 88-184px.
Mobile headings 39-55px; hero name 18vw. Labels remain compact sans-serif.
Fonts load from Google Fonts with system sans-serif fallbacks.

## Palette
Deep orange: oklch(.53 .18 35).
White: oklch(.99 0 0). Black: oklch(.17 0 0).
Orange on black uses oklch(.75 .15 45) to preserve contrast.
Orange dominates the hero and contact to match the reference; neutral sections separate them.
Measured contrast in Chromium: white on orange 5.62:1; primary action 18.88:1;
muted body on white 7.86:1; orange heading on black 7.79:1.

## Behavior
The ID badge and its lace are removed from the rendered hero. Badge assets are no longer loaded.
All 22 toolkit icons remain locally hosted. Project previews use native modal dialogs.
Mobile navigation, saved theme preference, disclosures, and email-draft contact form remain.
Reduced motion disables entrances and transitions.

## Validation
Chromium at 360, 768, 1440px in light and dark themes.
No horizontal overflow, missing images, duplicate h1, or browser JavaScript errors.
Verified navigation, project preview/Escape, and reduced motion.
Hero is art-directed separately on mobile to keep the primary link above the portrait.
JS syntax and git whitespace checks passed.

Screenshots: .shots/orange-1440-light.png, .shots/orange-1440-dark.png,
.shots/orange-768-light.png, .shots/orange-768-dark.png,
.shots/orange-360-light.png, .shots/orange-360-dark.png.

Hero refinement critique: Direction 5, Focal point 5, Type 4, Color 5, Composition 5, Craft 4.
Hero screenshots: .shots/portrait-hero-1440.png, .shots/portrait-hero-768.png,
.shots/portrait-hero-360.png.
Known gaps: fonts download at runtime. Contact prepares a mail draft and needs an email app.
External project URLs are preserved and were not audited. No invented assets or testimonials.
