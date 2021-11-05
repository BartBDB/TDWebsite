//grid stuff
let button = document.getElementById('gridbutton')
let downloadbtn = document.getElementById('download')
let divHolder = document.getElementById('grid')
let selectorHolder = document.getElementById('selectorHolder')
let tileSize = 25;
let borderSize = 2;
let activeSelector = 'spawnpoint'
let tileData = []

//server stuff
let socket = io();
let JSONFILE

button.addEventListener("click", ()=>{
    clearGrid();
    buildGrid(getGridDimensions());
});

downloadbtn.addEventListener("click", (e)=>{
    downloadGrid() //technically unoptimized(?) but it doesn't use that many resources anyway so I technically don't care.
    if (tileData.length >= 1){
    e.preventDefault();
    downloadbtn.style.background = "url('images/EmergencyMeetingPressed.png')"
    socket.emit('save level',JSONFILE); //here we send the JSONFILE string to the server (see ../index.js)
    window.open('/download'); //5 F$%#&NG DAYS OF MY LIFE WASTED
    var x = document.getElementById("myAudio"); 
    x.play()
    }
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
    for (let i = 0; i < divHolder.children.length; i++){
        let color = divHolder.children[i].style.backgroundColor
        let newTile
        switch(color){      
            case "red":
                newTile = {
                    name: "spawnpoint",
                }         
            break
            case "darkorchid": //also known as 'dark purple'
                newTile = {
                    name: "path",
                }        
            break
            case "green":
                newTile = {
                    name: "buildable",
                }        
            break
            case "cyan":
                newTile = {
                    name: "waypoint",
                    //count: document.getElementById("waypoint").value
                }            
            break          
            case "yellow":
                newTile = {
                    name: "endpoint",
                }        
            break
            case "darkgrey":
                newTile = {
                    name: "default",
                }        
            break
        }    
        tileData.push(newTile) 
    }
    if (tileData.length >= 1){   
    //console.log(tileData)
        const JSONDATA = {
            width: document.getElementById('widthfield').value,
            height: document.getElementById("heightfield").value,
            tiles: tileData
        }
        JSONFILE = JSON.stringify(JSONDATA, null, 2)
        console.log(JSONFILE) //there seems to be a very odd bug where sometimes a default tile is thrown into slot 0 of the array? Dunno whats up with that one or how it even triggers in the first place. (Just reload the page if you need a different grid)
    }
}

function clickSelectors(){
    if(selectorHolder.children.length > 0){
        selectorHolder.addEventListener('click',(e)=>{
            if(e.target.id != 'selectorHolder'){
                activeSelector = e.target.id;
                activeSelector.style.border = 'dashed'
                for (let i=0;i<selectorHolder.children.length;i++){
                    selectorHolder.children[i].style.borderWidth = '10px'
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

//todo: add dropdown menu to waypoint tiles
