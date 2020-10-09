import Template from './template.js'

class BizCard extends HTMLElement {
  connectedCallback () {
    console.log(1233, Template)
    this.innerHTML = Template.render({
      first_name: 'Emmett',
      last_name: 'Brown',
      title: 'Student of all Sciences',
      phone: '555-4385',
      email: 'emmett@docbrown.flux',
      website: 'www.docbrown.flux',
      backgroundChoices: [
        { name: 'big dots', uri: './images/big-dot-pattern.png'},
        { name: 'little dots', uri: './images/tiny-dot-pattern.png'},
        { name: 'squares', uri: './images/square-pattern.png'},
        { name: 'stripes', uri: './images/stripes-pattern.png'},
        { name: 'diamond', uri: './images/diamond-pattern.png'},
      ],
      logoChoices: [
        { name: 'mobius strip', uri: './images/mobius-logo.png'},
        { name: 'shopping bag', uri: './images/bag-logo.png'},
        { name: 'copper splash', uri: './images/splash-logo.png'},
        { name: 'star', uri: './images/star-logo.png'},
        { name: 'cone', uri: './images/cone-logo.png'},
      ],
    })

    console.log(this.innerHTML)
  }
}

if (!customElements.get('biz-card')) {
  customElements.define('biz-card', BizCard)
}