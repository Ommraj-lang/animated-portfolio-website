/**
 * CodeCraft - Smooth Scroll Frame Animation & Interactive Portfolio Engine
 * - Apple-grade canvas video frame scrubbing with LERP momentum physics
 * - Dynamic skill progress bar animations on viewport intersection
 * - Active navigation tracker & mobile drawer
 * - Interactive modal & contact form handlers
 */

(() => {
  'use strict';

  const TOTAL_FRAMES = 300;
  const LERP_FACTOR = 0.085; // Silky smooth Apple-style inertia
  const FRAME_URL = (index) => `video_frames_30fps/frame_${String(index).padStart(6, '0')}.jpg`;

  // DOM Elements
  const canvas = document.getElementById('animationCanvas');
  const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
  const progressBar = document.getElementById('progressBar');
  const loaderOverlay = document.getElementById('loaderOverlay');
  const loaderPercent = document.getElementById('loaderPercent');
  const loaderFill = document.getElementById('loaderFill');
  const scrollHint = document.getElementById('scrollHint');

  // Navigation & Modal Elements
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');
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

  // Animation State
  const frames = new Array(TOTAL_FRAMES + 1);
  let loadedCount = 0;
  let targetProgress = 0;
  let currentProgress = 0;
  let lastDrawnIndex = -1;
  let needsRedraw = true;
  let isReady = false;

  // 1. High-DPI Canvas Sizing
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    needsRedraw = true;
  }

  // 2. Aspect-Ratio Cover Draw Logic
  function drawFrame(index) {
    const img = getBestAvailableFrame(index);
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover math: scale to fill viewport completely, centered
    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const nx = (cw - nw) / 2;
    const ny = (ch - nh) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, iw, ih, nx, ny, nw, nh);
  }

  // Graceful fallback to nearest loaded frame to guarantee zero flickers
  function getBestAvailableFrame(targetIndex) {
    if (frames[targetIndex]?.complete && frames[targetIndex].naturalWidth > 0) {
      return frames[targetIndex];
    }
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = targetIndex - offset;
      if (prev >= 1 && frames[prev]?.complete && frames[prev].naturalWidth > 0) {
        return frames[prev];
      }
      const next = targetIndex + offset;
      if (next <= TOTAL_FRAMES && frames[next]?.complete && frames[next].naturalWidth > 0) {
        return frames[next];
      }
    }
    return null;
  }

  // 3. Progressive Preloader
  function preloadFrames() {
    // Phase 1: Load Frame 1 immediately
    const firstImg = new Image();
    firstImg.src = FRAME_URL(1);
    firstImg.decoding = 'async';
    frames[1] = firstImg;

    firstImg.onload = () => {
      loadedCount++;
      updateProgress();
      drawFrame(1);
      lastDrawnIndex = 1;

      // Phase 2: Load key frames first, then remaining
      loadKeyFramesThenRest();
    };

    firstImg.onerror = () => {
      console.warn('Initial frame failed to load:', FRAME_URL(1));
    };
  }

  function updateProgress() {
    const percent = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));
    if (loaderPercent) loaderPercent.textContent = `${percent}%`;
    if (loaderFill) loaderFill.style.width = `${percent}%`;

    // Once critical threshold (or all frames) loaded, dismiss loader
    if (!isReady && (loadedCount >= Math.min(25, TOTAL_FRAMES) || percent >= 15)) {
      isReady = true;
      setTimeout(() => {
        loaderOverlay.classList.add('fade-out');
      }, 300);
    }
  }

  function loadKeyFramesThenRest() {
    const step = 8;
    const keyFrames = [];
    for (let i = 1 + step; i <= TOTAL_FRAMES; i += step) {
      keyFrames.push(i);
    }

    const remainingFrames = [];
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      if (i % step !== 1) {
        remainingFrames.push(i);
      }
    }

    const queue = [...keyFrames, ...remainingFrames];
    const CONCURRENCY = 10;
    let activeLoads = 0;

    function processQueue() {
      while (activeLoads < CONCURRENCY && queue.length > 0) {
        const frameIndex = queue.shift();
        activeLoads++;

        const img = new Image();
        img.src = FRAME_URL(frameIndex);
        img.decoding = 'async';
        frames[frameIndex] = img;

        img.onload = () => {
          loadedCount++;
          updateProgress();
          activeLoads--;
          processQueue();
        };

        img.onerror = () => {
          loadedCount++;
          updateProgress();
          activeLoads--;
          processQueue();
        };
      }
    }

    processQueue();
  }

  // 4. Scroll Tracking & Nav Spy
  function onScroll() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY || window.pageYOffset || 0;
    targetProgress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0;

    // Toggle scroll hint
    if (scrollTop > 50) {
      scrollHint.classList.add('hidden');
    } else {
      scrollHint.classList.remove('hidden');
    }

    // Active Section Spy
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = scrollTop + 220;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // 5. Physics Animation Loop (LERP)
  function tick() {
    const diff = targetProgress - currentProgress;
    if (Math.abs(diff) > 0.00005) {
      currentProgress += diff * LERP_FACTOR;
    } else {
      currentProgress = targetProgress;
    }

    // Top progress line
    if (progressBar) {
      progressBar.style.width = `${(currentProgress * 100).toFixed(2)}%`;
    }

    // Map progress to frame index (1 to TOTAL_FRAMES)
    const frameIndex = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(1 + currentProgress * (TOTAL_FRAMES - 1))));

    if (frameIndex !== lastDrawnIndex || needsRedraw) {
      drawFrame(frameIndex);
      lastDrawnIndex = frameIndex;
      needsRedraw = false;
    }

    requestAnimationFrame(tick);
  }

  // 6. Skill Progress Bars Animation on Viewport Entry
  function setupSkillObserver() {
    const skillBars = document.querySelectorAll('.skill-fill');
    if (!('IntersectionObserver' in window)) {
      skillBars.forEach(bar => {
        bar.style.width = bar.dataset.progress || '80%';
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.dataset.progress || '80%';
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => observer.observe(bar));
  }

  // 7. Interactive Modal & Drawer
  function setupInteractions() {
    // Mobile Drawer Toggle
    if (mobileToggleBtn && mobileDrawer) {
      mobileToggleBtn.addEventListener('click', () => {
        mobileDrawer.classList.toggle('open');
      });

      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileDrawer.classList.remove('open');
        });
      });
    }

    // Modal Triggers
    openModalBtns.forEach(btn => {
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

    // Contact Form Submission
    if (contactForm && modalFeedback) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        modalFeedback.textContent = 'Submitting your inquiry...';
        modalFeedback.style.color = 'var(--accent-purple)';

        setTimeout(() => {
          modalFeedback.textContent = '✓ Inquiry sent! I will respond within 24 hours.';
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

    // Extra modal trigger bindings if dynamically attached
    const heroContactBtn = document.getElementById('heroContactBtn');
    if (heroContactBtn && contactModal) {
      heroContactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        contactModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    }
  }

  // 8. Initialization
  function init() {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    setupInteractions();
    setupSkillObserver();
    onScroll();
    preloadFrames();
    requestAnimationFrame(tick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
