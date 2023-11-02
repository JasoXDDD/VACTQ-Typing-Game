class Player {
    constructor(index) {
        this.progress = 0;
        this.index = index;
    }
    
    reset() {
        this.progress = 0;
    }

    update(positionData) {
        this.progress = positionData[this.index];
    }
}

function moveCharacterToX(index, pos) {
    document.getElementById("character" + index).style.left = pos + "px";
    print("a");
}
moveCharacterToX(1, 50);

//Customizable game rules
const numberOfPlayers = 4;
const tickRate = 1000;
print("ab");
//Initialize frontend player objects
let players = [];
for(let i = 0; i < numberOfPlayers; i++) {
    let player = new Player(i);
    players += player;
}

function getAPIData() {
    return [10, 0, 20,30];
}

function updatePositions(positionData) {
    players.forEach(player => {
        update(positionData);
    });
}

//Game Loop
function tick() {
    updatePositions(getAPIData());

    //Update cars animations
    moveCharacterToX(1, 50);
}

let interval = setInterval(tick, tickRate);