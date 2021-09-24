let button = document.getElementById('gridbutton')

button.addEventListener("click", ()=>{
    let width = document.getElementById('widthfield').value
    let height = document.getElementById('heightfield').value
  
    let divHolder = document.getElementById('grid')

    let tilesize = 10;
    let tileTotal = height * width;
    //console.log(tileTotal);
    for (let i = 0; i < tileTotal; i++)
    {
        let tile = document.createElement("div");
        tile.className = 'tile';
        tile.style.width = tilesize+'px';
        tile.style.height = tilesize+'px';

        tile.style.left = (i % width) * tilesize + 'px';
        //console.log(newDiv.style.left);

        tile.style.top = Math.floor(i / width) * tilesize + 'px';

        divHolder.appendChild(tile);
    }
})