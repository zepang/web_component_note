class PolySearch extends HTMLElement {
  constructor () {
    super()
    this.API_KEY = 'AIzaSyDAVRwVpYVdrLrhVvnJbmsM6LB9wzlf-O4'
  }

  connectedCallback () {
    this.doSearch()
  }

  doSearch () {
    const API_KEY = this.API_KEY
    const url = `https://poly.googleapis.com/v1/assets?keywords=parrot&format=OBJ&key=${API_KEY}`

    const request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.addEventListener('load', event => {
      const assets = JSON.parse(event.target.response).assets 
      this.renderResult(assets)
    })

    request.send()
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