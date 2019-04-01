const visibilityToggle = (element) => element.classList.toggle(`visually-hidden`);

const removeAllChildNodes = (parentNode) => {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
};

const removeActiveToggle = (parentNode) => {
  const activeNode = parentNode.querySelector(`.view-switch__item--active`);
  if (activeNode) {
    activeNode.classList.remove(`view-switch__item--active`);
  }
};

export {visibilityToggle, removeAllChildNodes, removeActiveToggle};

