# BandWebsite

![](https://badgen.net/badge/version/1.2.0/blue)
[![License](https://img.shields.io/github/license/MesseBasseProduction/BandWebsite.svg)](https://github.com/MesseBasseProduction/BandWebsite/blob/main/LICENSE)

A static website template for a band, providing pages where one can find the band's biography, a list of current and past members, a list of the band's releases and a set of medias. Additionnaly to this landing page, the template also provides a page to listen to tracks and finally, a link tree to share all of the band's links! Translated in French 🇫🇷, English 🇬🇧, Spanish 🇪🇸 and German 🇩🇪. This website was meant to be as light as possible, keeping it's assets to the minimum so the navigation is lightning fast (~50Ko of bunddled assets)!

# Get started

For system administrator, here are the guidelines to fully customize this template website to your band's needs. Right after you cloned this repository, complete the following :

- fill HTML files (`index.html`, `events.html`, `listen.html`, `tree.html`), mostly for title and description (head tag), in `assets/html/` ;
- replace the band logo and the favicons\*, in `assets/img/` ;
- fill `assets/audio/` with mp3 extracts of the releases you want to make available to listeners ;
- fill `assets/img/releases/` with releases' artworks (1:1 recommended) ;
- fill `assets/img/artists/` with band members' pictures (1:1 recommended) ;
- fill `assets/img/events/` with band events' pictures (16;9 recommended) ;
- fill the `assets/json/band.json` with artist members, links, events, releases, medias and styles\*\* ;

\* *Favicon can be generated using a website such as [https://www.favicon-generator.org/](https://www.favicon-generator.org/).*

\*\* *In the JSON files ; in links, you can erase links that are not relevant for the band. In the releases, links/moreLinks urls should be empty but don't erase them. In the tracks, composer or author can be empty (and will not be displayed).*

Once these steps are completed, you're good to put this website on production. No specific need to bundle assets, but if you're willing to do so anyway, juste perform `npm install && npm run build` so assets are production-ready. In case you want to developp, and make webpack to listen to any updates in the `.scss` or `.js` files, you can use `npm run watch` and `npm run start` so a development http server is also running.

Supported links to be displayed :
7Digital, Amazon Music, Apple Music, Bandcamp, Beatport, Deezer, Discogs, Facebook, Flickr, Genius, Github, Instagram, Junodownload, LinkedIn, Mixcloud, MusicBrainz, Qobuz, SoundCloud, Spotify, Tidal, Twitter, YouTube

**Messe Basse Production, GPL-v3.0 -- 2021/2025**
