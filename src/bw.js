import { Color, Solver } from './js/FilterGenerator.js';
import './bw.scss';


const DEBUG = false;


class BW {


  constructor() {
    this._lang = localStorage.getItem('website-lang');
    if (this._lang === null) {
      this._lang = (['fr', 'es', 'de', 'en'].indexOf(navigator.language.substring(0, 2)) !== -1) ? navigator.language.substring(0, 2) : 'en';
      localStorage.setItem('website-lang', this._lang);
    }
    this._nls = null;
    this._band = null;
    this._mainScroll = null;
    this._version = '1.1.1';

    if (DEBUG === true) { console.log(`BandWebsite v${this._version} : Begin website initialization`); }

    this._initLang()
      .then(this._fetchBandInfo.bind(this))
      .then(this._init.bind(this))
      .then(this._buildPage.bind(this))
      .then(this._events.bind(this))
      .catch(err => { // Error are displayed even if DEBUG is set to false, to notify end user to contact support
        console.error(`BandWebsite v${this._version} : Fatal error during initialization, please contact support :\n`, err);
      })
      .finally(() => {
        if (DEBUG === true) { console.log(`BandWebsite v${this._version} : Website initialization done`); }
      });
  }


  _initLang() {
    if (DEBUG === true) { console.log(`1. Fetch language keys with ${this._lang} locale`); }
    return new Promise((resolve, reject) => {
      fetch(`assets/json/${this._lang}.json`).then(data => {
        data.json().then(nlsKeys => {
          if (DEBUG === true) { console.log(`2. Language keys successfully retrieven`); }
          this._nls = nlsKeys;

          const select = document.getElementById('lang-select');
          for (let i = 0; i < select.children.length; ++i) {
            select.children[i].innerHTML = this._nls.lang[select.children[i].value];
            if (select.children[i].value === this._lang) {
              select.children[i].setAttribute('selected', true);
            }
          }
          
          select.addEventListener('change', e => {
            localStorage.setItem('website-lang', e.target.value);
            window.location.reload();
          });

          resolve();
        }).catch(err => {
          if (DEBUG === true) { console.log(`Err. Can't parse language keys, the JSON file may be is invalid`); }
          reject(err);
        });
      }).catch(err => {
        if (DEBUG === true) { console.log(`Err. Couldn't retrieve language keys`); }
        reject(err);
      });
    });
  }


  _fetchBandInfo() {
    if (DEBUG === true) { console.log(`1. Fetch band links and releases`); }
    return new Promise((resolve, reject) => {
      fetch(`assets/json/band.json`).then(data => {
        data.json().then(bandKeys => {
          if (DEBUG === true) { console.log(`2. Links and releases successfully retrieven`); }
          this._band = bandKeys;
          resolve();
        }).catch(err => {
          if (DEBUG === true) { console.log(`Err. Can't parse language keys, the JSON file may be is invalid`); }
          reject(err);
        });
      }).catch(err => {
        if (DEBUG === true) { console.log(`Err. Couldn't retrieve language keys`); }
        reject(err);
      });
    });
  }


  _init() {
    if (DEBUG === true) { console.log(`5. Updatde css to take color and style value into account`); }
    return new Promise((resolve, reject) => {
      // Only update cs variables if precised in band.json, keep default otherwise
      if (this._band.styles) {
        document.documentElement.style.setProperty('--color-main', this._band.styles.mainColor);
        document.documentElement.style.setProperty('--gradientStart', this._band.styles.gradientStart);
        document.documentElement.style.setProperty('--gradientEnd', this._band.styles.gradientEnd);
        // Create filter css rule from main color color
        const rgb = Color.hexToRgb(this._band.styles.mainColor);
        const color = new Color(rgb[0], rgb[1], rgb[2]);
        const solver = new Solver(color);
        const result = solver.solve();
        document.documentElement.style.setProperty('--imageFilter', result.filter);
        resolve();
      } else {
        reject(new Error('Not styles found in JSON file'));
      }
    });
  }


  _buildPage() {
    if (DEBUG === true) { console.log(`6. Build HTML DOM depending on the page type`); }
    return new Promise((resolve, reject) => {
      if (document.body.dataset.type === 'index') {
        this._buildIndexPage();
      } else if (document.body.dataset.type === 'listen') {
        this._buildListenPage();
      } else if (document.body.dataset.type === 'tree') {
        this._buildTreePage();
      } else {
        if (DEBUG === true) { console.log(`Err. Unknown page type to init the website with`); }
        reject(new Error('Invalid <body> type. Should be either index, listen or tree'));
      }
      resolve();
    });
  }


