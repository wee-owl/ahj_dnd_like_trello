export default function getStorage() {
  const object = JSON.parse(localStorage.getItem('data')) || {};

  if (Object.keys(object).length === 0 && object.constructor === Object) {
    const sections = document.querySelectorAll('.task__section');
    sections.forEach((item) => { object[item.dataset.title] = []; });
  }

  const config = { attributes: true, childList: true, subtree: true };
  const callback = (mutationsList) => {
    const arr = new Set();

    mutationsList.forEach((mutation) => {
      const title = mutation.target.closest('.task__section').dataset.title;

      [...mutation.addedNodes].forEach((item) => {
        if (mutation.target.closest('.task__list')) {
          arr.add(item.firstChild.innerText);
          object[title].push(...arr);
        }
      });

      [...mutation.removedNodes].forEach((item) => {
        if (mutation.target.closest('.task__list')) {
          const delArr = object[title].filter((el) => el !== item.firstChild.innerText.trim());
          object[title] = [];
          object[title].push(...delArr);
        }
      });

      localStorage.setItem('data', JSON.stringify(object));
    });
  };

  const observer = new MutationObserver(callback);
  observer.observe(document.body, config);
}
