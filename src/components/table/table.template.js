const CODES = {
  A: 65,
  Z: 90
};

const DEFAULT_WIDTH = 120;

function createRow(index, content) {
  const resizer = index
      ? ' <div class="row-resize" data-resize="row"></div>'
      : '';

  return `
    <div class="row" data-type="resizable">
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
    return `
      <div 
       class="cell"
       data-col="${col}"
       data-id="${row}:${col}"
       data-type="cell"
       style="width: ${getWidth(col, state)}"
       contenteditable>
    </div>
    `;
  };
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function getWidth(index, state) {
  const {colState} = state;
  return (colState[index] || DEFAULT_WIDTH) + 'px';
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
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('');

  rows.push(createRow(null, cols));

  for (let row = 0; row < rowCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row, state))
        .join('');

    rows.push(createRow(row + 1, cells));
  }

  return rows.join('');
}
