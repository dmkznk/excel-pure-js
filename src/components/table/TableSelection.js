
export class TableSelection {
  static className = 'selected';

  constructor(props) {
    this.group = [];
    this.current = null;
  }

  // ($el instanceof DOM) -> true
  select($el) {
    this.clear();
    this.group.push($el);
    $el.addClass(TableSelection.className)
        .focus();
    this.current = $el;
  }

  selectGroup($group = []) {
    this.clear();
    this.group = $group;
    this.group.forEach($el => $el.addClass(TableSelection.className));
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className));
    this.group = [];
  }
}
