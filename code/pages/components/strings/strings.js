import WebHarpString from '../string/string.js'

export default class WebHarpStrings extends HTMLElement {
  set points (pts) {
    if (!this.stringsElements || !pts.last || !pts.current) return 
    let magnitute = Math.abs(pts.current.x - pts.last.x)
    let xMin = Math.min(pts.current.x, pts.last.x)
    let xMax = Math.max(pts.current.x, pts.last.x)

    for (let d = 0; d < this.stringsElements.length; d++) {
      if (xMin < this.stringsElements[d].offsetLeft && xMax > this.stringsElements[d].offsetLeft) {
        let strum = {
          power: magnitute,
          string: d
        }
        this.stringsElements[d].strum(strum)
      }
    }
  }

  connectedCallback () {
    console.log(this.getAttribute('strings'))
    let strings = '<div class="spacer"></div>'
    for (let c = 0; c < this.getAttribute('strings'); c++) {
      strings += `<webharp-string></webharp-string>`
    }

    strings += `
      <style>
        webharp-strings {
          height: 100%;
          display: flex;
        }

        webharp-strings > webharp-string, div.spacer {
          flex: 1;
        }
      </style>
    `

    this.innerHTML = strings
    this.stringsElements = this.querySelectorAll('webharp-string')
  }
}

if (!customElements.get('webharp-strings')) {
  customElements.define('webharp-strings', WebHarpStrings)
}