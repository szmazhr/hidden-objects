/* eslint-disable no-param-reassign */
import { getCursorRelPos } from './mousePos';

function updateLens(element, lens) {
  // define the container Rectangle for the image and lens
  const container = element.parentElement;

  /* get the cursor's x and y positions relative to image and container: */
  const { x: cX, y: cY } = getCursorRelPos(container);
  const { x: iX, y: iY } = getCursorRelPos(element);

  /* calculate the image position relative to container */
  const padX = cX - iX;
  const padY = cY - iY;

  /* calculate the position of the lens: */
  let x = cX;
  let y = cY;

  /* prevent the lens from being positioned outside the image: */
  if (x > element.offsetWidth + padX) {
    x = element.offsetWidth + padX;
  }
  if (x < padX) {
    x = padX;
  }
  if (y > element.offsetHeight + padY) {
    y = element.offsetHeight + padY;
  }
  if (y < padY) {
    y = padY;
  }

  /* set the position of the lens: */

  lens.style.left = `${x}px`;
  lens.style.top = `${y}px`;
  /* display what the lens "sees": */
}

export default updateLens;
