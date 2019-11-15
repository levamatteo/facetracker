// // Starting code from Kyle McDonald https://editor.p5js.org/kylemcdonald/sketches/BJOcyD9hm
// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2
// Note CLMTracker library added in HTML

// Q: Can you add code that asks you to center face in screen?
'use strict'
let osc;
let playing= false;
var capture;
var tracker;
var w = 640,
    h = 480;

function setup() {
     osc = new p5.Oscillator();
  
   
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
       
    }, function() {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    createCanvas(w, h);
    capture.size(w, h);
    capture.hide();

    colorMode(HSB);

    tracker = new clm.tracker();
    tracker.init();
    tracker.start(capture.elt);
}

function draw() {
    image(capture, 0, 0, w, h);
    var positions = tracker.getCurrentPosition();

  
    noFill();
    stroke(255);
    beginShape();
    for (var i = 0; i < positions.length; i++) {
        vertex(positions[i][0], positions[i][1]);
    }
    endShape();

    noStroke();
    for (var i = 0; i < positions.length; i++) {
        fill(map(i, 0, positions.length, 0, 360), 50, 100);
        ellipse(positions[i][0], positions[i][1], 4, 4);
        text(i, positions[i][0], positions[i][1]);
    }

  // estimate smiling amount through distance of corners of mouth
    if (positions.length > 0) {
        var mouthLeft = createVector(positions[44][0], positions[44][1]);
        var mouthRight = createVector(positions[50][0], positions[50][1]);
        var smile = mouthLeft.dist(mouthRight);
      
        // line shows a bar showing smiling amount
      


        // noStroke();
        // fill(0, 255, 255);
        // ellipse(positions[50][0], positions[44][1], 50, 50);
     osc.freq(smile * 25);
      
      osc.start();

    }
      if (positions.length > 0) {
        var noseLeft = createVector(positions[39][0], positions[39][1]);
        var noseRight = createVector(positions[35][0], positions[35][1]);
        var nose = noseLeft.dist(noseRight);
           rect(20, 20, nose * 3, 20);
        osc.amp(nose *.005);
      }   
}
