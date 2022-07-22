import {ExcelComponent} from '@/components/excel/ExcelComponent';
import {_} from '@core/dom';
import * as actions from '@/redux/actions';
import {createHeader} from '@/components/header/header.template';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    });
  }

  toHTML() {
    return createHeader(this.store.getState());
  }

  onInput(event) {
    this.updateTitleInStore(_(event.target).text());
  }

  onClick(event) {
    const $target = _(event.target);

    if ($target.data.button === 'remove') {
      if (confirm('Are you sure that you want to delete this table?')) {
        localStorage.removeItem('excel:' + ActiveRoute.param);
        ActiveRoute.navigate('');
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('');
    }
  }

  updateTitleInStore(value) {
    this.$dispatch(actions.changeTitle(value));
  }
}
