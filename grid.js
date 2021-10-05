let button = document.getElementById('gridbutton')
let divHolder = document.getElementById('grid')
let selectorHolder = document.getElementById('selectorHolder')

let tileSize = 25;
let borderSize = 2;

let activeSelector = 'default'

button.addEventListener("click", ()=>{
    clearGrid();
    buildGrid(getGridDimensions());
});

addTileSelector("default")
addTileSelector("spawnpoint")
addTileSelector("path")
addTileSelector("buildable")
addTileSelector("waypoint")
addTileSelector("deselect")

clickGridTiles();
clickSelectors();

function clickSelectors(){
    if(selectorHolder.children.length > 0){
        selectorHolder.addEventListener('click',(e)=>{
            if(e.target.id != 'selectorHolder'){
                activeSelector = e.target.id;
                for (let i=0;i<selectorHolder.children.length;i++){
                    selectorHolder.children[i].style.borderSize = '10px'
                }
                e.target.style.borderWidth = "2px";
            }
        })
    }
}

function addTileSelector(name){
    let size = 20;
    let margin = 5; 
    let tileSelector = document.createElement('div');
    tileSelector.id = name;
    tileSelector.classname = 'selector';
    tileSelector.style.width = size + 'px';
    tileSelector.style.height = size + 'px';
    
    let image = "url('" + name + ".png')";
    tileSelector.style.left = selectorHolder.children.length * (size + margin) + margin + "px";
    selectorHolder.appendChild(tileSelector);
}

function buildGrid(dimensions){
    let tileCount = dimensions.w * dimensions.h;
    for (let i=0;i<tileCount;i++){
        let tile = document.createElement('div');
        tile.className = 'tile';
        tile.style.width = tileSize+'px';
        tile.style.height = tileSize+'px';
        tile.style.borderWidth = borderSize+'px';
        tile.style.left = (i % dimensions.w) * (tileSize + borderSize) + 'px';
        tile.style.top = Math.floor(i / dimensions.w) * (tileSize + borderSize) + 'px';

        divHolder.appendChild(tile);
    }
}

function clearGrid(){
    for (let i = divHolder.children.length-1; i > 0; i--){
        divHolder.removeChild(divHolder.children[i])
    }
}

function getGridDimensions(){
    let width = document.getElementById('widthfield').value
    let height = document.getElementById('heightfield').value

    let dimensions = {'w':width,'h':height};
    return dimensions
}

let colorDict = {spawnpoint:'red',default:'darkgrey',path:'darkorchid',waypoint:'cyan',buildable:'green',deselect:'tomato'}

function clickGridTiles(){
    divHolder.addEventListener('click', (e)=>{
        if (e.target.getAttribute('id')!='grid'){
            e.target.style.backgroundColor = colorDict[activeSelector];
        }
    })
}

//Stinky outdated code

// button.addEventListener("click", ()=>{
//     let width = document.getElementById('widthfield').value
//     let height = document.getElementById('heightfield').value
  
//     let divHolder = document.getElementById('grid')

//     let tilesize = 25; //PROBABLY MAYBE PERHAPS MAYHAPS TODO: Change size according to grid
//     let borderSize = 2;
//     let tileTotal = height * width;

//     for (let i = divHolder.children.length-1; i > 0; i--) //remove tiles before generating 'em
//     {
//         divHolder.removeChild(divHolder.children[i])
//     }

//     //console.log(tileTotal);
//     for (let i = 0; i < tileTotal; i++) //make tiles
//     {
//         let tile = document.createElement("div");
//         tile.className = 'tile';
//         tile.style.width = tilesize+'px';
//         tile.style.height = tilesize+'px';
//         tile.style.borderWidth = borderSize+'px';

//         tile.style.left = (i % width) * (tilesize + borderSize) + 'px';
//         //console.log(newDiv.style.left);

//         tile.style.top = Math.floor(i / width) * (tilesize + borderSize) + 'px';

//         divHolder.appendChild(tile);
//     }
// })