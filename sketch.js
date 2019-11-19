// // Starting code from Kyle McDonald https://editor.p5js.org/kylemcdonald/sketches/BJOcyD9hm
// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2
// Note CLMTracker library added in HTML

// Q: Can you add code that asks you to center face in screen?
'use strict'
let osc;
let v1 = createVector(positions[44][0]);
let v2 = createVector(positions[50][0]);
let playing= false;
// let img;
var capture;
var tracker;
var w = 640,
    h = 480;
    // function preload() {
    //   img = loadImage('images/note.jpg');
    // }
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
ellipse(v1.x, v2.y);
  //outline of the face
    noFill();
    stroke(255);
    beginShape();
    for (var i = 0; i < positions.length; i++) {
        vertex(positions[i][0], positions[i][1]);
    }
    endShape();
//numbers
    // noStroke();
    // for (var i = 0; i < positions.length; i++) {
    //     fill(map(i, 0, positions.length, 0, 360), 50, 100);
    //     ellipse(positions[i][0], positions[i][1], 4, 4);
    //     text(i, positions[i][0], positions[i][1]);
    // }

  // estimate smiling amount through distance of corners of mouth
    if (positions.length > 0) {
        var mouthLeft = createVector(positions[44][0], positions[44][1]);
        var mouthRight = createVector(positions[50][0], positions[50][1]);
        var smile = mouthLeft.dist(mouthRight);

        // line shows a bar showing smiling amount



        // noStroke();
        // fill(0, 255, 255);
        // ellipse(positions[50][0], positions[44][1], 50, 50);
     osc.freq(smile * 15);

      osc.start();

    }

      if (positions.length > 0) {
        var faceLeft = createVector(positions[14][0], positions[14][1]);
        var faceRight = createVector(positions[50][0], positions[50][1]);
                var face = faceLeft.dist(mouthRight);
           rect(20, 20, face * 3, 20);
        osc.amp(face *.0005);
      }
}
