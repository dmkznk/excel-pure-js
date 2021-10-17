import './scss/index.scss';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table]
});

excel.render();

const xml = new XMLHttpRequest();
xml.open('GET', 'https://jsonplaceholder.typicode.com/users');
xml.responseType = 'json';
xml.onload = () => {
  console.log(xml.response);
};

xml.send();