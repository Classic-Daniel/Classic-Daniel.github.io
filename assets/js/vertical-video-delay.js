let video = document.getElementById("videoInput"); // video is the id of video tag
video.width = 320;
video.height = 240;
document.getElementById("videoInput").style.display = "none";

var BUFFER_SIZE = 30;
var bufferReady = false;
var imageBuffer = new Array(BUFFER_SIZE);
console.log("imageBuffer length: " + imageBuffer.length);
// for (let i = 0; i < BUFFER_SIZE; i++) {
//     imageBuffer[i] = new cv.Mat(video.height, video.width, cv.CV_8UC4);
// }
var currentIndex = -1;

function addNewImage(image){
    imageBuffer[currentIndex] = image.clone();
    currentIndex = (currentIndex + 1) % BUFFER_SIZE;
    if(imageBuffer[BUFFER_SIZE - 1] != undefined){
      bufferReady = true;
    }
}

function getProcessedImage(currentImage){
    let generatedImage = currentImage.clone();

    if(bufferReady){
      let heightStep = Math.round(video.height / BUFFER_SIZE);
      let subarrayLength = heightStep * video.width * 4; 
      for(let part = 0; part < BUFFER_SIZE - 1; part++)
      {
        partFirstDataIndex = subarrayLength * part;
        bufferIndex = (currentIndex + part) % BUFFER_SIZE;
        generatedImage.data.set(imageBuffer[bufferIndex].data.subarray(partFirstDataIndex, partFirstDataIndex + subarrayLength), partFirstDataIndex);
      }
    }
    addNewImage(currentImage);
    return generatedImage;
}

navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then(function(stream) {
    video.srcObject = stream;
    video.play();

    let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let dst = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let cap = new cv.VideoCapture(video);

    const FPS = 30;
    function processVideo() {
      try {
        // if (!streaming) {
        //   // clean and stop.
        //   src.delete();
        //   dst.delete();
        //   return;
        // }
        let begin = Date.now();
        // start processing.
        cap.read(src);
        // cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
        dst = getProcessedImage(src);

        cv.imshow("canvasOutput", dst);
        // schedule the next one.
        let delay = 1000 / FPS - (Date.now() - begin);
        setTimeout(processVideo, delay);
      } catch (err) {
        console.error(err);
      }
    }

    // schedule the first one.
    setTimeout(processVideo, 0);
  })
  .catch(function(err) {
    console.log("An error occurred! " + err);
  });
