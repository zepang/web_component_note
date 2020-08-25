class SliderBar extends HTMLElement {
  static get observedAttributes () {
    return ['value', 'backgroudcolor']
  }

  set value (value) {
    this.setAttribute('value', value)
  }

  get value () {
    return this.getAttribute('value')
  }

  set backgroundcolor (value) {
    this.setAttribute('backgroundcolor', value)
  }

  get backgroundcolor () {
    return this.getAttribute('backgroundcolor')
  }

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
    this.setColor(this.backgroundcolor)
    this.refreshSlider(this.value)
  }

  attributeChangedCallback (name, oldValue, newValue) {
    switch(name) {
      case 'value': 
        this.refreshSlider(newValue)
        break
      case 'backgroundcolor':
        debugger
        tgus.setColor(newValue)
        break
    }
  }

  setColor (color) {
    console.log(color)
    if (this.shadowRoot.querySelector('.bg-overlay')) {
      this.shadowRoot.querySelector('.bg-overlay').style.backgroundColor = `linear-gradient(to right, ${color} 0%, ${color}00 100%)`
    }
  }

  refreshSlider (value) {
    if (this.shadowRoot.querySelector('.thumb')) {
      this.shadowRoot.querySelector('.thumb').style.left = `${value/100 * (this.offsetWidth - this.shadowRoot.querySelector('.thumb').offsetWidth / 2)}px `
    }
  }
}

if (!customElements.get('slider-bar')) {
  customElements.define('slider-bar', SliderBar)
}