  _buildIndexPage() {
    if (DEBUG === true) { console.log(`6. Init website with the artist main page`); }
    document.querySelector('#band-name').innerHTML = this._band.name;
    document.querySelector('#band-picture').src = `./assets/img/artists/${this._band.bandPicture}`;
    document.querySelector('#band-desc').innerHTML = this._band.bio[this._lang];
    document.querySelector('#listen-link').innerHTML = `<img src="./assets/img/controls/disc.svg" alt="listen">${this._nls.listenLink}`;
    document.querySelector('#tree-link').innerHTML = `<img src="./assets/img/controls/find.svg" alt="listen">${this._nls.treeLink}`;
    document.querySelector('#musicians-section').innerHTML = this._nls.musicians;
    document.querySelector('#works-section').innerHTML = this._nls.works;
    document.querySelector('#medias-section').innerHTML = this._nls.medias;
    document.querySelector('#current-year').innerHTML = new Date().getFullYear();
    // Iterate band release to build albums
    for (let i = 0; i < this._band.releases.length; ++i) {
      if (this._band.releases[i].showOnMainPage === true) {
        const container = document.createElement('DIV');
        container.dataset.url = this._getReleaseLink(this._band.releases[i].links);
        const picture = document.createElement('IMG');
        picture.src = `./assets/img/releases/${this._band.releases[i].cover}`;
        const date = new Intl.DateTimeFormat(this._lang, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(new Date(this._band.releases[i].date));
        const label = document.createElement('P');
        label.innerHTML = `
          ${this._band.releases[i].title}
          <span>${this._band.releases[i].artist}</span>
          <span>${date}</span>
        `;
        container.addEventListener('click', this._openReleaseVideo.bind(this, container.dataset.url));
        container.appendChild(picture);
        container.appendChild(label);
        document.getElementById('releases').appendChild(container);
      }
    }
    // Iterate through band members
    for (let i = 0; i < this._band.members.length; ++i) {
      const container = document.createElement('DIV');
      container.dataset.artist = this._band.members[i].fullName;
      const picture = document.createElement('IMG');
      picture.src = `./assets/img/artists/${this._band.members[i].picture}`;
      const label = document.createElement('P');
      label.innerHTML = `
        ${this._band.members[i].fullName}
        <span>© ${this._band.members[i].pictureCredit}</span>
        <span class="learn-more">${this._nls.learnMore}</span>
      `;
      container.addEventListener('click', this._artistModal.bind(this, this._band.members[i]));
      container.appendChild(picture);
      container.appendChild(label);
      document.getElementById('artists').appendChild(container);
    }
    // Iterate through past band members if any
    if (this._band.pastMembers.length > 0) {
      const container = document.createElement('DIV');
      container.classList.add('past-members');
      const label = document.createElement('P');
      label.innerHTML = `
        ${this._nls.pastMembers}
        <span id="learn-more" class="learn-more">${this._nls.learnMore}</span>
      `;
      container.addEventListener('click', this._pastMembersModal.bind(this, this._band.pastMembers));
      container.appendChild(label);
      document.getElementById('artists').appendChild(container);
    }
    // Iterate through band's medias
    for (let i = 0; i < this._band.medias.length; ++i) {
      let container = null;
      if (this._band.medias[i].type === 'iframe') {
        container = document.createElement('IFRAME');
        container.title = this._band.medias[i].title;
        container.src = this._band.medias[i].link;
        container.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups');
        container.setAttribute('frameborder', '0');
        container.setAttribute('allowfullscreen', '1');
      } else if (this._band.medias[i].type === 'image') {
        container = document.createElement('IMG');
        container.src = this._band.medias[i].link;
      }
      document.getElementById('medias').appendChild(container);
    }
    // Now build page scroll
    this._mainScroll = new window.ScrollBar({
      target: document.getElementById('content-wrapper'),
      minSize: 200,
      style: {
        color: this._band.styles.mainColor
      }
    });
    // Hide loading overlay
    document.getElementById('loading-overlay').style.opacity = '0';
    // Force render after scroll creation to make scrollbar properly resized to content
    setTimeout(() => {
      this._mainScroll.updateScrollbar();
    }, 200);
    // Display none on loading overlay when animation fade out is finished
    setTimeout(() => {
      document.getElementById('loading-overlay').style.display = 'none';
    }, 1200);
  }


  _buildListenPage() {
    if (DEBUG === true) { console.log(`6. Init website with the artist listen page`); }
    // Update page nls
    document.querySelector('#release-from').innerHTML = this._nls.from;
    document.querySelector('#listen-online').innerHTML = this._nls.listenOnline;
    document.querySelector('#see-more-links').innerHTML = this._nls.seeMore;
    document.querySelector('#published-on').innerHTML = this._nls.publishedOn;
    // Internal useful variables
    const progress = document.getElementById('current-progress');
    const overlay = document.getElementById('modal-overlay');
    let audio = new Audio();
    let activeRelease = 0;
    // Define internal functions to update UI according to selected release
    const updateRelease = () => {
      // Reset audio playback and playback UI
      audio.pause();
      audio.currentTime = 0;
      progress.style.width = '0';
      // Update active release
      const release = this._band.releases[activeRelease];
      const date = new Intl.DateTimeFormat(this._lang, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(new Date(release.date));
      // Update blurred backgrounds
      document.getElementById('release-background').style.backgroundImage = `url('assets/img/releases/${release.cover}')`;
      document.getElementById('release-background-bottom').style.backgroundImage = `url('assets/img/releases/${release.cover}')`;
      // Update release primitive information
      document.getElementById('release-cover').src = `assets/img/releases/${release.cover}`;
      document.getElementById('release-duration').innerHTML = release.duration;
      document.getElementById('release-title').innerHTML = release.title;
      document.getElementById('release-artist').innerHTML = release.artist;
      document.getElementById('release-date').innerHTML = date;
      document.getElementById('label-link').innerHTML = release.label;
      document.getElementById('label-link').href = release.labelLink;
      // Update view links according to the selected release
      for (let i = 0; i < release.links.length; ++i) {
        if (release.links[i].url === '') { // Link type has no url and should be disabled
          document.getElementById(release.links[i].type).classList.add('disabled'); // Only disabled button
        } else { // Update link information
          document.getElementById(release.links[i].type).classList.remove('disabled'); // Clear previous disabled class
          document.getElementById(release.links[i].type).href = release.links[i].url; // Update url href link
        }
      }
      // Create tracks and append them to the concerned DOM
      document.getElementById('release-tracklist').innerHTML = this._buildTrackCredits(release.tracks);
      // Update justify content if scroll exists
      if (document.getElementById('release-tracklist').scrollHeight > document.getElementById('release-tracklist').clientHeight) {
        document.getElementById('release-tracklist').style.display = 'inherit';
        setTimeout(() => {
          const trackScroll = new window.ScrollBar({
            target: document.getElementById('release-tracklist'),
            style: {
              color: this._band.styles.mainColor
            }
          });
          // Force raf after scroll creation to make scrollbar properly visible
          requestAnimationFrame(() => {
            trackScroll.updateScrollbar();
          });
        }, 100);
      }
      audio = new Audio(`assets/audio/${release.audio}`);
      handlePlayback(audio);
      // Update pager selected item
      if (this._band.releases.length < 35 && this._band.releases.length !== 1) {
        document.getElementById('release-pager').children[activeRelease].classList.add('selected');
      }
    };
    // Handle the audio playback and events
    const handlePlayback = () => {
      const button = document.getElementById('play-pause');
      button.src = 'assets/img/controls/play.svg';
      const progressTrack = document.getElementById('progress-bar');
      const progress = document.getElementById('current-progress');
      let playing = false;
      // Handle click on play/pause button
      button.addEventListener('click', () => {
        if (playing === true) {
          playing = false;
          button.src = 'assets/img/controls/play.svg';
          audio.pause();
        } else {
          playing = true;
          button.src = 'assets/img/controls/pause.svg';
          audio.play();
        }
      });
      // Update progress on audio playing
      audio.addEventListener('timeupdate', () => {
        progress.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
      });
      // Reset progress and audio when playback reached the end of tracks
      audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        progress.style.width = '0';
        button.src = 'assets/img/controls/play.svg';
        playing = false;
      });
      // User manually seek a part of audio
      progressTrack.addEventListener('click', event => {
        if (playing === true) {
          const box = progressTrack.getBoundingClientRect();
          audio.currentTime = ((event.clientX - box.left) / box.width) * audio.duration;
          progress.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
        }
      });
    };
    // Previous and next release event handling if more than one release
    if (this._band.releases.length === 1) {
      document.getElementById('release-previous').style.display = 'none';
      document.getElementById('release-next').style.display = 'none';
    } else {
      document.getElementById('release-previous').addEventListener('click', e => {
        e.target.blur();
        if (this._band.releases.length < 35 && this._band.releases.length !== 1) {
          document.getElementById('release-pager').children[activeRelease].classList.remove('selected');
        }
        activeRelease = (this._band.releases.length + activeRelease - 1) % this._band.releases.length;
        updateRelease();
      });
      document.getElementById('release-next').addEventListener('click', e => {
        e.target.blur();
        if (this._band.releases.length < 35 && this._band.releases.length !== 1) {
          document.getElementById('release-pager').children[activeRelease].classList.remove('selected');
        }
        activeRelease = (activeRelease + 1) % this._band.releases.length;
        updateRelease();
      });

      if (this._band.releases.length && this._band.releases.length < 35 && this._band.releases.length !== 1) {
        for (let i = 0; i < this._band.releases.length; ++i) {
          const releasePage = document.createElement('A');
          releasePage.innerHTML = '●';
          releasePage.addEventListener('click', e => {
            document.getElementById('release-pager').children[activeRelease].classList.remove('selected');
            const parent = e.target.parentNode;
            activeRelease = Array.prototype.indexOf.call(parent.children, e.target);
            updateRelease();
          });
          releasePage.style.margin = `0 ${(3.5 / this._band.releases.length)}rem`;
          document.getElementById('release-pager').appendChild(releasePage);
        }

        document.getElementById('release-pager').style.fontSize = `${(20 / this._band.releases.length) % 5.5}rem`;
      }
    }
    // Open modal event
    document.getElementById('see-more-links').addEventListener('click', () => {
      fetch('assets/html/seemoremodal.html').then(data => {
        overlay.style.display = 'flex';
        data.text().then(htmlString => {
          overlay.appendChild(document.createRange().createContextualFragment(htmlString));
          const release = this._band.releases[activeRelease];
          for (let i = 0; i < release.moreLinks.length; ++i) {
            if (release.moreLinks[i].url === '') { // Link type has no url and should be disabled
              document.getElementById(release.moreLinks[i].type).classList.add('disabled'); // Only disabled button
            } else { // Update link information
              document.getElementById(release.moreLinks[i].type).classList.remove('disabled'); // Clear previous disabled class
              document.getElementById(release.moreLinks[i].type).href = release.moreLinks[i].url; // Update url href link
            }
          }
          overlay.querySelector('#close-modal-button').innerHTML = this._nls.close;
          requestAnimationFrame(() => overlay.style.opacity = 1);
        });
      }).catch(e => console.error(e));
    });
    // Update UI with first release available in array
    updateRelease();
    // Hide loading overlay
    document.getElementById('loading-overlay').style.opacity = '0';
    // Display none on loading overlay when animation fade out is finished
    setTimeout(() => {
      document.getElementById('loading-overlay').style.display = 'none';
    }, 1200);
  }


