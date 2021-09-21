const container = document.getElementById("container");

function makeGrid(rows, cols) {
  container.style.setProperty('grid-row', rows);
  container.style.setProperty('grid-column', cols);
  for (i = 0; i < (rows * cols); i++) {
    let cell = document.createElement("div");
    cell.innerText = (i + 1);
    container.appendChild(cell).className = "grid-item";
  };
};



makeGrid(Box1, Box2);