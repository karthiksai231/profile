/**
 * 3D scroll effects engine.
 * Call once: const cleanup = initScrollFX({ intensity: 6 });
 *
 * Markup hooks:
 *   data-layer="110"        — hero depth layer, translateZ in px (inside #hero-scene)
 *   data-depth="-0.35"      — parallax vs viewport center
 *   data-tilt-card="left"   — card tilts in 3D relative to viewport center
 *   data-tilt-in            — one-shot flip-in reveal on first view
 *   data-scrub-anim         — <model-viewer> animation timeline bound to scroll
 *   data-sync="start,end"   — reveal synced to the backdrop video clock (seconds)
 *   #skills-cube / #skills  — cube rotates with section scroll progress
 */
export function initScrollFX({ intensity = 6 } = {}) {
  const strength = intensity / 6; // 6 = baseline
  const mouse = { x: 0, y: 0 };
  let rafId;

  const onMouse = (e) => {
    mouse.x = e.clientX / window.innerWidth - 0.5;
    mouse.y = e.clientY / window.innerHeight - 0.5;
  };
  window.addEventListener('mousemove', onMouse);

  // One-shot flip-in reveals
  const tiltIns = document.querySelectorAll('[data-tilt-in]');
  tiltIns.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'rotateX(24deg) translateY(60px)';
    el.style.transition =
      'transform 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.9s ease';
  });
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.style.opacity = '1';
          en.target.style.transform = 'rotateX(0deg) translateY(0)';
          observer.unobserve(en.target);
        }
      });
    },
    { threshold: 0.25 }
  );
  tiltIns.forEach((el) => observer.observe(el));

  const tick = () => {
    const vh = window.innerHeight;

    // Hero: mouse parallax + scroll fade/lift
    const scene = document.getElementById('hero-scene');
    if (scene) {
      const sy = window.scrollY;
      const heroP = Math.min(sy / vh, 1);
      scene.style.transform =
        `rotateX(${mouse.y * -6 * strength}deg)` +
        ` rotateY(${mouse.x * 8 * strength}deg)` +
        ` translateY(${sy * 0.25}px)`;
      scene.style.opacity = String(1 - heroP * 0.9);

      // Sync reveals to the backdrop video: each element builds in over its
      // [start,end] window, holds, and dips out at the loop seam to replay.
      const video = document.querySelector('.transform-video');
      const synced = video && video.duration > 0;
      const t = synced ? video.currentTime : 0;
      const seam = synced
        ? Math.max(0, Math.min(1, (video.duration - t) / 0.45))
        : 1;

      scene.querySelectorAll('[data-layer]').forEach((el) => {
        const z = parseFloat(el.dataset.layer) * strength;
        let lift = 0;
        if (el.dataset.sync && synced) {
          const [s, e] = el.dataset.sync.split(',').map(Number);
          const q = Math.max(0, Math.min(1, (t - s) / (e - s)));
          const ease = q * q * (3 - 2 * q);
          el.style.opacity = String(Math.min(ease, seam));
          lift = (1 - ease) * 36;
        }
        el.style.transform = `translateZ(${z}px) translateY(${lift}px)`;
      });
    }

    // Parallax depth elements
    document.querySelectorAll('[data-depth]').forEach((el) => {
      const d = parseFloat(el.dataset.depth) * strength;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - vh / 2;
      el.style.transform = `translateY(${center * d}px)`;
    });

    // Cards: tilt relative to viewport center
    document.querySelectorAll('[data-tilt-card]').forEach((el) => {
      const rect = el.getBoundingClientRect();
      const center = (rect.top + rect.height / 2 - vh / 2) / vh;
      const clamped = Math.max(-1, Math.min(1, center * 2));
      const dirY = el.dataset.tiltCard === 'left' ? 1 : -1;
      const rx = clamped * -14 * strength;
      const ry = clamped * 10 * strength * dirY;
      const vis = Math.max(0, 1 - Math.abs(clamped) * 0.55);
      el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      el.style.opacity = String(0.45 + vis * 0.55);
    });

    // Scroll-scrubbed model-viewer animations: timeline follows scroll progress
    document.querySelectorAll('[data-scrub-anim]').forEach((el) => {
      if (!el.loaded || !el.duration) return;
      if (!el.paused) el.pause();
      const sec = el.closest('section');
      let p;
      if (sec && sec.getBoundingClientRect().top + window.scrollY < vh / 2) {
        // Section starts at the top of the page (hero): scrub over the first viewport
        p = Math.max(0, Math.min(1, window.scrollY / (vh * 0.8)));
      } else if (sec) {
        // Section further down: scrub as it traverses the viewport
        const rect = sec.getBoundingClientRect();
        p = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      } else {
        // Fixed companion (no section): loop once per screen-height of scroll
        p = (window.scrollY / (vh * 0.8)) % 1;
      }
      // 0.999: clamping to exactly duration wraps looping clips back to frame 0
      el.currentTime = p * el.duration * 0.999;
    });

    // Skills cube: rotation driven by section scroll progress
    const cube = document.getElementById('skills-cube');
    const sec = document.getElementById('skills');
    if (cube && sec) {
      const rect = sec.getBoundingClientRect();
      const progress = (vh - rect.top) / (vh + rect.height);
      const rot = progress * 540 * strength;
      cube.style.transform = `rotateX(-14deg) rotateY(${rot}deg)`;
    }

    rafId = requestAnimationFrame(tick);
  };
  tick();

  return () => {
    cancelAnimationFrame(rafId);
    observer.disconnect();
    window.removeEventListener('mousemove', onMouse);
  };
}