  _buildTreePage() {
    if (DEBUG === true) { console.log(`6. Init website with the artist link tree`); }
    // Iterate over link to create link content
    for (let i = 0; i < this._band.links.length; ++i) {
      document.querySelector('#link-container').innerHTML += `
      <a href="${this._band.links[i].url}" class="link" target="_blank" rel="noopener noreferrer">
        <img src="assets/img/logo/${this._band.links[i].type}.svg" width="25px">
        <p>${this._band.links[i].name}</p>
      </a>
      `;
    }
    this._mainScroll = new window.ScrollBar({
      target: document.getElementById('link-wrapper'),
      style: {
        color: this._band.styles.mainColor
      }
    });
    // Hide loading overlay
    document.getElementById('loading-overlay').style.opacity = '0';
    // Force render after scroll creation to make scrollbar properly resized to content
    setTimeout(() => {
      this._mainScroll.updateScrollbar();
    }, 200);
    // Display none on loading overlay when animation fade out is finished
    setTimeout(() => {
      document.getElementById('loading-overlay').style.display = 'none';
    }, 1200);
  }


  _events() {
    // Blur modal event
    document.getElementById('modal-overlay').addEventListener('click', this._closeModal.bind(this));
  }


  // Utils for main page


  _artistModal(artist) {
    const overlay = document.getElementById('modal-overlay');
    // Open modal event
    fetch(`assets/html/biomodal.html`).then(data => {
      overlay.style.display = 'flex';
      data.text().then(htmlString => {
        const container = document.createRange().createContextualFragment(htmlString);
        container.querySelector('#artist-name').innerHTML = artist.fullName;
        container.querySelector('#artist-picture').src = `./assets/img/artists/${artist.picture}`;
        for (let i = 0; i < artist.roles.length; ++i) {
          container.querySelector('#artist-roles').innerHTML += this._nls.roles[artist.roles[i]];
          if (i + 1 < artist.roles.length) {
            container.querySelector('#artist-roles').innerHTML += ', ';
          }
        }
        container.querySelector('#artist-roles').innerHTML += ` ${this._nls.since} ${artist.range.split('-')[0]}`;
        container.querySelector('#artist-bio').innerHTML = artist.bio[this._lang];
        container.querySelector('#close-modal-button').innerHTML = this._nls.close;
        overlay.appendChild(container);
        requestAnimationFrame(() => overlay.style.opacity = 1);
      });
    }).catch(e => console.error(e));
  }


