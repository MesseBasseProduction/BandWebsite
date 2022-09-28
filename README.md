# BandWebsite

A band's website template with a description, a page to listen tracks and finally, a link tree to share all of the band's links! Translated in FR, EN, ES, DE.

When cloned, you need to perform several operations so the website is fully customized to your need :

- fill HTML files, mostly for title and description (head tag) ;
- replace the band logo and the favicons\* in `assets/img/` ;
- fill `assets/audio/` with mp3 extracts of the releases you want to make available to listeners ;
- fill `assets/img/releases/` with releases' artworks ;
- fill `assets/img/artists/` with band members' picture ;
- fill the `assets/json/{lang}.json` with the band information ;
- fill the `assets/json/band.json` with artist members, links and releases\*\* ;
- create your custom `index.html` file so it reflect the band's will.

\* Favicon can be generated using a website such as [https://www.favicon-generator.org/](https://www.favicon-generator.org/).

\*\* In the JSON files ; in links, you can erase links that are not relevant for the band. In the releases, links/moreLinks urls should be empty but don't erase them. In the tracks, composer or author can be empty (and will not be displayed) 

Supported links to be displayed :
Facebook, YouTube, Spotify, Apple Music, Deezer, Amazon Music, Tidal, SoundCloud, Bandcamp, Discogs, Genius, MusicBrainz, Instagram, Flickr, Github, LinkedIn
