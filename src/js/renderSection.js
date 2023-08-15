import {
  ELLIPSIS_SVG, ADD_SVG, CLOSE_SVG, DESC_SVG,
} from './const';
import transition from './transition';

import someLabels from './label';

export default class Section {
  constructor(element, title, data) {
    this.element = element;
    this.title = title;
    this.data = data;
  }

  renderSection() {
    this.renderTitle();
    this.renderTextAreaBtn();
    this.openTextArea();

    if (this.data) {
      this.data.forEach((value) => {
        this.renderCard(value);
        this.deleteCard();
        transition();
      });
    }
  }

  renderTitle() {
    const header = document.createElement('div');
    header.classList.add('task__header');

    const sectionTitle = document.createElement('h2');
    sectionTitle.classList.add('task__title');
    sectionTitle.textContent = this.title;

    const taskList = document.createElement('ul');
    taskList.classList.add('task__list');

    const settingsBtn = document.createElement('button');
    settingsBtn.classList.add('task__control');
    settingsBtn.type = 'button';
    settingsBtn.name = 'button';
    settingsBtn.ariaLabel = 'Click to open task settings';
    settingsBtn.innerHTML = ELLIPSIS_SVG;

    header.append(sectionTitle, settingsBtn);
    this.element.append(header, taskList);
    this.taskList = taskList;
  }

  renderTextAreaBtn() {
    const btn = document.createElement('button');
    btn.classList.add('task__add-textarea');
    btn.type = 'button';
    btn.name = 'button';
    btn.ariaLabel = 'Click to create an input field for a new task card';
    btn.innerHTML = ADD_SVG;
    const p = document.createElement('span');
    p.textContent = 'Add another card';
    btn.append(p);
    this.element.append(btn);
  }

  renderTextArea() {
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

  renderCard(value) {
    const card = document.createElement('li');
    card.classList.add('task__card');
    card.classList.add('card');

    const content = document.createElement('p');
    content.classList.add('card__content');
    content.textContent = value;

    const labels = document.createElement('ul');
    labels.classList.add('card__label');
    labels.classList.add('label');
    const label = document.createElement('li');
    label.classList.add('label__description');
    label.classList.add('label__icon');
    label.innerHTML = DESC_SVG;
    labels.append(label);
    someLabels().forEach((el) => labels.insertAdjacentHTML('beforeend', el));

    const btn = document.createElement('button');
    btn.classList.add('card__close');
    btn.type = 'button';
    btn.name = 'button';
    btn.ariaLabel = 'Click to delete a task';
    btn.innerHTML = CLOSE_SVG;

    card.append(content, labels, btn);
    this.taskList.append(card);
  }

  changeAddButton() {
    const addBlock = document.createElement('div');
    addBlock.classList.add('task__add-block');
    this.addBlock = addBlock;

    const addCardBtn = document.createElement('button');
    addCardBtn.classList.add('task__add-card');
    addCardBtn.type = 'button';
    addCardBtn.name = 'button';
    addCardBtn.ariaLabel = 'Click to add a new task card';
    addCardBtn.textContent = 'add card';
    addCardBtn.style.cursor = 'not-allowed';
    addCardBtn.disabled = true;

    const notAddCardBtn = document.createElement('button');
    notAddCardBtn.classList.add('task__not-add-card');
    notAddCardBtn.type = 'button';
    notAddCardBtn.name = 'button';
    notAddCardBtn.ariaLabel = 'Click to add a new task card';
    notAddCardBtn.innerHTML = CLOSE_SVG;

    this.addBlock.append(addCardBtn, notAddCardBtn);
    this.addCardBtn = addCardBtn;
    this.notAddCardBtn = notAddCardBtn;
    this.textarea.after(this.addBlock);
  }

  openTextArea() {
    const addTextAreaBtn = this.element.querySelector('.task__add-textarea');
    addTextAreaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.renderTextArea();
      this.changeAddButton();
      addTextAreaBtn.remove();
      this.cardControl();
    });
  }

  closeTextArea() {
    const close = () => {
      this.textarea.remove();
      this.addBlock.remove();
      this.renderTextAreaBtn();
      this.openTextArea();
    };

    if (!this.notAddCardBtn) return;
    this.notAddCardBtn.addEventListener('click', (e) => {
      e.preventDefault();
      close();
    });

    if (!this.addCardBtn) return;
    this.addCardBtn.addEventListener('click', (e) => {
      e.preventDefault();
      close();
    });
  }

  addCard() {
    if (!this.addCardBtn) return;
    this.addCardBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.renderCard(this.textarea.value);
      this.deleteCard();
      transition();
    });
  }

  cardControl() {
    if (!this.textarea) return;
    this.closeTextArea();
    this.textarea.addEventListener('input', (e) => {
      if (e.target.value.trim().length) {
        this.addCardBtn.style.cursor = '';
        this.addCardBtn.disabled = false;
      } else {
        this.addCardBtn.style.cursor = 'not-allowed';
        this.addCardBtn.disabled = true;
      }
    });
    this.addCard();
  }

  deleteCard() {
    const cards = this.element.querySelectorAll('.card');
    if (!cards) return;
    cards.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.closest('.card__close')) item.remove();
      });
    });
  }
}
