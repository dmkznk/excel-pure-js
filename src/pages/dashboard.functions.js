import {storage} from '@core/utils';

function toHTML(key) {
  const tableState = storage(key);
  const tableId = key.split(':')[1];

  return `<li class="db__record">
            <a href="#excel/${tableId}">${tableState.titleState}</a>
            <strong>
              ${ new Date(tableState.openedDate).toLocaleDateString() }
              ${ new Date(tableState.openedDate).toLocaleTimeString() }
            </strong>
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
          <span>Last Opened</span>
       </div>
       <ul class="db__list">
          ${ keys.map(toHTML).join('') }
       </ul>`;
}
