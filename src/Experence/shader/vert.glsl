
varying vec2 vuv;
uniform vec3 umouse;       // Mouse position passed from JavaScript


  void main() {
    vec3 uposition=position;
    // uposition.xy+=umouse;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(uposition, 1.0);
    vuv = uv;

  }