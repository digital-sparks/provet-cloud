import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import './plyr-styles.css';

window.Webflow.push(() => {
  const videoElements = document.querySelectorAll(
    '.blog-content_rich-text video, .layout-style-5_image-wrapper video, .layout-style-3_video-wrapper video'
  );

  const audioElements = document.querySelectorAll('audio');

  const videoPlayers = Array.from(videoElements).map((video) => {
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

  const audioPlayers = Array.from(audioElements).map((audio) => {
    return new Plyr(audio, {
      controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'settings'],
      autoplay: false,
      playsinline: true,
    });
  });
});
