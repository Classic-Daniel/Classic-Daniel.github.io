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
    currentIndex = (currentIndex + 1) % BUFFER_SIZE;
    imageBuffer[currentIndex] = image.clone();
    if(imageBuffer[BUFFER_SIZE - 1] != undefined){
      bufferReady = true;
    }
}

function getProcessedImage(){
    // let generatedImage = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let generatedImage = imageBuffer[currentIndex].clone();
    // console.log(generatedImage);
    // bottomImage = imageBuffer[Math.max((currentIndex - 10), 0)];
    // bottomImage = cv.colRange(generatedImage, 100, 200);

    heightStep = Math.round(video.height / BUFFER_SIZE);

    if(bufferReady){
      for(let part = 1; part < BUFFER_SIZE; part++)
      {
        partFirstRow = heightStep * part;
        bufferIndex = (currentIndex + part) % BUFFER_SIZE;
        for (let j = partFirstRow; j < partFirstRow + heightStep; j++)
        {
          for (let i = 1; i < video.width; i++)
          {              
            // generatedImage.ucharPtr(j, i)[0] = 255;
            // generatedImage.ucharPtr(j, i)[1] = 255;
            // generatedImage.ucharPtr(j, i)[2] = 255;
            generatedImage.ucharPtr(j, i)[0] = imageBuffer[bufferIndex].ucharPtr(j, i)[0];
            generatedImage.ucharPtr(j, i)[1] = imageBuffer[bufferIndex].ucharPtr(j, i)[1];
            generatedImage.ucharPtr(j, i)[2] = imageBuffer[bufferIndex].ucharPtr(j, i)[2];
          }
        }
      }

      // for (let j = 1; j < video.height/3; j++)
      // {
      //   for (let i = 1; i < video.width; i++)
      //   {              
      //     generatedImage.ucharPtr(j, i)[0] = 255;
      //     generatedImage.ucharPtr(j, i)[1] = 255;
      //     generatedImage.ucharPtr(j, i)[2] = 255;
      //       // generatedImage.ucharPtr(j, i)[0] = imageBuffer[bufferIndex].ucharPtr(j, i)[0];
      //       // generatedImage.ucharPtr(j, i)[1] = imageBuffer[bufferIndex].ucharPtr(j, i)[1];
      //       // generatedImage.ucharPtr(j, i)[2] = imageBuffer[bufferIndex].ucharPtr(j, i)[2];
      //   }
      // }
    }
    
    // for (let i = 1; i < BUFFER_SIZE; i++) {
    //     // create temporary image that will hold the mask
    //     mask = cv.Mat(video.height, video.width, CV_8UC1, Scalar(0));
    //     cv2.rectangle(mask, (0, 0), (100, 100), (255), -1);
    //     imageBuffer[i].copyTo(generatedImage, mask);
    // }
    // return imageBuffer[0];
    // heightStep = Math.round(video.height / BUFFER_SIZE);
    // let mask = new cv.Mat(video.height, video.width, cv.CV_8UC1, [0, 0, 0, 0]);
    // cv.rectangle(mask, [0, 0], [100, 100], [122], -1);
    // return mask;
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
