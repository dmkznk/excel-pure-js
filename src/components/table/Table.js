import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {tableResizeHandler} from './table.resize';
import {isCell, matrix, nextSelector, shouldResize} from './table.functions';
import {TableSelection} from './TableSelection';
import {_} from '@core/dom';
import * as actions from '@/redux/actions';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

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
    return createTable(20, this.store.getState());
  }

  prepare() {
    this.Selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');
    this.selectCell($cell);

    this.$subscribe('formula:input', formulaInputText => {
      this.setCellDataValueAttribute(formulaInputText);
      this.updateTextInStore(formulaInputText);
    });

    this.$subscribe('formula:done', () => {
      this.Selection.current.focus();
    });

    this.$subscribe('toolbar:applyStyle', style => {
      this.Selection.applyStyle(style);
      this.$dispatch(actions.applyStyle({
        value: style,
        ids: this.Selection.selectedIds
      }));
    });
  }

  selectCell($cell) {
    this.Selection.select($cell);
    this.$emit('table:select', $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles));
  }

  async resizeTable(event) {
    try {
      const data = await tableResizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize((data)));
    } catch (error) {
      console.warn(error.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
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

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.Selection.current.id(),
      value
    }));
  }

  onInput(event) {
    const cellText = _(event.target).text();
    this.setCellDataValueAttribute(cellText);
    this.updateTextInStore(cellText);
  }

  setCellDataValueAttribute(value) {
    this.Selection.current
        .attribute('data-value', value)
        .text(parse(value));
  }
}
