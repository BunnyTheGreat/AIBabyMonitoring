status = "";
song = "";
objects = [];

function preload() {
    song = loadSound("alert_alert.mp3");
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
    cocoSSD = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        cocoSSD.detect(video, gotresults);
        for (i = 0; i < objects.length; i++) {
            fill("red");
            percent = floor(objects[i].confidence * 100);
            stroke("red");
            noFill();
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == "person") {
            document.getElementById("status").innerHTML = "Status: Person Detected";
            song.stop();
            }
            else {
                song.play();
                document.getElementById("status").innerHTML = "Status: Baby Not Found";
            }
        }

        if (objects.length == 0) {
            song.play();
            document.getElementById("status").innerHTML = "Status: Baby Not Found";
        }
    }
}

function gotresults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

