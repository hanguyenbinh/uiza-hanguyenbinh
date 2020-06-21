import { createElement } from '../utils/elements';

const UzLikeDisklike = {
  setup() {
    UzLikeDisklike.ready.call(this);
  },

  ready() {
    const player = this;
    // Listen fragment buffered
    const likeAndDislikeElem = createElement('div', { class: this.config.classNames.likeAndDislike });
    const likeContent = document.createTextNode('Like');
    const dislikeContent = document.createTextNode('Dislike');
    const likeElem = createElement('div');
    const dislikeElem = createElement('div');
    likeElem.appendChild(likeContent);
    dislikeElem.appendChild(dislikeContent);

    likeAndDislikeElem.appendChild(likeElem);
    likeAndDislikeElem.appendChild(dislikeElem);

    player.elements.controls.appendChild(likeAndDislikeElem);
  },
};

export default UzLikeDisklike;
