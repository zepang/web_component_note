class Carousel extends HTMLElement {
  constructor () {
    super()
    this.template = document.getElementById('carousel').content
    this.shadowRoot = this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(this.template.cloneNode(true))
    this.titleEl = this.shadowRoot.querySelector('h2')
    this.autorEl = this.shadowRoot.querySelector('h4')
    this.imageContainerEl = this.shadowRoot.querySelector('.image-container')

    this.updateTitle(this.getAttribute('title'))
    this.updateAuthor(this.getAttribute('author'))
  }

  updateTitle (title) {
    this.titleEl.innerText = title
  }

  updateAuthor (author) {
    this.autorEl.innerText = author
  }

  showPhoto () {
    console.log(this.imageContainerEl)
    this.imageContainerEl.style.backgroundImage = `url(${this._photos[this._photoIndex]}?v=${Date.now()})`
  }

  handlePrevBtnClick (event) {
    this._photoIndex = this._photoIndex - 1
    if (this._photoIndex < 0) {
      this._photoIndex = this._photos.length - 1
    }
    this.showPhoto()
  }

  handleNextBtnClick (event) {
    this._photoIndex = this._photoIndex + 1
    if (this._photoIndex > this._photos.length - 1) {
      this._photoIndex = 0
    }
    this.showPhoto()
  }

  connectedCallback () {
    this._photoIndex = 0;
    this._photos = this.getAttribute('photos').split(',');
    this.showPhoto()
    this.shadowRoot.querySelector('button.prev').addEventListener('click', event => {
      this.handlePrevBtnClick(event)
    })
    this.shadowRoot.querySelector('button.next').addEventListener('click', event => {
      this.handleNextBtnClick(event)
    })
  }
}

if (!customElements.get('carousel')) {
  customElements.define('tc-carousel', Carousel)
}