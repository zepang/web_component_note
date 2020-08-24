const API_KEY = 'AIzaSyDAVRwVpYVdrLrhVvnJbmsM6LB9wzlf-O4'

class PolySearch extends HTMLElement {
  static get observedAttributes () {
    return ['searchterm']
  }
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

  connectedCallback () {
    if (this.hasAttribute('thumbheight')) {
      this._thumbheight = this.getAttribute('thumbheight')
      this._thumbwidth = this.getAttribute('thumbheight') * 1.3333
    } else {
      this._thumbheight = 150
      this._thumbwidth = 200
    }

    if (this.hasAttribute('backgroundcolor')) {
      this.style.backgroundColor = this.getAttribute('backgroundcolor')
    }

    this.doSearch()
  }

  attributeChangedCallback (name, oldValue, newValue) {
    console.log(name)
    if (name === 'searchterm' && oldValue !== newValue) {
      this.doSearch()
    }
  }

  doSearch () {
    if (this.getAttribute('apiKey') && this.getAttribute('searchTerm')) {
      const url = `${thsi.getAttribute('baseuri')}?keywords=${this.getAttribute('searchTerm')}&format=OBJ&key=${this.getAttribute('apiKey')}`

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
      htmlStr += `<img src="${assets[i].thumbnail.url}" width="${this._thumbwidth}" height="${this._thumbheight}"/>`
    }

    this.innerHTML = htmlStr
  }
}

if (!customElements.get('poly-search')) {
  customElements.define('poly-search', PolySearch)
}

document.querySelector('poly-search').apiKey = API_KEY
document.querySelector('poly-search').searchTerm = 'parrot'