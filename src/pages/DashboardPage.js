import {Page} from '@core/Page';
import {_} from '@core/dom';

export class DashboardPage extends Page {
  getRoot() {
    return _.create('div', 'db').html(`
     <div class="db__header">
            <h1>Excel Dashboard</h1>
        </div>
        <div class="db__new">
            <div class="db__view">
                <a href="#" class="db__create">
                    New <br /> Table
                </a>
            </div>
        </div>
        <div class="db__table db__view">
            <div class="db__list-header">
                <span>Name</span>
                <span>Created</span>
            </div>
            <ul class="db__list">
                <li class="db__record">
                    <a href="#">Table #1</a>
                    <strong>13.06.2021</strong>
                </li>
                <li class="db__record">
                    <a href="#">Table #2</a>
                    <strong>13.06.2021</strong>
                </li>
            </ul>
        </div>
    `);
  }
}
