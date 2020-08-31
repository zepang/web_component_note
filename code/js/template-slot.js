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
    document.addEventListener('mousemove', e =>  this.eventHandler(e))
    document.addEventListener('mouseup', e => this.eventHandler(e))
    this.addEventListener('mousedown', e => this.eventHandler(e))
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

  updateX (x) {
    let hpos = x - this. 
  }

  eventHandler (e) {
    const bunds = this.getBoundingClientRect()
    const x = e.clientX - bunds.left

    switch (e.type) {
      case 'mousemove':
        if (this.isDragging) {
          this.updateX(x)
          this.refreshSlider(this.value)
        }
        break
      case 'mouseup':
        this.isDragging = false
        break
      case 'mousedown':
        this.isDragging = true
        this.updateX(x)
        this.refreshSlider(this.value)
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