export class Emitter {
  constructor() {
    this.listeners = {};
  }

  emit(eventName, ...arg) {
    if (!Array.isArray(this.listeners[eventName])) {
      return false;
    }
    this.listeners[eventName].forEach(listener => {
      listener(...arg);
    });
    return true;
  }

  subscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
    return () => {
      this.listeners[eventName] = this.listeners[eventName].filter(listeners => listeners !== fn);
    };
  }
}
