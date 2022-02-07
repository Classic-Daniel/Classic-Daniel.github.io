let video = document.getElementById("videoInput"); // video is the id of video tag
video.width = 640;
video.height = 480;

var BUFFER_SIZE = 30;
var imageBuffer = new Array(BUFFER_SIZE);
console.log("imageBuffer length: " + imageBuffer.length);
// for (let i = 0; i < BUFFER_SIZE; i++) {
//         let img = new cv.Mat(video.height, video.width, cv.CV_8UC4);
//         // imageBuffer[i] = img;
// }
var currentIndex = 0;

function addNewImage(image){
    imageBuffer[currentIndex] = image.clone();
    currentIndex = (currentIndex + 1) % BUFFER_SIZE;
    // console.log(imageBuffer[currentIndex])
    console.log(currentIndex);
}

function getProcessedImage(){
    // generatedImage = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    // heightStep = Math.round(video.height / BUFFER_SIZE);

    // for (let i = 1; i < BUFFER_SIZE; i++) {
    //     // create temporary image that will hold the mask
    //     mask = cv.Mat(video.height, video.width, CV_8UC1, Scalar(0));
    //     cv2.rectangle(mask, (0, 0), (100, 100), (255), -1);
    //     imageBuffer[i].copyTo(generatedImage, mask);
    // }
    // return imageBuffer[0];
    // let mask = new cv.Mat(video.height, video.width, cv.CV_8UC1, [255]);
    // return mask;
    return imageBuffer[0];
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
        addNewImage(src);
        dst = getProcessedImage()

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
