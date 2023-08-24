import {
  DESC_SVG, CLOSE_SVG, ATTACHMENT, COMMENT, CHECKLIST, DATE,
} from './const';

export default class Card {
  constructor(container, text) {
    this.container = container;
    this.text = text;
    this.labels = [ATTACHMENT, COMMENT, CHECKLIST, DATE];
  }

  init() {
    this.viewCard();
    this.delete();
  }

  viewCard() {
    const card = document.createElement('li');
    card.classList.add('task__card');
    card.classList.add('card');
    card.innerHTML = `
    <p class="card__content">${this.text}</p>
    <ul class="card__label label">
      <li class="label__description label__icon">${DESC_SVG}</li>
    </ul>
    <button class="card__close" type="button" name="button" aria-label="Click to delete a task">${CLOSE_SVG}</button>
    `;
    this.container.append(card);
    this.card = card;

    const labelArray = this.getLabel();
    labelArray.forEach((el) => {
      this.card.querySelector('.label').insertAdjacentHTML('beforeend', el);
    });

    if (this.card.querySelector('time.label__count')) {
      this.card.querySelector('time.label__count').textContent = `${Card.getDate()}`;
      this.card.querySelector('time.label__count').datetime = `${Card.getDateTime()}`;
    }
  }

  getLabel() {
    const randomCount = Math.floor(1 + Math.random() * this.labels.length);
    const arr = [];
    for (let i = 0; i < randomCount; i += 1) {
      arr.push(this.labels[i]);
    }
    return arr;
  }

  delete() {
    this.card.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.closest('.card__close')) this.card.remove();
    });
  }

  static getDateTime() {
    const dateTime = `
      ${new Date().getFullYear()}
      -${new Date().getMonth()}
      -${new Date().getDate()}
      T${new Date().getHours()}
      :${new Date().getMinutes()}`;
    return dateTime.replace(/\n/g, '').split(' ').join('');
  }

  static getDate() {
    const date = new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric',
    }).format(Date.now());
    return date;
  }
}
