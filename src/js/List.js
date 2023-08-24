import { ELLIPSIS_SVG, ADD_SVG, CLOSE_SVG } from './const';
import Card from './Card';

export default class List {
  constructor(container, title) {
    this.container = container;
    this.title = title;
  }

  init() {
    this.viewList();
    this.viewTextarea();
  }

  viewList() {
    this.container.innerHTML = `
      <div class="task__header">
        <h2 class="task__title">${this.title}</h2>
        <button class="task__control" type="button" name="button" aria-label="Click to open task settings">${ELLIPSIS_SVG}</button>
      </div>
      <ul class="task__list"></ul>
    `;
    this.taskList = this.container.querySelector('.task__list');
    this.viewAddCardBtn();
  }

  viewAddCardBtn() {
    const addCardBtn = `
      <button class="task__add-textarea" type="button" name="button" aria-label="Click to create an input field for a new task card">${ADD_SVG}
        <span>Add another card</span>
      </button>
    `;
    this.taskList.insertAdjacentHTML('afterend', addCardBtn);
    this.addTextareaBtn = this.container.querySelector('.task__add-textarea');
  }

  viewTextarea() {
    this.addTextareaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.taskList.style.minHeight = '0';
      this.createTextarea();
      this.changeAddButton();
      this.cardBehavior();
      this.addTextareaBtn.remove();
      this.closeTextArea();
    });
  }

  createTextarea() {
    const textarea = document.createElement('textarea');
    textarea.classList.add('card__new');
    textarea.name = 'text';
    textarea.rows = '3';
    textarea.cols = '20';
    textarea.placeholder = 'Enter a title for this card...';
    textarea.spellcheck = true;
    textarea.wrap = 'hard';
    this.taskList.after(textarea);
    this.textarea = textarea;
  }

  changeAddButton() {
    const addBlock = document.createElement('div');
    addBlock.classList.add('task__add-block');
    addBlock.innerHTML = `
      <button class="task__add-card" type="button" name="button" aria-label="Click to add a new task card" disabled="true" style="cursor: not-allowed;">add card</button>
      <button class="task__cancel-card" type="button" name="button" aria-label="Click to add a new task card">${CLOSE_SVG}</button>
    `;
    this.textarea.after(addBlock);
    this.addBlock = addBlock;
    this.addCardBtn = this.addBlock.querySelector('.task__add-card');
    this.cancelCardBtn = this.addBlock.querySelector('.task__cancel-card');
  }

  closeTextArea() {
    const close = () => {
      this.taskList.style.minHeight = '';
      this.textarea.remove();
      this.addBlock.remove();
      this.viewAddCardBtn();
      this.viewTextarea();
    };

    this.cancelCardBtn.addEventListener('click', (e) => {
      e.preventDefault();
      close();
    });

    this.addCardBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.addCard();
      close();
    });
  }

  addCard() {
    const card = new Card(this.taskList, this.textarea.value);
    card.init();
  }

  cardBehavior() {
    this.textarea.addEventListener('input', (e) => {
      if (e.target.value.trim().length) {
        this.addCardBtn.style.cursor = '';
        this.addCardBtn.disabled = false;
      } else {
        this.addCardBtn.style.cursor = 'not-allowed';
        this.addCardBtn.disabled = true;
      }
    });
  }
}
