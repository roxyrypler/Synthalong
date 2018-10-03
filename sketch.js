

// Pitch variables
let pitch;
let audioContext;
let audioStream;

// Keyboard variables
const cornerCoords = [10, 40];
const rectWidth = 90;
const rectHeight = 300;
const keyRatio = 0.58;
const scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
let currentNote = '';
var synth = new Tone.Synth().toMaster()


function setup() {
  createCanvas(640, 520);
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);
}

function startPitch() {
  pitch = ml5.pitchDetection('./model/', audioContext , mic.stream, modelLoaded);
}

function modelLoaded() {
  select('#status').html('Model Loaded');
  getPitch();
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {
      let midiNum = freqToMidi(frequency);
      currentNote = scale[midiNum % 12];
		console.log(currentNote);
		if(currentNote == 'C') {
			synth.triggerAttackRelease('C4', '8n');
		}else if (currentNote == 'C#') {
			synth.triggerAttackRelease('C#4', '9n');	  
		}else if (currentNote == 'D') {
			synth.triggerAttackRelease('D4', '10n');	  
		}else if (currentNote == 'D#') {
			synth.triggerAttackRelease('D#4', '11n');	  
		}else if (currentNote == 'E') {
			synth.triggerAttackRelease('E4', '12n');	  
		}else if (currentNote == 'F') {
			synth.triggerAttackRelease('F4', '13n');	  
		}else if (currentNote == 'F#') {
			synth.triggerAttackRelease('F#4', '14n');	  
		}else if (currentNote == 'G') {
			synth.triggerAttackRelease('G4', '15n');	  
		}else if (currentNote == 'G#') {
			synth.triggerAttackRelease('G#4', '16n');	  
		}else if (currentNote == 'A') {
			synth.triggerAttackRelease('A4', '17n');	  
		}else if (currentNote == 'A#') {
			synth.triggerAttackRelease('A#4', '18n');	  
		}else if (currentNote == 'B') {
			synth.triggerAttackRelease('B4', '19n');	  
		}
    }
    getPitch();
  })
}

function draw() {
  drawKeyboard();
}

function drawKeyboard() {
  let whiteKeyCounter = 0;
  background(255);
  strokeWeight(2);
  stroke(50);
  // White keys
  for (let i = 0; i < scale.length; i++) {
    if (scale[i].indexOf('#') == -1) {
      if (scale[i] == currentNote) {
        fill(200);
      } else {
        fill(255);
      }
      rect(cornerCoords[0] + (whiteKeyCounter * rectWidth), cornerCoords[1], rectWidth, rectHeight);
      whiteKeyCounter++;
    }
  }
  whiteKeyCounter = 0;

  // Black keys
  for (let i = 0; i < scale.length; i++) {
    if (scale[i].indexOf('#') > -1) {
      if (scale[i] == currentNote) {
        fill(100);
      } else {
        fill(0);
      }
      rect(cornerCoords[0] + (whiteKeyCounter * rectWidth) - (rectWidth / 3), cornerCoords[1], rectWidth * keyRatio, rectHeight * keyRatio);
    } else {
      whiteKeyCounter++;
    }
  }
}