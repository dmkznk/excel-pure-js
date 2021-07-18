class Dom {
  constructor(selector) {
    this.nativeElement = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.nativeElement.innerHTML = html;
      return this;
    }
    return this.nativeElement.outerHTML.trim();
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.nativeElement;
    }
    if (Element.prototype.append) {
      this.nativeElement.append(node);
    } else {
      this.nativeElement.appendChild(node);
    }
    return this;
  }

  clear() {
    this.html('');
    return this;
  }
}


export function _(selector) {
  return new Dom(selector);
}

_.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return _(el);
};

