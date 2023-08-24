import { COLUMN_HEADER } from './const';
import Desk from './Desk';

document.addEventListener('DOMContentLoaded', () => {
  const storage = localStorage.getItem('list') || 0;
  const container = document.querySelector('body');
  const desk = new Desk(container, COLUMN_HEADER, storage);
  desk.init();
});
