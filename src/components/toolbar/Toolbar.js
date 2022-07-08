import {createToolbar} from '@/components/toolbar/toolbar.template';
import {_} from '@core/dom';
import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {defaultStyles} from '@/constants';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  onClick(event) {
    const $target = _(event.target);
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:applyStyle', value);
      const key = Object.keys(value)[0];
      this.setState({[key]: value[key]});
    }
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }
}
