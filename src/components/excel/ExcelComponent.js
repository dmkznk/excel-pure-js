import {DOMListener} from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.stateKeysToSubscribeOn = options.stateKeysToSubscribeOn || [];
    this.unsubscribers = [];
    this.store = options.store;

    this.prepare();
  }

  prepare() {
  }

  // returns component template
  toHTML() {
    return '';
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  storeChanged(changes) {

  }

  isWatching(key) {
    return this.stateKeysToSubscribeOn.includes(key);
  }

  init() {
    this.initDOMListeners();
  }

  $emit(eventName, ...args) {
    this.emitter.emit(eventName, ...args);
  }

  $subscribe(eventName, fn) {
    const unsub = this.emitter.subscribe(eventName, fn);
    this.unsubscribers.push(unsub);
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(unsub => unsub());
  }
}
