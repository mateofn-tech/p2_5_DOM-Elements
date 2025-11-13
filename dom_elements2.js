let input;
let slider;
let xOffset = 0;
let yOffset = 0;
let sensorActivated = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  input = createInput('');
  input.attribute('placeholder', 'escriu');
  input.position(10, 10);
  input.size(250);

  slider = createSlider(10, 255, 32);
  slider.position(10, 50);
  slider.style('width', '250px');

  // Botón para activar el sensor en móviles (iOS/Chrome)
  if (typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function') {
    let button = createButton('Activar Movimiento');
    button.position(10, 90);
    button.mousePressed(() => {
      DeviceOrientationEvent.requestPermission().then(response => {
        if (response === 'granted') {
          sensorActivated = true;
          button.hide();
        } else {
          alert('Permiso denegado');
        }
      });
    });
  } else {
    sensorActivated = true; // navegadores que no requieren permiso
  }
}

function draw() {
  background(0);

  if (slider.value() > 255) {
    slider.value(0);
  }

  if (sensorActivated) {
    xOffset = map(rotationY, -90, 90, -width / 2, width / 2);
    yOffset = map(rotationX, -90, 90, -height / 2, height / 2);
  }

  fill(255);
  textSize(slider.value());
  textAlign(LEFT, CENTER);
  text(input.value(), 20 + xOffset, height / 2 + yOffset);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
