import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { SplitText } from 'gsap/SplitText';
import { MotionPathPlugin } from 'gsap/all';

gsap.registerPlugin(Observer, SplitText, MotionPathPlugin);

window.Webflow ||= [];
window.Webflow.push(() => {
  function initMovingBorderAnimations() {
    const tags = document.querySelectorAll('.tag');

    tags.forEach((tag) => {
      const container = tag.querySelector('.tag-border-animation');
      const glow = tag.querySelector('.tag-moving-glow');

      if (!container || !glow) return;

      // Kill existing animations
      gsap.killTweensOf(glow);

      // Remove old SVG if exists
      const oldSvg = container.querySelector('svg');
      if (oldSvg) oldSvg.remove();

      // Get the actual dimensions and border-radius
      const tagRect = tag.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(tag);
      const borderRadius = parseFloat(computedStyle.borderRadius) || 8;

      const w = tagRect.width;
      const h = tagRect.height;
      const r = Math.min(borderRadius, w / 2, h / 2); // Ensure radius doesn't exceed dimensions

      // Create SVG with a proper path element (not rect)
      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('width', w);
      svg.setAttribute('height', h);
      svg.style.position = 'absolute';
      svg.style.top = '0';
      svg.style.left = '0';
      svg.style.pointerEvents = 'none';
      svg.style.visibility = 'hidden';

      // Create a path element with rounded rectangle data
      const path = document.createElementNS(svgNS, 'path');
      const pathData = `
        M ${r},0
        L ${w - r},0
        Q ${w},0 ${w},${r}
        L ${w},${h - r}
        Q ${w},${h} ${w - r},${h}
        L ${r},${h}
        Q 0,${h} 0,${h - r}
        L 0,${r}
        Q 0,0 ${r},0
        Z
      `;
      path.setAttribute('d', pathData);
      path.setAttribute('fill', 'none');

      svg.appendChild(path);
      container.appendChild(svg);

      // Animate using the path element
      gsap.to(glow, {
        duration: 3,
        ease: 'none',
        repeat: -1,
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
      });
    });
  }

  setTimeout(initMovingBorderAnimations, 100);

  // Handle resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initMovingBorderAnimations, 250);
  });
});
