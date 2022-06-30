import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {tableResizeHandler} from './table.resize';
import {isCell, matrix, nextSelector, shouldResize} from './table.functions';
import {TableSelection} from './TableSelection';
import {_} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
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

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selectCell($cell);

    this.$subscribe('formula:input', formulaInputText => {
      this.Selection.current.text(formulaInputText);
    });

    this.$subscribe('formula:done', () => {
      this.Selection.current.focus();
    });

    this.$on(state => {
      console.log('tableState', state);
    });
  }

  selectCell($cell) {
    this.Selection.select($cell);
    this.$emit('table:select', $cell);
    this.$dispatch({type: 'TEST'});
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
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
    const {key} = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.Selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  onInput(event) {
    this.$emit('table:input', _(event.target));
  }
}
