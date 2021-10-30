import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {tableResizeHandler} from './table.resize';
import {isCell, matrix, shouldResize} from './table.functions';
import {TableSelection} from './TableSelection';
import {_} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    });
  }

  toHTML() {
    return createTable(20);
  }

  prepare() {
    this.Selection = new TableSelection();
  }

  init() {
    super.init();

    const $sell = this.$root.find('[data-id="0:0"]');
    this.Selection.select($sell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = _(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.Selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`));
        this.Selection.selectGroup($cells);
      } else {
        this.Selection.select($target);
      }
    }
  }
}
