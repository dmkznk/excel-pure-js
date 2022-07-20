// Pure functions
export function capitalize(string) {
  if (typeof string !== 'string') return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function storage(key, data = null) {
  if (!data) return JSON.parse(localStorage.getItem(key));
  localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function camelToDashCase(str) {
  return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
      .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
      .join(';');
}

export function debounce(fn, ms) {
  let timeout;
  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, ms);
  };
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

