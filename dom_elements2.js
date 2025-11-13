function setup() {
  createCanvas(windowWidth, windowHeight);
  
  input = createInput('');
  input.attribute('placeholder', 'escriu');
  input.position(10, 10);
  input.size(250);
  
  slider = createSlider(10, 255, 32);
  slider.position(10, 50);
  slider.style('width', '250px');

  // Botón para pedir permiso en iOS/Chrome
  if (typeof DeviceOrientationEvent !== 'undefined' && 
      typeof DeviceOrientationEvent.requestPermission === 'function') {
    let button = createButton('Activar Movimiento');
    button.position(10, 90);
    button.mousePressed(() => {
      DeviceOrientationEvent.requestPermission().then(response => {
        if (response === 'granted') {
          button.hide();
        } else {
          alert('Permiso denegado');
        }
      });
    });
  }
}
