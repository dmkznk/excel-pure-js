import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {_} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['click', 'mousedown']
    });
  }

  toHTML() {
    return createTable(20);
  }

  onClick() {
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = _(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCords();

      document.onmousemove = e => {
        const delta = e.pageX - coords.right;
        $parent.$el.style.width = (coords.width + delta) + 'px';
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }
}
