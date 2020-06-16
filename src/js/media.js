// ==========================================================================
// Uiza Media
// ==========================================================================

import html5 from './html5';
import hlsjs from './plugins/hlsjs';
import { createElement, toggleClass, wrap } from './utils/elements';

const media = {
  // Setup media
  setup() {
    // If there's no media, bail
    if (!this.media) {
      this.debug.warn('No media element found!');
      return;
    }

    // Add type class
    toggleClass(this.elements.container, this.config.classNames.type.replace('{0}', this.type), true);

    // Add provider class
    toggleClass(this.elements.container, this.config.classNames.provider.replace('{0}', this.provider), true);

    // Add video class for embeds
    // This will require changes if audio embeds are added
    if (this.isEmbed) {
      toggleClass(this.elements.container, this.config.classNames.type.replace('{0}', 'video'), true);
    }

    // Inject the player wrapper
    if (this.isVideo) {
      // Create the wrapper div
      this.elements.wrapper = createElement('div', {
        class: this.config.classNames.video,
      });

      // Wrap the video in a container
      wrap(this.media, this.elements.wrapper);

      // Faux poster container
      this.elements.poster = createElement('div', {
        class: this.config.classNames.poster,
      });

      this.elements.wrapper.appendChild(this.elements.poster);
    }

    if (this.isHlsjs) {
      hlsjs.setup.call(this);
    } else if (this.isHTML5) {
      html5.setup.call(this);
    }
  },
};

export default media;
