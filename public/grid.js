//grid stuff
let button = document.getElementById('gridbutton')
let downloadbtn = document.getElementById('download')
let divHolder = document.getElementById('grid')
let selectorHolder = document.getElementById('selectorHolder')
let tileSize = 25;
let borderSize = 2;
let activeSelector = 'default'

//server stuff aaaaaaaaa
let socket = io();
let JSONFILE

button.addEventListener("click", ()=>{
    clearGrid();
    buildGrid(getGridDimensions());
});

downloadbtn.addEventListener("click", (e)=>{
    downloadGrid()
    e.preventDefault();
    socket.emit('save level',JSONFILE); //here we send the JSONFILE string to the server (see ../index.js)
})

addTileSelector("spawnpoint")
addTileSelector("path")
addTileSelector("buildable")
addTileSelector("waypoint")
addTileSelector("endpoint")
addTileSelector("default")

clickGridTiles();
clickSelectors();

function downloadGrid(){
    let tileData = []
    for (let i = 0; i < divHolder.children.length; i++){
        let color = divHolder.children[i].style.backgroundColor
        let type;
        switch(color){      
            case "red":
                type = "spawnpoint"
            break
            case "darkorchid":
                type = "path"
            break
            case "green":
                type = "buildable"
            break
            case "cyan":
                type = "waypoint"
            break          
            case "yellow":
                type = "endpoint"
            break
            case "darkgrey":
                type = "default"
            break
        }
        tileData.push(type)       
    }   
    //console.log(tileData)
    const JSONDATA = {
        width: document.getElementById('widthfield').value,
        height: document.getElementById("heightfield").value,
        tiles: tileData
    }
    JSONFILE = JSON.stringify(JSONDATA, null, 2) //uhhhh this puts every tile in the array on a seperate line, should probably fix this? might work like this though
    console.log(JSONFILE)
}

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
        tile.style.backgroundColor = 'darkgrey'
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

let colorDict = {spawnpoint:'red',path:'darkorchid',buildable:'green',waypoint:'cyan',endpoint:'yellow',default:'darkgrey'}

function clickGridTiles(){
    divHolder.addEventListener('click', (e)=>{
        if (e.target.getAttribute('id')!='grid'){
            e.target.style.backgroundColor = colorDict[activeSelector];
        }
    })
}