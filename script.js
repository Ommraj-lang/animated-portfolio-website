/**
 * Ommraj Nayak - RajVerse Interactive Portfolio Engine
 * Ultra-Modern Awwwards-Level Architecture
 * 
 * Modules:
 * 1. Lenis Smooth Momentum Scrolling + GSAP ScrollTrigger Sync
 * 2. Background Video Frame Scrubbing Engine (300 Frames, LERP Momentum, Aspect Cover, Safe Fallback) + Subtle Ambient Overlay
 * 3. Preloader Orchestration (Synchronized with Frames & Animation Kickoff)
 * 4. GSAP Entrance Timeline & Scroll-Triggered Reveal Animations
 * 5. 3D Perspective Card Tilt & Mouse Spotlight Glow
 * 6. Custom Magnetic Cursor Follower & Magnetic Button Physics
 * 7. Interactive Hero Code Card (Realistic Typing Effect & Run Console)
 * 8. Terminal Command Palette (Ctrl + K) & Quick Navigation
 * 9. Project Case-Study Quick View Modal Engine
 * 10. Interactive Contact Modal & Mobile Drawer
 * 11. Animated Stat Counters (ScrollTrigger + Eased Interpolation)
 * 12. Text Decode / Scramble Micro-Animation
 * 13. Smooth Active Navbar Highlight Tracker
 */

