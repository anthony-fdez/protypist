export function preventUsingArrows(e) {
  console.log(e.keyCode);
  if (e.keyCode === 37 || e.keyCode === 39) {
    e.preventDefault();
  }
}
