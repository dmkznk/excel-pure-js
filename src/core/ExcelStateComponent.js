import {ExcelComponent} from '@/components/excel/ExcelComponent';

export class ExcelStateComponent extends ExcelComponent {
  constructor(...args) {
    super(...args);
  }

  get template() {
    return '';
  }

  initState(initialState = {}) {
    this.state = {...initialState};
  }

  setState(newState) {
    this.state = {...this.state, ...newState};
    this.$root.html(this.template);
  }
}
