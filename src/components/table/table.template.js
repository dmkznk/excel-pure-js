const CODES = {
  A: 65,
  Z: 90
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function createRow(index, content, state = {}) {
  const resizer = index ? ' <div class="row-resize" data-resize="row"></div>' : '';
  const height = getHeight(index, state);

  return `
    <div class="row" data-type="resizable" data-row="${index}" style="height: ${height}">
      <div class="row-info">
      ${index ? index : ''}
      ${resizer}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toColumn({col, index, width}) {
  return `
    <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
     ${col}
     <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function toCell(row, state) {
  return function(_, col) {
    const id = `${row}:${col}`;
    const width = getWidth(col, state.colState);
    const data = state.dataState[id];
    return `
      <div 
       class="cell"
       data-col="${col}"
       data-id="${id}"
       data-type="cell"
       style="width: ${width}"
       contenteditable>
       ${data || ''}
    </div>
    `;
  };
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function getWidth(index, state) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(index, state) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(index, state)
    };
  };
}

export function createTable(rowCount = 10, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state.colState))
      .map(toColumn)
      .join('');

  rows.push(createRow(null, cols));

  for (let row = 0; row < rowCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row, state))
        .join('');

    rows.push(createRow(row + 1, cells, state.rowState));
  }

  return rows.join('');
}
