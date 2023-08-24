/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { LOGO_SVG } from './const';
import List from './List';
import Card from './Card';
import Move from './Move';

export default class Desk {
  constructor(container, headers, storage) {
    this.container = container;
    this.headers = headers;
    this.storage = storage;
    this.move = new Move(container);
  }

  init() {
    this.viewDesk();
    this.viewList();
    if (this.storage) this.getSaveList();
    this.trackChanges();
  }

  viewDesk() {
    const main = document.createElement('main');
    main.classList.add('app__container');
    main.innerHTML = `
      <a class="app__link" href="https://trello.com/" aria-label="Click to go to the Trello website">
        <div class="app__logo">${LOGO_SVG}</div>
      </a>
      <h1 class="app__title">Welcome to Like-Trello!</h1>
      <div class="app__content"></div>
    `;

    this.container.append(main);
    this.main = main;
  }

  viewList() {
    for (const title of this.headers) {
      const newList = document.createElement('section');
      newList.classList.add('task__section');
      newList.dataset.title = title;
      this.main.append(newList);

      const listContainer = this.main.querySelector(`[data-title="${title}"]`);
      const list = new List(listContainer, title);
      list.init();
      listContainer.append(list);
      listContainer.lastChild.remove();
    }
  }

  saveList() {
    const saveCards = [];
    const lists = this.main.querySelectorAll('.task__section');
    for (let i = 0; i < lists.length; i += 1) {
      const arr = [];
      arr.push(lists[i].dataset.title);
      saveCards.push(arr);
      const list = lists[i].querySelector('.task__list');
      [...list.children].forEach((el) => {
        arr.push(el.querySelector('.card__content').textContent);
      });
    }
    localStorage.setItem('list', JSON.stringify(saveCards));
  }

  getSaveList() {
    const saveCards = JSON.parse(localStorage.getItem('list'));
    const lists = this.main.querySelectorAll('.task__section');
    for (let i = 0; i < lists.length; i += 1) {
      for (let j = 0; j < saveCards.length; j += 1) {
        if (lists[i].dataset.title === saveCards[j][0]) {
          const list = lists[i].querySelector('.task__list');
          saveCards[j].shift();
          saveCards[j].forEach((item) => {
            const card = new Card(list, item);
            card.init();
          });
        }
      }
    }
  }

  trackChanges() {
    setInterval(() => {
      this.container.addEventListener('click', this.saveList());
      this.container.removeEventListener('click', this.saveList());
    }, 500);
  }
}
