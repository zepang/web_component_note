class PolySearch extends HTMLElement {
  constructor () {
    super()
    this.API_KEY = 'AIzaSyDAVRwVpYVdrLrhVvnJbmsM6LB9wzlf-O4'
  }

  set apiKey (value) {
    this._apiKey = value
    this.doSearch()
  }

  set searchTerm (value) {
    this._searchTerm = value
    this.doSearch()
  }

  getSearchTerm () {
    return this._searchTerm
  }

  connectedCallback () {
    this.doSearch()
  }

  doSearch () {
    if (this._apiKey && this._searchTerm) {
      const url = `https://poly.googleapis.com/v1/assets?keywords=${this._searchTerm}&format=OBJ&key=${this._apiKey}`

      const request = new XMLHttpRequest()
      request.open('GET', url, true)
      request.addEventListener('load', event => {
        const assets = JSON.parse(event.target.response).assets 
        this.renderResult(assets)
      })

      request.send()
    }
  }

  renderResult (assets) {
    let htmlStr = ''
    for (let i= 0; i < assets.length; i++) {
      htmlStr += `<img src="${assets[i].thumbnail.url}" width="200" height="150"/>`
    }

    this.innerHTML = htmlStr
  }
}

if (!customElements.get('poly-search')) {
  customElements.define('poly-search', PolySearch)
}