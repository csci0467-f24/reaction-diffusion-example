let rdShader;

let buffer;

/*
A function to check if we have any shader errors.
Taken from https://stackoverflow.com/questions/75573386/p5-catch-shader-compilation-errors
*/
function checkShaderError(shaderObj, shaderText) {
  gl = shaderObj._renderer.GL;
  glFragShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(glFragShader, shaderText);
  gl.compileShader(glFragShader);
  if (!gl.getShaderParameter(glFragShader, gl.COMPILE_STATUS)) {
    return gl.getShaderInfoLog(glFragShader);
  }
  return null;
}

function setup() {
  createCanvas(800, 800, WEBGL);

  fetch("shaders/reaction-diffusion.frag")
    .then((response) => response.text())
    .then((data) => {
      rdShader = createFilterShader(data);
      shaderError = checkShaderError(rdShader, data);
      if (shaderError) {
        console.error(shaderError);
      }
    });

  buffer = createFramebuffer({ format: FLOAT });

}

function draw() {
  background(0);

  if (rdShader) {
    buffer.begin();

    filter(rdShader);

    buffer.end();
   

    imageMode(CENTER);
    image(buffer, 0,0);
  }
}
