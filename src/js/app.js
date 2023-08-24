import { COLUMNS_HEADERS } from './const';
import Desk from './Desk';

document.addEventListener('DOMContentLoaded', () => {
  const storage = localStorage.getItem('list') || 0;
  const container = document.querySelector('body');
  const desk = new Desk(container, COLUMNS_HEADERS, storage);
  desk.init();
});
