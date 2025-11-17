import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

window.Webflow ||= [];
window.Webflow.push(() => {
  let mm = gsap.matchMedia();
  let scrollTriggerInstance = null;

  mm.add('(min-width: 992px)', () => {
    const imageWrapper = document.querySelector('.pratices_desktop-image-wrapper');
    const contentTrack = document.querySelector('.practices_content-track');

    // Early return if required elements don't exist
    if (!imageWrapper || !contentTrack) return;

    const images = imageWrapper.querySelectorAll('img');

    if (images.length === 0) return;

    // Transition offset - adjust this value to make images change earlier/later
    const transitionOffset = 0.05; // 10% earlier (try 0.05 for 5% or 0.15 for 15%)

    // Set initial state - first image visible, rest invisible
    gsap.set(images, { opacity: 0 });
    gsap.set(images[0], { opacity: 1 });

    scrollTriggerInstance = ScrollTrigger.create({
      trigger: '.practices_content-bottom',
      start: 'top 96px',
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // Move content track
        const moveDistance = -(progress * (images.length - 1) * (100 / images.length));
        gsap.set(contentTrack, { y: `${moveDistance}%` });

        // Animate images with offset
        images.forEach((image, index) => {
          const baseTriggerPoint = index / (images.length - 1);
          const triggerPoint = Math.max(0, baseTriggerPoint - transitionOffset);
          const targetOpacity = progress >= triggerPoint ? 1 : 0;

          gsap.to(image, {
            opacity: targetOpacity,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      },
    });

    ScrollTrigger.refresh();

    // Cleanup function
    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
        scrollTriggerInstance = null;
      }

      gsap.set(images, { clearProps: 'all' });
      gsap.set(contentTrack, { clearProps: 'all' });
      ScrollTrigger.refresh();
    };
  });
});
