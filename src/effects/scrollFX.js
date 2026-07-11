/**
 * 3D scroll effects engine.
 * Call once: const cleanup = initScrollFX({ intensity: 6 });
 *
 * Markup hooks:
 *   data-layer="110"        — hero depth layer, translateZ in px (inside #hero-scene)
 *   data-depth="-0.35"      — parallax vs viewport center
 *   data-tilt-card="left"   — card tilts in 3D relative to viewport center
 *   data-tilt-in            — one-shot flip-in reveal on first view
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
      scene.querySelectorAll('[data-layer]').forEach((el) => {
        const z = parseFloat(el.dataset.layer) * strength;
        el.style.transform = `translateZ(${z}px)`;
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