(() => {
  'use strict';

  // ==========================================================================
  // Project Case-Study Quick View Data Dictionary
  // ==========================================================================
  const PROJECTS_DATA = {
    swasthya: {
      num: '01',
      badge: 'by RajVerse',
      title: 'Swasthya Setu Maa',
      tagline: 'Maternal Healthcare & Pregnancy Tracking Platform for Odisha Districts',
      img: 'assets/project_swasthya.png',
      features: [
        'Comprehensive maternal health tracking designed specifically to support expectant mothers across Odisha.',
        'Trimester-by-trimester health milestones, dietary nutrition recommendations, and checkup reminders.',
        'High-contrast, accessible Healthcare UI optimized for rural mobile connections and low-bandwidth scenarios.',
        'Regional language accessibility support and emergency contact integration for quick frontline medical assistance.'
      ],
      stack: ['React.js', 'Vite', 'Healthcare UI', 'Tailwind CSS', 'Responsive Architecture'],
      liveUrl: 'https://swasthya-setu-maa-app.vercel.app/',
      repoUrl: 'https://github.com/Ommraj-lang'
    },
    rajfit: {
      num: '02',
      badge: 'by RajVerse',
      title: 'RajFit — Offline Workout Tracker',
      tagline: 'FitNotes-Style Progressive Overload Tracking with 100% Offline PWA Support',
      img: 'assets/project_gym.png',
      features: [
        'FitNotes-style progressive overload tracking: seamlessly log exercise sets, weights, reps, and RPE.',
        'Built-in smart rest interval timer with audible/vibrating completion alerts for optimal rest between sets.',
        'Custom workout routine builder with exercise categorization (Chest, Back, Legs, Shoulders, Arms, Core).',
        'Interactive bodyweight and lifting volume charts rendered locally without any cloud dependency.',
        '100% offline-first Progressive Web App (PWA) with persistent client-side localStorage synchronization.'
      ],
      stack: ['JavaScript (ES6+)', 'Offline PWA', 'LocalStorage Sync', 'FitNotes UX', 'Web Audio API'],
      liveUrl: 'https://rajverse-fit.vercel.app/',
      repoUrl: 'https://github.com/Ommraj-lang/rajverse-fit'
    },
    robotics: {
      num: '03',
      badge: 'by RajVerse',
      title: 'Quantum Robotics',
      tagline: 'Modern Robotics Innovation, Automation Concepts & Futuristic Tech Showcase',
      img: 'assets/project_robotics.png',
      features: [
        'Immersive digital showcase exploring automated robotics, robotic arm control, and autonomous kinematics.',
        'High-performance fluid animations featuring dark-mode cyber aesthetic and glassmorphic HUD overlays.',
        'Mobile-first responsive architecture ensuring silky 60fps rendering across all modern mobile and desktop screens.',
        'Modular component architecture structured for rapid scalability and future 3D WebGL / Three.js model integration.'
      ],
      stack: ['HTML5', 'Modern CSS3', 'JavaScript', 'Responsive Design', 'Cyberpunk UI'],
      liveUrl: 'https://github.com/Ommraj-lang',
      repoUrl: 'https://github.com/Ommraj-lang'
    },
    rajsync: {
      num: '04',
      badge: 'by RajVerse',
      title: 'RajVerse Sync — Smart Task & Kanban Dashboard',
      tagline: 'SaaS Task Management with Drag-and-Drop Kanban & Built-in Pomodoro Focus Engine',
      img: 'assets/project_taskflow.png',
      features: [
        'Full-featured SaaS task dashboard featuring fluid drag-and-drop Kanban columns (Backlog, In Progress, Done).',
        'Built-in customizable Pomodoro focus timer with productivity session counters and focus sound cues.',
        'Nested subtasks checklists with real-time percentage completion calculation and priority tags (High, Med, Low).',
        'Persistent localStorage synchronization ensuring zero data loss and instantaneous state recovery on reload.',
        'Sleek dark-mode glassmorphic interface with keyboard shortcuts for rapid task creation and status toggles.'
      ],
      stack: ['JavaScript (ES6+)', 'Kanban Architecture', 'Pomodoro Engine', 'LocalStorage Sync', 'SaaS Dashboard'],
      liveUrl: 'https://rajverse-sync.vercel.app/',
      repoUrl: 'https://github.com/Ommraj-lang/rajverse-sync'
    }
  };

  // ==========================================================================
  // 1. Lenis Smooth Momentum Scrolling + GSAP ScrollTrigger
  // ==========================================================================
  let lenisInstance = null;

  function initSmoothScroll() {
    if (typeof Lenis !== 'undefined') {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
      });

      if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        lenisInstance.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
          lenisInstance.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } else {
        function raf(time) {
          lenisInstance.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    }

    // Connect internal anchor links to smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#' || href === '#!') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          if (lenisInstance) {
            lenisInstance.scrollTo(target, { offset: -70, duration: 1.2 });
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  // ==========================================================================
  // 2. Background Image Frame Sequence Animation & Ambient Particle Engine
  // ==========================================================================
  const canvas = document.getElementById('animationCanvas');
  let ctx = null;

  const TOTAL_FRAMES = 300;
  const frameImages = new Array(TOTAL_FRAMES).fill(null);
  const frameLoaded = new Array(TOTAL_FRAMES).fill(false);
  let loadedFramesCount = 0;
  let targetProgress = 0;
  let smoothProgress = 0;
  const LERP_FACTOR = 0.085;

  let mousePos = { x: -9999, y: -9999, radius: 140 };
  let ambientParticles = [];

  // Helper to format frame path: video_frames_30fps/frame_000001.jpg -> frame_000300.jpg
  function getFramePath(index) {
    const frameNum = String(index + 1).padStart(6, '0');
    return `video_frames_30fps/frame_${frameNum}.jpg`;
  }

  // Safe fallback: find the closest loaded frame to avoid any black flash or flicker
  function getBestAvailableFrame(targetIndex) {
    if (frameLoaded[targetIndex] && frameImages[targetIndex]) {
      return frameImages[targetIndex];
    }
    // Search outward for the nearest loaded frame
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = targetIndex - offset;
      if (prev >= 0 && frameLoaded[prev] && frameImages[prev]) {
        return frameImages[prev];
      }
      const next = targetIndex + offset;
      if (next < TOTAL_FRAMES && frameLoaded[next] && frameImages[next]) {
        return frameImages[next];
      }
    }
    return (frameLoaded[0] && frameImages[0]) ? frameImages[0] : null;
  }

  // Draw image with aspect-ratio "cover" scaling centered on canvas
  function drawCoverImage(img) {
    if (!img) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 1920;
    const ih = img.naturalHeight || 1080;

    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const nx = (cw - nw) / 2;
    const ny = (ch - nh) / 2;

    ctx.drawImage(img, 0, 0, iw, ih, nx, ny, nw, nh);
  }

  // Lightweight ethereal ambient particles on top of video frames
  class AmbientDust {
    constructor(w, h) {
      this.reset(w, h, true);
    }

    reset(w, h, randomInit = false) {
      this.x = randomInit ? Math.random() * w : (Math.random() > 0.5 ? 0 : w);
      this.y = randomInit ? Math.random() * h : Math.random() * h;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.8 + 0.8;
      this.baseAlpha = Math.random() * 0.25 + 0.15;
      this.alpha = this.baseAlpha;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.pulseAngle = Math.random() * Math.PI * 2;

      const colors = [
        '129, 140, 248', // subtle indigo
        '168, 85, 247',  // subtle purple
        '99, 102, 241',  // deep indigo
        '199, 210, 254'  // soft lavender
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update(w, h) {
      this.pulseAngle += this.pulseSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.pulseAngle) * 0.1;

      // Subtle reaction to cursor
      const dx = mousePos.x - this.x;
      const dy = mousePos.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mousePos.radius && dist > 0) {
        const force = (1 - dist / mousePos.radius) * 1.2;
        this.x -= (dx / dist) * force;
        this.y -= (dy / dist) * force;
      }

      this.x += this.vx;
      this.y += this.vy;

      if (this.x < -10) this.x = w + 10;
      if (this.x > w + 10) this.x = -10;
      if (this.y < -10) this.y = h + 10;
      if (this.y > h + 10) this.y = -10;
    }

    draw(context) {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(${this.color}, ${Math.max(0.05, this.alpha)})`;
      context.fill();
    }
  }

  // Preload frame images with priority phases
  function preloadFrames(onProgress, onInitialReady) {
    let initialReadyFired = false;

    function loadSingleFrame(index) {
      if (frameImages[index]) return;
      const img = new Image();
      img.src = getFramePath(index);
      img.onload = () => {
        frameImages[index] = img;
        frameLoaded[index] = true;
        loadedFramesCount++;

        if (index === 0) {
          // Immediately draw initial frame
          const active = getBestAvailableFrame(0);
          if (active) drawCoverImage(active);
        }

        if (onProgress) {
          onProgress(loadedFramesCount, TOTAL_FRAMES);
        }

        // Fire ready signal once Frame 0 and an initial critical batch are ready
        if (!initialReadyFired && loadedFramesCount >= 20 && frameLoaded[0]) {
          initialReadyFired = true;
          if (onInitialReady) onInitialReady();
        }
      };
      img.onerror = () => {
        // Safe fallback flag remains false; getBestAvailableFrame handles it cleanly
        loadedFramesCount++;
        if (onProgress) onProgress(loadedFramesCount, TOTAL_FRAMES);
      };
    }

    // Phase 1: Load Frame 0 immediately
    loadSingleFrame(0);

    // Phase 2: Load keyframes spread across the sequence (every 5th frame)
    for (let i = 5; i < TOTAL_FRAMES; i += 5) {
      loadSingleFrame(i);
    }

    // Phase 3: Progressively load remaining frames
    setTimeout(() => {
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        if (!frameImages[i]) {
          loadSingleFrame(i);
        }
      }
    }, 120);

    // Fallback safety: ensure onInitialReady fires within 1.6s even on slow network
    setTimeout(() => {
      if (!initialReadyFired) {
        initialReadyFired = true;
        if (onInitialReady) onInitialReady();
      }
    }, 1600);
  }

  function initBackgroundFrameCanvas() {
    if (!canvas) return;
    ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);

      // Re-populate ambient dust particles
      const count = Math.min(35, Math.max(18, Math.floor(window.innerWidth / 45)));
      ambientParticles = [];
      for (let i = 0; i < count; i++) {
        ambientParticles.push(new AmbientDust(window.innerWidth, window.innerHeight));
      }

      // Re-render immediately on resize
      const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(smoothProgress * (TOTAL_FRAMES - 1))));
      const frame = getBestAvailableFrame(frameIdx);
      if (frame) drawCoverImage(frame);
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Track mouse coordinates for ambient dust interaction
    window.addEventListener('mousemove', (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mousePos.x = -9999;
      mousePos.y = -9999;
    });

    // Update target scroll progress
    function updateScrollProgress() {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const currentY = lenisInstance ? lenisInstance.scroll : (window.scrollY || window.pageYOffset || 0);
      targetProgress = Math.min(1, Math.max(0, currentY / maxScroll));
    }

    // Connect to Lenis if available
    if (lenisInstance) {
      lenisInstance.on('scroll', (e) => {
        const limit = e.limit || (document.documentElement.scrollHeight - window.innerHeight);
        targetProgress = limit > 0 ? Math.min(1, Math.max(0, e.scroll / limit)) : 0;
      });
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    // Main 60fps render loop
    function renderLoop() {
      // Lerp smooth progress towards target scroll progress (zero jitter)
      smoothProgress += (targetProgress - smoothProgress) * LERP_FACTOR;
      if (Math.abs(targetProgress - smoothProgress) < 0.0001) {
        smoothProgress = targetProgress;
      }

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(smoothProgress * (TOTAL_FRAMES - 1)))
      );

      // 1. Draw active background image frame
      const activeFrame = getBestAvailableFrame(frameIndex);
      if (activeFrame) {
        drawCoverImage(activeFrame);
      } else {
        ctx.fillStyle = '#060810';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // 2. Draw subtle ambient particles overlay
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.save();
      ctx.scale(dpr, dpr);
      const w = window.innerWidth;
      const h = window.innerHeight;
      for (let i = 0; i < ambientParticles.length; i++) {
        ambientParticles[i].update(w, h);
        ambientParticles[i].draw(ctx);
      }
      ctx.restore();

      requestAnimationFrame(renderLoop);
    }

    requestAnimationFrame(renderLoop);
  }

  // ==========================================================================
  // 3. Preloader Orchestration (Synchronized with Frames & Animation Kickoff)
  // ==========================================================================
  function initPreloader(onComplete) {
    const loaderOverlay = document.getElementById('loaderOverlay');
    const loaderPercent = document.getElementById('loaderPercent');
    const loaderFill = document.getElementById('loaderFill');

    let displayPercent = 0;
    let targetPercent = 15;
    let isDismissed = false;

    function dismissLoader() {
      if (isDismissed) return;
      isDismissed = true;

      if (loaderPercent) loaderPercent.textContent = '100%';
      if (loaderFill) loaderFill.style.width = '100%';

      setTimeout(() => {
        if (loaderOverlay) {
          loaderOverlay.classList.add('fade-out');
          setTimeout(() => {
            loaderOverlay.style.display = 'none';
            if (onComplete) onComplete();
          }, 600);
        } else if (onComplete) {
          onComplete();
        }
      }, 200);
    }

    // Preload frames and track progress
    preloadFrames(
      (loaded, total) => {
        // Map first 35 loaded frames to 100% progress so loading bar reaches 100% fast
        const framePct = Math.min(100, Math.round((loaded / 30) * 100));
        targetPercent = Math.max(targetPercent, framePct);
      },
      () => {
        // Initial critical frames ready
        targetPercent = 100;
      }
    );

    // Smooth UI progress counter ticker
    const ticker = setInterval(() => {
      if (displayPercent < targetPercent) {
        displayPercent += Math.min(5, Math.ceil((targetPercent - displayPercent) * 0.35));
        if (displayPercent > 100) displayPercent = 100;

        if (loaderPercent) loaderPercent.textContent = `${displayPercent}%`;
        if (loaderFill) loaderFill.style.width = `${displayPercent}%`;
      }

      if (displayPercent >= 100) {
        clearInterval(ticker);
        dismissLoader();
      }
    }, 35);

    // Absolute fallback safety: never block visitor longer than 1.8 seconds
    setTimeout(() => {
      targetPercent = 100;
      dismissLoader();
    }, 1800);
  }

  // ==========================================================================
  // 4. GSAP Staggered Entrance & Scroll-Triggered Reveal Animations
  // ==========================================================================
  function initEntranceAnimations() {
    if (typeof gsap === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(
        '.hero-tag-badge, .hero-title, .hero-desc, .hero-cta-group, .hero-cta-group .btn-primary, .hero-cta-group .btn-secondary, .tech-strip, .hero-stage, #heroCodeCard',
        { opacity: 1, y: 0, clearProps: 'transform,opacity' }
      );
      return;
    }

    // Hero entrance timeline with robust fromTo and clearProps guarantee
    const heroTl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 0.75 },
      onComplete: () => {
        gsap.set(
          '.hero-tag-badge, .hero-title, .hero-desc, .hero-cta-group, .hero-cta-group .btn-primary, .hero-cta-group .btn-secondary, .tech-strip, .hero-stage, #heroCodeCard',
          { clearProps: 'transform,opacity' }
        );
      }
    });

    heroTl
      .fromTo('.hero-tag-badge', { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.05, clearProps: 'transform,opacity' })
      .fromTo('.hero-title', { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, clearProps: 'transform,opacity' }, '-=0.45')
      .fromTo('.hero-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, clearProps: 'transform,opacity' }, '-=0.45')
      .fromTo(
        '.hero-cta-group .btn-primary, .hero-cta-group .btn-secondary',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.1, clearProps: 'transform,opacity' },
        '-=0.45'
      )
      .fromTo('.tech-strip', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, clearProps: 'transform,opacity' }, '-=0.45')
      .fromTo('.hero-stage', { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, clearProps: 'transform,opacity' }, '-=0.55')
      .fromTo('#heroCodeCard', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, clearProps: 'transform,opacity' }, '-=0.5');

    if (typeof ScrollTrigger === 'undefined') return;

    // About Section Reveals
    gsap.from('.about-text-col', {
      scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    });

    gsap.fromTo(
      '.stat-card',
      { opacity: 0, y: 24 },
      {
        scrollTrigger: {
          trigger: '.about-stats-grid',
          start: 'top 85%',
          once: true
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        clearProps: 'transform'
      }
    );

    // Bento Grid Section Reveals
    gsap.from('.bento-card', {
      scrollTrigger: {
        trigger: '.bento-skills-grid',
        start: 'top 82%',
        toggleActions: 'play none none none'
      },
      y: 45,
      opacity: 0,
      scale: 0.96,
      stagger: 0.14,
      duration: 0.85,
      ease: 'power3.out'
    });

    gsap.from('.tech-marquee-wrapper', {
      scrollTrigger: {
        trigger: '.tech-marquee-wrapper',
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Featured Projects Cards Reveal
    gsap.fromTo(
      '.projects-grid-4 .project-card',
      { opacity: 0, y: 40, scale: 0.96 },
      {
        scrollTrigger: {
          trigger: '#projects',
          start: 'top 80%',
          once: true
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        stagger: 0.14,
        ease: 'power2.out',
        clearProps: 'transform'
      }
    );

    // Contact Cards Reveal
    gsap.fromTo(
      '.bottom-three-grid .bottom-card',
      { opacity: 0, y: 35 },
      {
        scrollTrigger: {
          trigger: '#contact-block',
          start: 'top 88%',
          once: true
        },
        opacity: 1,
        y: 0,
        stagger: 0.16,
        duration: 0.75,
        ease: 'power2.out',
        clearProps: 'transform'
      }
    );
  }

  // ==========================================================================
  // 5. Card 3D Perspective Tilt & Mouse Spotlight Glow
  // ==========================================================================
  function initCardSpotlightAndTilt() {
    // Only enable 3D tilt on fine pointer (non-touch) devices
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;

    // All interactive cards track mouse coordinates for radial spotlight
    const spotlightCards = document.querySelectorAll('.project-card, .bento-card, .stat-card, .bottom-card');

    spotlightCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Apply 3D perspective tilt only on project cards on desktop
        if (isFinePointer && card.classList.contains('project-card') && typeof gsap !== 'undefined') {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -6.5; // -6.5 to 6.5 deg
          const rotateY = ((x - centerX) / centerX) * 6.5;

          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            transformPerspective: 1000,
            duration: 0.25,
            ease: 'power1.out'
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        if (isFinePointer && card.classList.contains('project-card') && typeof gsap !== 'undefined') {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.45,
            ease: 'power2.out',
            clearProps: 'transform'
          });
        }
      });
    });
  }

  // ==========================================================================
  // 6. Custom Magnetic Cursor Follower & Magnetic Button Physics
  // ==========================================================================
  function initMagneticCursor() {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');

    if (!isFinePointer || !dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }, { passive: true });

    function cursorTick() {
      // Smooth lerp for trailing ring
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(cursorTick);
    }
    requestAnimationFrame(cursorTick);

    // Expand cursor ring on clickable interactive elements
    const hoverTargets = document.querySelectorAll(
      'a, button, .project-card, .bento-card, .tech-pill, .stat-card, .social-circle, .cmd-item, input, textarea, select'
    );

    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('cursor-active'));
      el.addEventListener('mouseleave', () => ring.classList.remove('cursor-active'));
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
      dot.classList.add('cursor-hidden');
      ring.classList.add('cursor-hidden');
    });
    document.addEventListener('mouseenter', () => {
      dot.classList.remove('cursor-hidden');
      ring.classList.remove('cursor-hidden');
    });

    // Magnetic pull effect on primary buttons and social circles
    const magneticBtns = document.querySelectorAll(
      '.btn-primary, .btn-hire, .btn-secondary, .social-circle, .btn-cmd-palette, .project-quick-view-btn'
    );

    magneticBtns.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);

        if (typeof gsap !== 'undefined') {
          gsap.to(btn, {
            x: x * 0.28,
            y: y * 0.28,
            duration: 0.2,
            ease: 'power1.out'
          });
        }
      });

      btn.addEventListener('mouseleave', () => {
        if (typeof gsap !== 'undefined') {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.45,
            ease: 'elastic.out(1, 0.4)'
          });
        }
      });
    });
  }

  // ==========================================================================
  // 7. Interactive Hero Code Card (Typing Simulation & Run Console)
  // ==========================================================================
  function initHeroCodeCard() {
    const runBtn = document.getElementById('runCodeBtn');
    const termOutput = document.getElementById('codeTerminalOutput');
    const termText = termOutput ? termOutput.querySelector('.term-text') : null;

    if (!runBtn || !termOutput || !termText) return;

    let isRunning = false;

    runBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (isRunning) return;
      isRunning = true;

      runBtn.disabled = true;
      termOutput.className = 'code-terminal-output running';
      termText.textContent = 'Compiling rajverse.ts and launching modules...';

      setTimeout(() => {
        termOutput.className = 'code-terminal-output success';
        termText.textContent = '✓ Ready to build: RajFit, RajSync, Swasthya Setu Maa online! 🚀';
        runBtn.disabled = false;
        isRunning = false;

        // Subtle haptic pulse or audio click feedback if supported
        if (navigator.vibrate) navigator.vibrate(25);
      }, 750);
    });
  }

  // ==========================================================================
  // 8. Terminal Command Palette (Ctrl + K) & Quick Navigation
  // ==========================================================================
  function initCommandPalette() {
    const modal = document.getElementById('cmdPaletteModal');
    const openBtns = [
      document.getElementById('openCmdPaletteBtn'),
      document.getElementById('mobileCmdPaletteBtn')
    ].filter(Boolean);
    const closeBtn = document.getElementById('closeCmdPaletteBtn');
    const input = document.getElementById('cmdInput');
    const cmdList = document.getElementById('cmdList');
    const termPanel = document.getElementById('cmdTerminalPanel');
    const termOutput = document.getElementById('cmdTerminalOutput');

    if (!modal || !input || !cmdList) return;

    function openPalette() {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      input.value = '';
      filterItems('');
      if (termPanel) termPanel.style.display = 'none';
      setTimeout(() => input.focus(), 80);
    }

    function closePalette() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (termPanel) termPanel.style.display = 'none';
    }

    openBtns.forEach((btn) => btn.addEventListener('click', openPalette));
    if (closeBtn) closeBtn.addEventListener('click', closePalette);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePalette();
    });

    // Global keyboard shortcuts (Ctrl + K / Cmd + K, Esc)
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (modal.classList.contains('open')) {
          closePalette();
        } else {
          openPalette();
        }
      } else if (e.key === 'Escape' && modal.classList.contains('open')) {
        e.preventDefault();
        closePalette();
      }
    });

    // Real-time filtering
    function filterItems(query) {
      const q = query.toLowerCase().trim();
      const items = cmdList.querySelectorAll('.cmd-item');
      let visibleCount = 0;

      items.forEach((item) => {
        const title = item.querySelector('.cmd-title')?.textContent.toLowerCase() || '';
        const sub = item.querySelector('.cmd-sub')?.textContent.toLowerCase() || '';
        const cmd = item.dataset.cmd || '';

        if (!q || title.includes(q) || sub.includes(q) || cmd.includes(q)) {
          item.style.display = 'flex';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      });
    }

    input.addEventListener('input', (e) => {
      filterItems(e.target.value);
    });

    // Command Execution Handler
    function executeAction(item) {
      const action = item.dataset.action;
      const target = item.dataset.target;
      const cmd = item.dataset.cmd;

      if (action === 'nav' && target) {
        closePalette();
        const el = document.querySelector(target);
        if (el) {
          if (lenisInstance) {
            lenisInstance.scrollTo(el, { offset: -70, duration: 1.2 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      } else if (action === 'modal' && target === 'hire') {
        closePalette();
        const hireModal = document.getElementById('contactModal');
        if (hireModal) {
          hireModal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      } else if (action === 'external' && target) {
        window.open(target, '_blank', 'noopener,noreferrer');
        closePalette();
      } else if (action === 'term' && cmd === 'whoami') {
        if (termPanel && termOutput) {
          termPanel.style.display = 'block';
          termOutput.innerHTML = `
            <div><strong>ommraj@rajverse:~$</strong> whoami</div>
            <div style="color: #94a3b8; margin-top: 4px;">
              • <strong>Identity:</strong> Ommraj Nayak<br>
              • <strong>Role:</strong> Full-Stack Web Developer &amp; Ecosystem Architect<br>
              • <strong>Location:</strong> Bhubaneswar, Odisha, India<br>
              • <strong>Ecosystem:</strong> RajVerse (RajFit, RajSync, Swasthya Setu Maa, Quantum Robotics)<br>
              • <strong>Core Stack:</strong> React.js, TypeScript, Next.js, Node.js, PWA, Tailwind CSS<br>
              • <strong>Status:</strong> Ready for client collaboration &amp; web projects 🚀
            </div>
          `;
        }
      }
    }

    cmdList.addEventListener('click', (e) => {
      const item = e.target.closest('.cmd-item');
      if (item) executeAction(item);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const visibleItems = Array.from(cmdList.querySelectorAll('.cmd-item')).filter(
          (i) => i.style.display !== 'none'
        );
        if (visibleItems.length > 0) {
          e.preventDefault();
          executeAction(visibleItems[0]);
        }
      }
    });
  }

  // ==========================================================================
  // 9. Project Case-Study Quick View Modal Engine
  // ==========================================================================
  function initProjectQuickView() {
    const modal = document.getElementById('projectQuickViewModal');
    const closeBtn = document.getElementById('closeProjectModalBtn');
    const titleEl = document.getElementById('projectModalTitle');
    const taglineEl = document.getElementById('projectModalTagline');
    const imgEl = document.getElementById('projectModalImg');
    const numEl = document.getElementById('projectModalNum');
    const badgeEl = document.getElementById('projectModalBadge');
    const featuresList = document.getElementById('projectModalFeatures');
    const stackWrap = document.getElementById('projectModalStack');
    const liveBtn = document.getElementById('projectModalLiveBtn');
    const repoBtn = document.getElementById('projectModalRepoBtn');

    if (!modal) return;

    function openProjectModal(projectId) {
      const data = PROJECTS_DATA[projectId];
      if (!data) return;

      if (titleEl) titleEl.textContent = data.title;
      if (taglineEl) taglineEl.textContent = data.tagline;
      if (imgEl) {
        imgEl.src = data.img;
        imgEl.alt = `${data.title} Preview`;
      }
      if (numEl) numEl.textContent = data.num;
      if (badgeEl) badgeEl.textContent = data.badge;

      if (featuresList) {
        featuresList.innerHTML = data.features.map((f) => `<li>${f}</li>`).join('');
      }

      if (stackWrap) {
        stackWrap.innerHTML = data.stack.map((t) => `<span class="project-tech-tag">${t}</span>`).join('');
      }

      if (liveBtn) {
        liveBtn.href = data.liveUrl;
        liveBtn.style.display = data.liveUrl ? 'inline-flex' : 'none';
      }

      if (repoBtn) {
        repoBtn.href = data.repoUrl;
        repoBtn.style.display = data.repoUrl ? 'inline-flex' : 'none';
      }

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    // Attach listeners to all quick view trigger buttons
    document.querySelectorAll('.project-quick-view-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = btn.dataset.project;
        openProjectModal(projectId);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProjectModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeProjectModal();
      }
    });
  }

  // ==========================================================================
  // 10. Interactive Contact Modal & Mobile Drawer
  // ==========================================================================
  function initInteractions() {
    const contactModal = document.getElementById('contactModal');
    const openModalBtns = [
      document.getElementById('openHireModalBtn'),
      document.getElementById('mobileHireBtn'),
      document.getElementById('bottomCtaBtn'),
      document.getElementById('heroContactBtn')
    ].filter(Boolean);
    const closeModalBtn = document.getElementById('closeModalBtn');
    const contactForm = document.getElementById('contactForm');
    const modalFeedback = document.getElementById('modalFeedback');

    const mobileToggleBtn = document.getElementById('mobileToggleBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Mobile Drawer Toggle
    if (mobileToggleBtn && mobileDrawer) {
      mobileToggleBtn.addEventListener('click', () => {
        mobileDrawer.classList.toggle('open');
      });

      mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
          mobileDrawer.classList.remove('open');
        });
      });
    }

    // Hire Modal Open & Close
    openModalBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (contactModal) {
          contactModal.classList.add('open');
          document.body.style.overflow = 'hidden';
          if (mobileDrawer) mobileDrawer.classList.remove('open');
        }
      });
    });

    if (closeModalBtn && contactModal) {
      closeModalBtn.addEventListener('click', () => {
        contactModal.classList.remove('open');
        document.body.style.overflow = '';
      });

      contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
          contactModal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }

    // Contact Form Submission Simulation
    if (contactForm && modalFeedback) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        modalFeedback.textContent = 'Submitting your inquiry...';
        modalFeedback.style.color = 'var(--accent-purple)';

        setTimeout(() => {
          modalFeedback.textContent = '✓ Inquiry sent! Ommraj will respond within 24 hours.';
          modalFeedback.style.color = '#10b981';
          contactForm.reset();

          setTimeout(() => {
            contactModal.classList.remove('open');
            document.body.style.overflow = '';
            modalFeedback.textContent = '';
          }, 2400);
        }, 700);
      });
    }

    // Scroll progress bar indicator
    const progressBar = document.getElementById('progressBar');
    const scrollHint = document.getElementById('scrollHint');

    window.addEventListener('scroll', () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY || window.pageYOffset || 0;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }

      if (scrollHint) {
        if (scrollTop > 60) {
          scrollHint.classList.add('hidden');
        } else {
          scrollHint.classList.remove('hidden');
        }
      }
    }, { passive: true });
  }

  // ==========================================================================
  // 11. Animated Stat Counters
  // ==========================================================================
  function initStatCounters() {
    const statElements = document.querySelectorAll('.stat-num');
    if (!statElements.length) return;

    let hasRun = false;

    function runCounters() {
      if (hasRun) return;
      hasRun = true;

      statElements.forEach((el) => {
        const raw = el.textContent.trim();
        const hasLeadingZero = raw.startsWith('0');
        const suffix = raw.replace(/^[0-9]+/, '');
        const target = parseInt(raw.replace(/[^0-9]/g, ''), 10);

        if (isNaN(target)) return;

        // Skip animation if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          el.textContent = raw;
          return;
        }

        const duration = 1400;
        const startTime = performance.now();

        function tick(now) {
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / duration);
          // Easing: easeOutExpo
          const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const current = Math.round(ease * target);

          const formatted = (hasLeadingZero && current < 10) ? `0${current}` : `${current}`;
          el.textContent = `${formatted}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = raw;
          }
        }

        requestAnimationFrame(tick);
      });
    }

    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        trigger: '#about',
        start: 'top 80%',
        once: true,
        onEnter: runCounters
      });
    } else {
      runCounters();
    }
  }

  // ==========================================================================
  // 12. Text Decode / Scramble Micro-Animation
  // ==========================================================================
  function initTextScramble() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const badges = document.querySelectorAll('.hero-tag-badge, .section-tag-badge');
    const GLYPHS = '!<>-_\\/[]{}—=+*^?#0123456789ABCDEF';

    badges.forEach((badge) => {
      const textEl = badge.querySelector('span') || badge;
      const originalText = textEl.textContent.trim();
      if (!originalText) return;

      let isScrambling = false;

      function scramble() {
        if (isScrambling) return;
        isScrambling = true;

        const chars = originalText.split('');
        const duration = 450;
        const startTime = performance.now();

        function tick(now) {
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / duration);
          const settledCount = Math.floor(progress * chars.length);

          const scrambled = chars.map((char, index) => {
            if (char === ' ') return ' ';
            if (index < settledCount) return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }).join('');

          textEl.textContent = scrambled;

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            textEl.textContent = originalText;
            isScrambling = false;
          }
        }

        requestAnimationFrame(tick);
      }

      badge.addEventListener('mouseenter', scramble);

      // Trigger decode once on the hero badge on initial load
      if (badge.classList.contains('hero-tag-badge')) {
        setTimeout(scramble, 750);
      }
    });
  }

  // ==========================================================================
  // 13. Smooth Active Navbar Highlight Tracker
  // ==========================================================================
  function initActiveNavTracker() {
    const sectionIds = ['hero', 'about', 'skills', 'projects', 'contact-block'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const desktopLinks = document.querySelectorAll('.nav-links .nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-drawer .mobile-link');

    if (!sections.length) return;

    function updateActiveNav() {
      const scrollY = lenisInstance ? lenisInstance.scroll : (window.scrollY || window.pageYOffset || 0);
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      let currentId = sections[0].id;

      // When scrolled near bottom of page, highlight contact
      if (scrollY + viewportHeight >= documentHeight - 70) {
        currentId = 'contact-block';
      } else {
        sections.forEach((section) => {
          const sectionTop = section.offsetTop - 120;
          const sectionHeight = section.offsetHeight;
          if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentId = section.id;
          }
        });
      }

      desktopLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      mobileLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }

    if (lenisInstance) {
      lenisInstance.on('scroll', updateActiveNav);
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
  }

  // ==========================================================================
  // 14. Orchestrated Master Init
  // ==========================================================================
  function init() {
    initSmoothScroll();
    initBackgroundFrameCanvas();
    initPreloader(() => {
      initEntranceAnimations();
    });
    initCardSpotlightAndTilt();
    initMagneticCursor();
    initHeroCodeCard();
    initCommandPalette();
    initProjectQuickView();
    initInteractions();
    initStatCounters();
    initTextScramble();
    initActiveNavTracker();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
