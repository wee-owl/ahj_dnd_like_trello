export default function transition() {
  const appContent = document.querySelector('.app__content');
  const cards = document.querySelectorAll('.card');

  cards.forEach((item) => {
    const card = item;
    card.draggable = true;

    card.addEventListener('dragstart', (e) => {
      e.target.classList.add('dragged');
    });

    card.addEventListener('dragend', (e) => {
      e.target.classList.remove('dragged');
    });
  });

  const getNextElement = (cursorPosition, currentElement) => {
    const currentElementCoord = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
    const nextElement = (cursorPosition < currentElementCenter)
      ? currentElement
      : currentElement.nextElementSibling;
    return nextElement;
  };

  appContent.addEventListener('dragover', (e) => {
    e.preventDefault();

    const activeElement = appContent.querySelector('.dragged');
    const activeList = activeElement.parentElement;
    const currentElement = e.target;
    const currentList = currentElement.parentElement;
    if (!activeList || !activeElement) return;

    if (activeList !== currentList) {
      if (e.target.closest('.task__section')) {
        if (!e.target.closest('.task__section').children[1].length) {
          e.target.closest('.task__section').children[1].append(activeElement);
        }
      }
    }

    const isMoveable = activeElement !== currentElement
      && currentElement.classList.contains('card');
    if (!isMoveable) return;
    const nextElement = getNextElement(e.clientY, currentElement);

    if (activeList === currentList) {
      if (nextElement) {
        if (activeElement === nextElement) return;
        if ((nextElement && activeElement) === nextElement.previousElementSibling) return;
        activeList.insertBefore(activeElement, nextElement);
      } else {
        activeList.append(activeElement);
      }
    }

    if (activeList !== currentList) {
      if (nextElement) {
        if (activeElement === nextElement) return;
        if ((nextElement && activeElement) === nextElement.previousElementSibling) return;
        currentList.insertBefore(activeElement, nextElement);
      } else {
        currentList.append(activeElement);
      }
    }
  });
}
