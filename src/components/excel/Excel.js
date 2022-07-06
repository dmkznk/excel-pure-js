import {_} from '@core/dom';
import {Emitter} from '@core/Emitter';
import {StoreSubscriber} from '@core/StoreSubscriber';

export class Excel {
  constructor(selector, options) {
    this.$el = _(selector);
    this.components = options.components || [];
    this.store = options.store;
    this.emitter = new Emitter();
    this.storeSubscriber = new StoreSubscriber(this.store);
  }

  getRoot() {
    const $root = _.create('div', 'excel');

    const componentOptions = {
      emitter: this.emitter,
      store: this.store
    };

    this.components = this.components.map(Component => {
      const $el = _.create('div', Component.className);
      const component = new Component($el, componentOptions);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
    this.storeSubscriber.subscribeComponents(this.components);
    this.components.forEach(Component => Component.init());
  }

  destroy() {
    this.storeSubscriber.unsubscribeFromStore();
    this.components.forEach(Component => Component.destroy());
  }
}
