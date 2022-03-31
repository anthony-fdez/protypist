export function preventUsingArrows(e) {
  if (e.keyCode === 37 || e.keyCode === 39) {
    e.preventDefault();
  }
}
