varying vec2 vuv;

uniform vec3 umouse2;
uniform vec3 umouse;
uniform vec4 resolution;

void main() {
    vec2 uvv = vuv - 0.5;

    // Distance from first point (yellow)
    float ggg = distance(uvv, umouse.xy);
    float yellowMix = step(0.003, ggg);
    vec3 yellowColor = mix(vec3(1.0, 0.6, 0.0), vec3(1.0, 1.0, 0.5), yellowMix);

    // Distance from second point (red-blue)
    float mmmm = distance(uvv, umouse2.xy);
    float redMix =  step(0.003, mmmm);
    vec3 redColor = mix(vec3(0.0, 0.851, 1.0), vec3(1.0, 0.0706, 0.0706), 1.-redMix);

    // Combine both effects
   if(yellowMix==0.) {
      gl_FragColor = vec4(vec3(1.,1.,0.), 1.0);
   }

     if(redMix==0.) {
      gl_FragColor = vec4(vec3(1.0, 0.0, 0.0), 1.0);
   }
   


}