  _pastMembersModal(pastMembers) {
    const overlay = document.getElementById('modal-overlay');
    // Open modal event
    fetch(`assets/html/pastmembersmodal.html`).then(data => {
      overlay.style.display = 'flex';
      data.text().then(htmlString => {
        const container = document.createRange().createContextualFragment(htmlString);
        container.querySelector('#modal-title').innerHTML = this._nls.pastMembers;
        const artistsContainer = container.querySelector('#past-members-container');
        for (let i = 0; i < pastMembers.length; ++i) {
          const member = document.createElement('DIV');
          member.classList.add('past-member');
          let roles = '';
          for (let j = 0; j < pastMembers[i].roles.length; ++j) {
            roles += this._nls.roles[pastMembers[i].roles[j]];
            if (j + 1 < pastMembers[i].roles.length) {
              roles += ', ';
            }
          }
          roles += ` ${this._nls.from} ${pastMembers[i].range.split('-')[0]} ${this._nls.to} ${pastMembers[i].range.split('-')[1]}`;
          member.innerHTML = `
          <div><img src="./assets/img/artists/${pastMembers[i].picture}"><i>© ${pastMembers[i].pictureCredit}</i></div>
          <div class="past-member-infos">
            <span><h3>${pastMembers[i].fullName}</h3> – <i>${roles}</i></span>
            <p>${pastMembers[i].bio[this._lang]}</p>
          </div>
          `;
          artistsContainer.appendChild(member);
        }
        container.querySelector('#close-modal-button').innerHTML = this._nls.close;
        overlay.appendChild(container);
        // Force timeout to wait for draw, then raf to display scroll
        setTimeout(() => {
          const scroll = new window.ScrollBar({
            target: overlay.querySelector('#past-members-container'),
            style: {
              color: this._band.styles.mainColor
            }
          });
          // Force raf after scroll creation to make scrollbar properly visible
          requestAnimationFrame(() => {
            scroll.updateScrollbar();
          });
        }, 100);
        // Open modal
        requestAnimationFrame(() => overlay.style.opacity = 1);
      });
    }).catch(e => console.error(e));
  }


