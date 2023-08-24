export default class Move {
  #currentDraggingItem;
  #currentColumn;
  #elementMoved;

  constructor (container) {
    this.container = container;
    this.container.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    this.drag = this.drag.bind(this);
    this.setHandlers();
  }

  get elementMoved () {
    return this.#elementMoved;
  }

  set elementMoved (value) {
    this.#elementMoved = value;
  }

  get currentColumn () {
    return this.#currentColumn;
  }

  set currentColumn (value) {
    this.#currentColumn = value;
  }

  get currentDraggingItem () {
    return this.#currentDraggingItem;
  }

  set currentDraggingItem (value) {
    this.#currentDraggingItem = value;
  }

  setHandlers () {
    this.container.addEventListener('mousedown', this.startDragging.bind(this));
    this.container.addEventListener('mouseup', this.stopDragging.bind(this));
    this.container.addEventListener('mouseout', this.onMouseLeftWindow.bind(this));
  }

  startDragging (e) {
    if (e.which !== 1 || e.target.classList.contains('card__close')) return;
    this.currentDraggingItem = e.target.closest('.card');
    if (this.currentDraggingItem) {
      e.preventDefault();
      this.container.addEventListener('mousemove', this.drag);
      const { height, width, x, y } = this.currentDraggingItem.getBoundingClientRect();
      this.currentDraggingItem.classList.add('card-active');
      this.currentDraggingItem.style.width = `${width}px`;
      this.currentDraggingItem.height = height;
      this.currentDraggingItem.x = e.clientX - x;
      this.currentDraggingItem.y = e.clientY - y;
      this.currentDraggingItem.style.left = `${e.clientX - this.currentDraggingItem.x}px`;
      this.currentDraggingItem.style.top = `${e.clientY - this.currentDraggingItem.y}px`;
      this.currentColumn = this.currentDraggingItem.closest('.task__list');
    }
  }

  drag (e) {
    const targetEl = e.target.classList.contains('task__list') ? e.target : e.target.closest('.task__list');
    if (this.currentDraggingItem) {
      this.currentDraggingItem.style.left = `${e.clientX - this.currentDraggingItem.x}px`;
      this.currentDraggingItem.style.top = `${e.clientY - this.currentDraggingItem.y}px`;
      if (targetEl) {
        this.currentColumn.classList.remove('card-bg');
        this.currentColumn = targetEl;
        this.currentColumn.classList.add('card-bg');
        this.moveElementForDraggingItem(e, targetEl);
      } else {
        this.currentColumn.classList.remove('card-bg');
          if (this.elementMoved) {
            this.elementMoved.style['margin-top'] = null;
            this.elementMoved = undefined;
          }
      }
      document.body.style.cursor = 'grabbing';
    }
  }

  stopDragging (e) {
    if (this.currentDraggingItem) {
      const targetEl = e.target.classList.contains('task__list') ? e.target : e.target.closest('.task__list');
      this.currentDraggingItem.classList.remove('card-active');
      this.container.removeEventListener('mousemove', this.drag);
      if (targetEl) {
        this.currentDraggingItem.style.left = null;
        this.currentDraggingItem.style.top = null;
        if (!targetEl.lastChild) targetEl.appendChild(this.currentDraggingItem);
        targetEl.insertBefore(this.currentDraggingItem, this.elementMoved ? this.elementMoved : targetEl.lastChild.previousElementSibling);
      } else {
        this.currentDraggingItem.style.left = null;
        this.currentDraggingItem.style.top = null;
      }
      this.currentColumn.classList.remove('card-bg');
      this.currentDraggingItem.style.width = null;
      this.currentDraggingItem = undefined;
      if (this.elementMoved) this.elementMoved.style['margin-top'] = null;
      this.elementMoved = undefined;
      document.body.style.cursor = '';
    }
  }

  moveElementForDraggingItem (e, itemsColumn) {
    let counter = 0;
    Array.from(itemsColumn.querySelectorAll('.card')).every((el) => {
      if (el !== this.currentDraggingItem) {
        const { y, height } = el.getBoundingClientRect();
        if (y + height > e.clientY) {
          if (this.elementMoved) {
            this.elementMoved.style['margin-top'] = null;
          }
          el.style['margin-top'] = counter === 0 ? `${this.currentDraggingItem.height + 8}px` : `${this.currentDraggingItem.height}px`;
          this.elementMoved = el;
          return false;
        }
        counter += 1;
      }
      return true;
    });
  }

  onMouseLeftWindow (e) {
    if ((!e.relatedTarget || e.relatedTarget.nodeName === 'HTML') && this.currentDraggingItem) {
      const mouseUpEvent = new Event('mouseup', { bubbles: true, cancelable: false });
      this.container.dispatchEvent(mouseUpEvent);
    }
  }
}
