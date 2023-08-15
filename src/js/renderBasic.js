import { LOGO_SVG } from './const';
import Section from './renderSection';

export default class BaseSpace {
  constructor(element, array, data) {
    this.element = element;
    this.array = array;
    this.data = data;
  }

  viewBaseSpace() {
    this.renderHeader();
    this.renderSections();
  }

  renderHeader() {
    const a = document.createElement('a');
    a.classList.add('app__link');
    a.setAttribute('href', 'https://trello.com/');
    a.ariaLabel = 'Click to go to the Trello website';

    const logo = document.createElement('div');
    logo.classList.add('app__logo');
    logo.innerHTML = LOGO_SVG;
    a.append(logo);

    const title = document.createElement('h1');
    title.classList.add('app__title');
    title.textContent = 'Welcome to Like-Trello!';

    const appContent = document.createElement('div');
    appContent.classList.add('app__content');

    this.element.append(a, title, appContent);
    this.content = appContent;
  }

  renderSections() {
    for (const el of this.array) {
      const newSection = document.createElement('section');
      newSection.classList.add('task__section');
      newSection.dataset.title = el;
      this.content.append(newSection);

      const section = this.content.querySelector(`[data-title="${el}"]`);
      const newTaskList = new Section(section, el, this.data[el]);
      newTaskList.renderSection();
      section.append(newTaskList);
      section.lastChild.remove();
    }
  }
}
