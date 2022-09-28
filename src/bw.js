import './bw.scss';


const DEBUG = false;


class BW {


  constructor() {
    this._lang = (['fr', 'es', 'de'].indexOf(navigator.language.substring(0, 2)) !== -1) ? navigator.language.substring(0, 2) : 'en';
    this._nls = null;
    this._band = null;
    this._version = '0.2.1';

    if (DEBUG === true) { console.log(`BandWebsite v${this._version} : Begin website initialization`); }

    this._fetchLang()
      .then(this._fetchBandInfo.bind(this))
      .then(this._init.bind(this))
      .catch(err => { // Error are displayed even if DEBUG is set to false, to notify end user to contact support
        console.error(`BandWebsite v${this._version} : Fatal error during initialization, please contact support :\n`, err);
      })
      .finally(() => {
        if (DEBUG === true) { console.log(`BandWebsite v${this._version} : Website initialization done`); }
      });
  }


  _fetchLang() {
    if (DEBUG === true) { console.log(`1. Fetch language keys with ${this._lang} locale`); }
    return new Promise((resolve, reject) => {
      fetch(`assets/json/${this._lang}.json`).then(data => {
        data.json().then(nlsKeys => {
          if (DEBUG === true) { console.log(`2. Language keys successfully retrieven`); }
          this._nls = nlsKeys;
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
    if (DEBUG === true) { console.log(`5. Build HTML DOM depending on the page type`); }
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
    document.querySelector('#band-name').innerHTML = this._nls.band.name;
    document.querySelector('#band-desc').innerHTML = this._nls.band.desc;
    document.querySelector('#listen-link').innerHTML = `<img src="./assets/img/controls/disc.svg" alt="listen">${this._nls.listenLink}`;
    document.querySelector('#tree-link').innerHTML = `<img src="./assets/img/controls/find.svg" alt="listen">${this._nls.treeLink}`;
    document.querySelector('#musicians-section').innerHTML = this._nls.musicians;
    document.querySelector('#works-section').innerHTML = this._nls.works;

    for (let i = 0; i < this._band.members.length; ++i) {
      const container = document.createElement('DIV');
      container.dataset.artist = this._band.members[i].fullName;
      const picture = document.createElement('IMG');
      picture.src = `./assets/img/artists/${this._band.members[i].picture}`;
      const label = document.createElement('P');
      label.innerHTML = `
        ${this._band.members[i].fullName}<br>
        <span>© ${this._band.members[i].pictureCredit}</span><br>
        <span id="learn-more" class="learn-more">${this._nls.learnMore}</span>
      `;
      container.addEventListener('click', this._artistModal.bind(this, this._band.members[i]));
      container.appendChild(picture);
      container.appendChild(label);
      document.getElementById('artists').appendChild(container);
    }

    for (let i = 0; i < this._band.releases.length; ++i) {
      const container = document.createElement('DIV');
      container.dataset.url = this._getReleaseLink(this._band.releases[i].links);
      const picture = document.createElement('IMG');
      picture.src = `./assets/img/releases/${this._band.releases[i].cover}`;
      const label = document.createElement('P');
      label.innerHTML = `
        ${this._band.releases[i].title}<br>
        <span>${this._band.releases[i].artist}</span><br>
        <span>${this._buildReleaseDate(this._band.releases[i].date)}</span>
      `;
      container.addEventListener('click', this._openReleaseVideo.bind(this, container.dataset.url));
      container.appendChild(picture);
      container.appendChild(label);
      document.getElementById('releases').appendChild(container);      
    }

    new window.ScrollBar({
      target: document.body
    });
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
      // Update blurred backgrounds
      document.getElementById('release-background').style.backgroundImage = `url('assets/img/releases/${release.cover}')`;
      document.getElementById('release-background-bottom').style.backgroundImage = `url('assets/img/releases/${release.cover}')`;
      // Update release primitive information
      document.getElementById('release-cover').src = `assets/img/releases/${release.cover}`;
      document.getElementById('release-duration').innerHTML = release.duration;
      document.getElementById('release-title').innerHTML = release.title;
      document.getElementById('release-artist').innerHTML = release.artist;
      document.getElementById('release-date').innerHTML = this._buildReleaseDate(release.date);
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
        new window.ScrollBar({
          target: document.getElementById('release-tracklist')
        });
      }
      audio = new Audio(`assets/audio/${release.audio}`);
      handlePlayback(audio);
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
        activeRelease = (this._band.releases.length + activeRelease - 1) % this._band.releases.length;
        updateRelease(activeRelease);
      });
      document.getElementById('release-next').addEventListener('click', e => {
        e.target.blur();
        activeRelease = (activeRelease + 1) % this._band.releases.length;
        updateRelease(activeRelease);
      });
    }
    // Blur modal event
    document.getElementById('modal-overlay').addEventListener('click', () => {
      overlay.style.opacity = 0;
      setTimeout(() => {
        overlay.innerHTML = '';
        overlay.style.display = 'none';
      }, 400);
    });
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
          requestAnimationFrame(() => overlay.style.opacity = 1);
        });
      }).catch(e => console.error(e) );
    });
    // Update UI with first release available in array
    updateRelease(activeRelease);
  }


  _buildTreePage() {
    if (DEBUG === true) { console.log(`6. Init website with the artist link tree`); }
    // Iterate over link to create link content
    for (let i = 0; i < this._band.links.length; ++i) {
      document.querySelector('#link-wrapper').innerHTML += `
      <a href="${this._band.links[i].url}" class="link" target="_blank" rel="noopener noreferrer">
        <img src="assets/img/logo/${this._band.links[i].type}.svg" width="25px">
        <p>${this._band.links[i].name}</p>
      </a>
      `;
    }

    new window.ScrollBar({
      target: document.getElementById('link-wrapper')
    });
  }


  // Utils for main page


  _artistModal(artist) {
    const overlay = document.getElementById('modal-overlay');
    // Blur modal event
    document.getElementById('modal-overlay').addEventListener('click', () => {
      overlay.style.opacity = 0;
      setTimeout(() => {
        overlay.innerHTML = '';
        overlay.style.display = 'none';
      }, 400);
    });
    // Open modal event
    fetch(`assets/html/biomodal.html`).then(data => {
      overlay.style.display = 'flex';
      data.text().then(htmlString => {
        const container = document.createRange().createContextualFragment(htmlString);
        container.querySelector('#artist-name').innerHTML = artist.fullName;
        container.querySelector('#artist-picture').src = `./assets/img/artists/${artist.picture}`;
        container.querySelector('#artist-bio').innerHTML = artist.bio[this._lang];
        overlay.appendChild(container);
        requestAnimationFrame(() => overlay.style.opacity = 1);
      });
    }).catch(e => console.error(e) );
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


  _buildReleaseDate(date) {
    const dateArray = date.split('-');
    if (this._lang === 'en') {
      return `${this._nls.months[dateArray[1] - 1]} ${dateArray[0].replace(/^0+/, '')}, ${dateArray[2]}`;
    } else {
      return `${dateArray[0].replace(/^0+/, '')} ${this._nls.months[dateArray[1] - 1]} ${dateArray[2]}`;
    }
  }


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
