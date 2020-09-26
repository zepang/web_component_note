class SliderBar extends HTMLElement {
  constructor () {
    super()
    this.template = document.getElementById('slider-bar').content
    this.shadowRoot = this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(this.template.cloneNode(true))

    this.style.display = 'inline-block'
    this.style.position = 'relative'
    this.style.width = '500px'
    this.style.height = '50px'
  }

  connectedCallback () {
    this.shadowRoot.querySelector('.bg-overlay').style.backgroundColor = this.getAttribute('background-color')
    this.shadowRoot.querySelector('.thumb').style.marginLeft = `${this.getAttribute('value')}px`
  }
}

if (!customElements.get('slider-bar')) {
  customElements.define('slider-bar', SliderBar)
}