  _closeModal(e) {
    if (e.target.id !== 'modal-overlay' && e.target.className !== 'close-modal') {
      return;
    }

    const overlay = document.getElementById('modal-overlay');
    if (overlay.style.display === 'flex') {
      overlay.style.opacity = 0;
      setTimeout(() => {
        overlay.innerHTML = '';
        overlay.style = '';
      }, 400);
    }
  }


  _getReleaseLink(links) {
    let url = '';
    for (let i = 0; i < links.length; ++i) {
      if (links[i].url !== '') {
        url = links[i].url;

        if (links[i].type === 'youtube') {
          return links[i].url;
        }
      }
    }

    return url;
  }


  _openReleaseVideo(url) {
    window.open(url, '_blank').focus();
  }


  // Utils for listen page


  _buildTrackCredits(tracks) {
    let dom = '';
    for (let i = 0; i < tracks.length; ++i) {
      dom += `<h3>${i + 1}. ${tracks[i].title} – ${tracks[i].duration}</h3><p>`;
      if (tracks[i].composer !== '') { // Add composer if any
        dom += `<i>${this._nls.composer}</i> : ${tracks[i].composer}<br>`;
      }
      if (tracks[i].author !== '') { // Add author if any
        dom += `<i>${this._nls.author}</i> : ${tracks[i].author}`;
      }
      dom += `</p>`;
    }
    return dom;
  }


}


export default BW;
