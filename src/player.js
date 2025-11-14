import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import './plyr-styles.css';

window.Webflow.push(() => {
  const videoElements = document.querySelectorAll('.blog-content_rich-text video');

  const players = Array.from(videoElements).map((video) => {
    return new Plyr(video, {
      controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'mute',
        'volume',
        'settings',
        'fullscreen',
      ],
      settings: ['quality', 'speed'],
      autoplay: false,
      playsinline: true,
    });
  });
});
