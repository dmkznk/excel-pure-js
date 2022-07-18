import {_} from '@core/dom';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router');
    }
    this.$placeholder = _(selector);
    this.routes = routes;

    this.page = null;

    this.changePageHandler = this.changePageHandler.bind(this);
    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }
    const DefaultPage = this.routes.dashboard;
    const CurrentPage = ActiveRoute.path.includes('excel') ? this.routes.excel : DefaultPage;
    this.page = new CurrentPage(ActiveRoute.param);

    this.$placeholder.clear();
    this.$placeholder.append(this.page.getRoot());

    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
