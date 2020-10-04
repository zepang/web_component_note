import Strings from '../strings/strings.js'
import './midijs.wrapper.js'

export default class WebHarpApp extends HTMLElement {
  onMouseMove (e) {
    this.stringsElement.points = {
      last: this.lastPoint,
      current: {
        x: e.pageX,
        y: e.pageY
      }
    }
    this.lastPoint = {
      x: e.pageX,
      y: e.pageY
    }
  }

  connectedCallback () {
    this.innerHTML = `
      <webharp-strings strings="${this.getAttribute('strings')}"></webharp-strings>
    `
    this.stringsElement = this.querySelector('webharp-strings')
    this.stringsElement.addEventListener('mousemove', e => this.onMouseMove(e))
  }
}

if (!customElements.get('webharp-app')) {
  customElements.define('webharp-app', WebHarpApp)
}