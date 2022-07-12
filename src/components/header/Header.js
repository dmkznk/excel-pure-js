import {ExcelComponent} from '@core/ExcelComponent';
import {_} from '@core/dom';
import * as actions from '@/redux/actions';
import {createHeader} from '@/components/header/header.template';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    });
  }

  toHTML() {
    return createHeader(this.store.getState());
  }

  onInput(event) {
    this.updateTitleInStore(_(event.target).text());
  }

  updateTitleInStore(value) {
    this.$dispatch(actions.changeTitle(value));
  }
}
