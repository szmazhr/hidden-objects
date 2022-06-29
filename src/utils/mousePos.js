function getCursorRelPos(element) {
  const e = window.event;

  const elementRect = element.getBoundingClientRect();
  /* calculate the cursor's x and y coordinates, relative to the ElementProvided: */
  const x = e.pageX - elementRect.left - window.pageXOffset;
  const y = e.pageY - elementRect.top - window.pageYOffset;
  /* consider any page scrolling: */
  return { x, y };
}

// future plan to add more options for mouse position
// eslint-disable-next-line import/prefer-default-export
export { getCursorRelPos };
