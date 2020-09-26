// 自定义元素
class PopUpInfo extends HTMLElement {
  constructor() {
    super()

    // 创建一个shadow root
    var shadow = this.attachShadow({ mode: 'open' })
    
    var wrapper = document.createElement('span')
    wrapper.setAttribute('class', 'wrapper')
    var icon = document.createElement('span')
    icon.setAttribute('class', 'icon')
    icon.setAttribute('tabindex', 0)
    var info = document.createElement('span')
    info.setAttribute('class', 'info')

    var text = this.getAttribute('text')
    console.log(this.getAttribute('text'))
    info.textContent = text

    var imgUrl
    if (this.hasAttribute('img')) {
      imgUrl = this.getAttribute('img')
    } else {
      imgUrl = 'https://source.unsplash.com/random'
    }

    var img = document.createElement('img')
    img.src = imgUrl
    icon.appendChild(img)

    var style = document.createElement('style')
    
    shadow.appendChild(style)
    shadow.appendChild(wrapper)
    wrapper.appendChild(icon)
    wrapper.appendChild(info)
  }
}

customElements.define('popup-info', PopUpInfo)

// 自定义元素及其生命周期
class CustomSquare extends HTMLElement {
  static get observedAttributes () {
    return ['w', 'l']
  }

  constructor () {
    super()

    // 
    var shadow = this.attachShadow({ mode: 'open' })
    var div = document.createElement('div')
    var style = document.createElement('style')
    shadow.appendChild(style)
    shadow.appendChild(div)
  }

  connectedCallback () {
    console.log('Custom square element added to page.')
    updateStyle(this)
  }

  disconnectedCallback() {
    console.log('Custom square element removed from page.');
  }
  
  adoptedCallback() {
    console.log('Custom square element moved to new page.');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom square element attributes changed.');
    updateStyle(this);
  }
}

customElements.define('custom-square', CustomSquare)

function updateStyle (elem) {
  var shadow = elem.shadowRoot
  var childNodes = shadow.childNodes

  for (let i = 0; i < childNodes.length; i++) {
    const element = childNodes[i];
    if (element.nodeName === 'STYLE') {
      element.textContent = `
        div {
          width: ${elem.getAttribute('l')}px;
          height: ${elem.getAttribute('l')}px;
          background-color: ${elem.getAttribute('c')};
        }
      `
    }
  }
}

window.addEventListener('load', () => {
  const add = document.querySelector('.add');
  const update = document.querySelector('.update');
  const remove = document.querySelector('.remove');
  let square;

  update.disabled = true;
  remove.disabled = true;

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  add.onclick = function() {
    // Create a custom square element
    square = document.createElement('custom-square');
    square.setAttribute('l', '100');
    square.setAttribute('c', 'red');
    document.body.appendChild(square);

    update.disabled = false;
    remove.disabled = false;
    add.disabled = true;
  };

  update.onclick = function() {
    // Randomly update square's attributes
    square.setAttribute('l', random(50, 200));
    square.setAttribute('c', `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`);
  };

  remove.onclick = function() {
    // Remove the square
    document.body.removeChild(square);

    update.disabled = true;
    remove.disabled = true;
    add.disabled = false;
  };
})