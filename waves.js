towerDiameter = 10;
wavesSpeedFactor = 2;
towers = [];

function randomPoint(){
	return floor(random(width));
}

currentID = 0;
function nextWaveID(){
	return ++currentID;
}
class Tower{
	constructor(x=randomPoint(), y=randomPoint()){
		this.x = x;
		this.y = y;
		this.waves = [];
		this.touchedWavesIDs = [];
	}

	show(){
		//Draw the tower first
		noStroke();
		fill(255);
		ellipse(this.x, this.y, towerDiameter);

		//Then draw the waves
		for (let wave of this.waves){
			stroke(255);
			noFill();
			ellipse(this.x, this.y, wave[0]);
		}
	}

	createWave(){
		this.waves.push([0, nextWaveID()]);
	}

	incrementWaves(){
		for (let i=0;i<this.waves.length; i++){
			this.waves[i][0] += wavesSpeedFactor;
			for (let tower of towers){
				if (tower !== this && dist(this.x, this.y, tower.x, tower.y) < this.waves[i][0] / 2){
					let shouldWave = true;
					for (let id of tower.touchedWavesIDs){
						if (this.waves[i][1] == id){
							shouldWave = false;
							break;
						}
					}
					if (shouldWave){
						tower.touchedWavesIDs.push(this.waves[i][1]);
						tower.createWave();
						
					}
				}
			}
		}
	}
}

function setup(){
	createCanvas(600, 600);
	background(0);
	for (let i=0; i<4; i++){
		towers[i] = new Tower();
		towers[i].createWave();
	}
}

function draw(){
	background(0);
	for (let tower of towers){
		tower.incrementWaves();
		tower.show();
	}
}