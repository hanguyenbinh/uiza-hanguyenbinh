import events from '../events';
import { createElement } from '../utils/elements';

const UzPause = {
  begin: false,
  timeStart: 0,
  timeEnd: 5000,
  isPlaying: false,
  trackingTimer: null,
  timeTemp: 0,

  setup() {
    UzPause.ready.call(this);
  },

  ready() {
    const player = this;
    // Listen fragment buffered
    const pauseText = createElement('div', { class: this.config.classNames.pauseText });
    pauseText.style.display = 'none';
    const content = document.createTextNode('Continue playing');
    pauseText.appendChild(content);

    player.elements.container.appendChild(pauseText);

    player.on(events.ENDED, event => {
      console.log('ended');
      console.log(event);
    });
    player.on(events.PAUSE, event => {
      console.log('pause');
      console.log(event);
      clearTimeout(UzPause.trackingTimer);
      pauseText.style.display = '';
      UzPause.timeStart = UzPause.timeStart + (Date.now() - UzPause.timeTemp);
    });
    player.on(events.PLAY, event => {
      pauseText.style.display = 'none';
      if (UzPause.begin === false) {
        console.log('first started');
        UzPause.begin = true;
        UzPause.timeStart = 0;
      }
      UzPause.timeTemp = Date.now();
      const leftTime = UzPause.timeEnd - UzPause.timeStart;
      console.log('leftTIme', leftTime);
      if (leftTime > 0) {
        UzPause.trackingTimer = setTimeout(() => {
          console.log('tracking time', player.elements.buttons);
          player.elements.buttons.play[0].click();
        }, leftTime);
      }
    });
  },
  tracking() {
    console.log('tracking', this);
  },
};

export default UzPause;
