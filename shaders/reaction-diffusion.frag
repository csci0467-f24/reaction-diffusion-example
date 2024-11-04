precision highp float;

  // x,y coordinates, given from the vertex shader
varying vec2 vTexCoord;

  // the canvas contents, given from filter()
uniform sampler2D tex0;
  // other useful information from the canvas
uniform vec2 texelSize;
uniform vec2 canvasSize;

vec2 offset(vec2 offset) {
  vec2 pos = vTexCoord + offset * texelSize;
  pos.x = mod(pos.x, canvasSize.x);
  pos.y = mod(pos.y, canvasSize.y);
  return pos;
}

vec4 laplacian(sampler2D tex) {
  vec4 sum = vec4(0.0);

  sum += 0.05 * texture2D(tex, offset(vec2(-1, -1)));
  sum += 0.2 * texture2D(tex, offset(vec2(0, -1)));
  sum += 0.05 * texture2D(tex, offset(vec2(1, -1)));
  sum += 0.2 * texture2D(tex, offset(vec2(-1, 0)));
  sum += -1.0 * texture2D(tex, offset(vec2(0, 0)));
  sum += 0.2 * texture2D(tex, offset(vec2(1, 0)));
  sum += 0.05 * texture2D(tex, offset(vec2(-1, 1)));
  sum += 0.2 * texture2D(tex, offset(vec2(0, 1)));
  sum += 0.05 * texture2D(tex, offset(vec2(1, 1)));

  return sum;
}

void main() {
  gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
}