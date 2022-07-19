function toHTML() {
  return `
   <li class="db__record">
      <a href="#">Table #1</a>
      <strong>13.06.2021</strong>
  </li>`;
}

function getAllExcelLocalStorageKeys() {
  return Object.keys(localStorage).filter(key => key.includes('excel'));
}

export function createRecordsTable() {
  const keys = getAllExcelLocalStorageKeys();
  return !keys.length
    ? `<p>You haven't created any records yet</p>`
    : `<div class="db__list-header">
          <span>Name</span>
          <span>Created</span>
       </div>
       <ul class="db__list">
          ${ keys.map(toHTML).join('') }
       </ul>`;
}
