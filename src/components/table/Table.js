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
      const type = event.target.dataset.resize;
      const $resizer = _(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();
      const allColElements = this.$root.findAll(`[data-col="${$parent.data.col}"]`);

      document.onmousemove = e => {
        if (type === 'col') {
          const delta = e.pageX - coords.right;
          $parent.css({width: coords.right + delta + 'px'});
          allColElements.forEach(el => el.style.width = (coords.width + delta) + 'px');
        } else {
          const delta = e.pageY - coords.bottom;
          $parent.css({height: coords.height + delta + 'px'});
        }
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }
}
