export const createElement = (template) => {
  const newElement = document.createElement(`template`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};
