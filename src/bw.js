import './bw.scss';


class BW {


	constructor() {
		this._lang = (navigator.language === 'fr') ? 'fr' : 'en';
		this._nls = null;
		this._version = '0.0.1';
		this._fetchLang()
			.then(this._init.bind(this));
	}


	_fetchLang() {
		return new Promise((resolve, reject) => {
				fetch(`/assets/json/${this._lang}.json`).then(data => {
					data.json().then(nlsKeys => {
						this._nls = nlsKeys;
						resolve();
					}).catch(reject);
				}).catch(reject);
		});
	}


	_init() {
		if (document.body.dataset.type === 'index') {
			this._buildIndexPage();
		} else if (document.body.dataset.type === 'listen') {
			this._buildListenPage();
    } else if (document.body.dataset.type === 'tree') {
			this._buildTreePage();
		}
	}


	_buildIndexPage() {
		document.querySelector('#band-name').innerHTML = this._nls.band.name;
		document.querySelector('#band-desc').innerHTML = this._nls.band.desc;
		document.querySelector('#listen-link').innerHTML = this._nls.listenLink;
		document.querySelector('#tree-link').innerHTML = this._nls.treeLink;
	}


	_buildListenPage() {

	}


	_buildTreePage() {
		// Iterate over link to create link content
		for (let i = 0; i < this._nls.band.links.length; ++i) {
			document.querySelector('#link-wrapper').innerHTML += `
				<a href="${this._nls.band.links[i].url}" class="link" target="_blank" rel="noopener noreferrer">
					<img src="/assets/img/logo/${this._nls.band.links[i].type}.svg" alt="${this._nls.band.links[i].type}-logo">
					<p>${this._nls.band.links[i].name}</p>
				</a>
			`;
		}
	}


}


export default BW;
