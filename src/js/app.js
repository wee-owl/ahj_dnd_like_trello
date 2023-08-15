import { COLUMN } from './const';
import BaseSpace from './renderBasic';
import getStorage from './getStorage';

document.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(localStorage.getItem('data')) || 0;
  const appContainer = document.querySelector('.app__container');
  const newContent = new BaseSpace(appContainer, COLUMN, data);
  newContent.viewBaseSpace();
});
document.addEventListener('change', getStorage);
