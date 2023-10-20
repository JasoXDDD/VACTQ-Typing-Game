class Player {
    current_progress;
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