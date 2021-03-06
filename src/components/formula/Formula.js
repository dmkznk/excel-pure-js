import {ExcelComponent} from '@/components/excel/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      stateKeysToSubscribeOn: ['currentText', 'colState'],
      ...options
    });
  }

  init() {
    super.init();
    this.$formula = this.$root.find('#formula');
    this.$subscribe('table:select', $cell => {
      this.$formula.text($cell.data.value);
    });
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText);
  }

  toHTML() {
    return `<div class="info">fx</div>
            <div id="formula" class="input" contenteditable spellcheck="false"></div>`;
  }

  onInput(event) {
    const inputText = event.target.textContent.trim();
    this.$emit('formula:input', inputText);
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:done');
    }
  }
}
