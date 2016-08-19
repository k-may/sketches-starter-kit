precision mediump float;

attribute vec4 position;
varying vec2 vUv;
attribute vec2 texCoord;

void main() {
    vUv = texCoord;
   gl_Position = position;
}
