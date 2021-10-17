export class TableSelection {
  constructor(props) {
    this.group = [];
  }

  // ($el instanceof DOM) -> true
  select($el) {
    this.group.push($el);
    $el.addClass('selected');
  }

  selectGroup() {

  }
}