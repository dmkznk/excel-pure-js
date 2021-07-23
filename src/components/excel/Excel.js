import {_} from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this.$el = _(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = _.create('div', 'excel');

    this.components = this.components.map(Component => {
      const $el = _.create('div', Component.className);
      const component = new Component($el);
      // debug
      if (component.name) {
        window['c' + component.name] = component;
      }
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
    this.components.forEach(component => component.init());
  }
}
