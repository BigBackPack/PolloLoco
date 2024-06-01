let isFullscreen = false;

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
const canvasWidth = 720;
const canvasHeight = 480;
const aspectRatio = canvasWidth / canvasHeight;

let scaledWidth, scaledHeight;


function adjustAspectRatio() {
  if (viewportWidth / viewportHeight > aspectRatio) {
      scaledHeight = viewportHeight;
      scaledWidth = scaledHeight * aspectRatio;
  } else {
      scaledWidth = viewportWidth;
      scaledHeight = scaledWidth / aspectRatio;
  }
}


adjustAspectRatio();


function isMobile() {
  console.log(canvasWidth);
  adjustAspectRatio();

  const userAgent = navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

}


function adjustElements() {
  if (isMobile()) {
    titleConatiner.style.display = "none";
    fullscreenButton.style.display = "none";
    buttonMoveLeft.style.display = "block";
    buttonMoveRight.style.display = "block";
    jumpButton.style.display = "block";
    throwButton.style.display = "block";
    canvasConatiner.style.justifyContent = "flex-end";
    console.log("mobile view", canvasConatiner.style.justifyContent);
  } else {
    titleConatiner.style.display = "flex";
    fullscreenButton.style.display = "block";
    buttonMoveLeft.style.display = "none";
    buttonMoveRight.style.display = "none";
    jumpButton.style.display = "none";
    throwButton.style.display = "none";
    canvasConatiner.style.justifyContent = "center";
    console.log("desktop view", canvasConatiner.style.justifyContent);
  }
}


adjustElements();


window.addEventListener('resize', adjustElements);


// check if : is landscape
function checkOrientation() {
  if (screen.orientation && screen.orientation.type) {
    const orientation = screen.orientation.type;
    if (orientation === 'landscape-primary' || orientation === 'landscape-secondary') {
      // console.log("Landscape mode");
      document.getElementById("fullscreen-overlay").style.display = "none"
    } else if (orientation === 'portrait-primary' || orientation === 'portrait-secondary') {
      // console.log("Portrait mode");
      document.getElementById("fullscreen-overlay").style.display = "flex"
    } else {
      console.log("Unknown orientation");
    }
  }
}

// Call the function to check orientation on load or resize
window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);


// full screen feature
document.addEventListener('fullscreenchange', () => {
    isFullscreen = document.fullscreenElement !== null;
    updateButtonVisibility();
});


function updateButtonVisibility() {
    if (isFullscreen) {
      fullscreenButton.style.display = 'none';
      minscreenButton.style.display = 'block';
      canvas.style.width = `${scaledWidth}px`;
      canvas.style.height = `${scaledHeight}px`;
    } else {
      fullscreenButton.style.display = 'block';
      minscreenButton.style.display = 'none';
      canvas.style.width = `${canvasWidth}px`; 
      canvas.style.height = `${canvasHeight}px`;
    }
};
  

fullscreenButton.addEventListener('click', () => {
  if (!isFullscreen) {
    canvasConatiner.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
  isFullscreen = !isFullscreen;
  updateButtonVisibility();
});


minscreenButton.addEventListener('click', () => {
    if (isFullscreen) {
      document.exitFullscreen();
      updateButtonVisibility();
    }
});
