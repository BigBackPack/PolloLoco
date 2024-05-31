let isFullscreen = false;

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
const canvasWidth = 720;
const canvasHeight = 480;

const fullscreenButton = document.getElementById('fullscreen-button');
const minscreenButton = document.getElementById('minscreen-button');
const canvasContainer = document.getElementById('canvas-container');
const aspectRatio = canvasWidth / canvasHeight;

let scaledWidth, scaledHeight;

if (viewportWidth / viewportHeight > aspectRatio) {
    // Screen is wider than aspect ratio, scale to height
    scaledHeight = viewportHeight;
    scaledWidth = scaledHeight * aspectRatio;
} else {
    // Screen is taller than aspect ratio, scale to width
    scaledWidth = viewportWidth;
    scaledHeight = scaledWidth / aspectRatio;
}


// check if : is mobuile device
function isMobile() {
  const userAgent = navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}

function adjustElements() {
  if (isMobile()) {
    document.getElementById("title-container").style.display = "none";
    document.getElementById("fullscreen-button").style.display = "none";
  } else {
    document.getElementById("title-container").style.display = "flex";
    document.getElementById("fullscreen-button").style.display = "block";
  }
}

// Call adjustElements on initial load
adjustElements();

// Add event listener for window resize
window.addEventListener('resize', adjustElements);


// check if : is landscape
function checkOrientation() {
  if (screen.orientation && screen.orientation.type) {
    const orientation = screen.orientation.type;
    if (orientation === 'landscape-primary' || orientation === 'landscape-secondary') {
      console.log("Landscape mode");
      document.getElementById("fullscreen-overlay").style.display = "none"
    } else if (orientation === 'portrait-primary' || orientation === 'portrait-secondary') {
      console.log("Portrait mode");
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


fullscreenButton.addEventListener('click', () => {
    if (!isFullscreen) {
      canvasContainer.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    isFullscreen = !isFullscreen;
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
  

minscreenButton.addEventListener('click', () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
});