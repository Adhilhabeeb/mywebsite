varying vec2 vuv; // Ensure this matches the name from the vertex shader

uniform vec3 umouse;
uniform vec4 resolution;

void main() {
    vec2 neuv=(vuv-vec2(0.5)*resolution.xy *vec2(0.5));
 
vec2 uvv=vuv;
uvv-=0.5;
// uvv.x+=0.1;


 float     ggg = distance(uvv,umouse.xy);
 

    gl_FragColor=vec4(vec3(1.,1.,0.5),1.);

    // gl_FragColor+=tex2;
    
   gl_FragColor =vec4(vec3(mix(vec3(1.,1.,0.5),vec3(0.0, 1.0, 0.4157),step(0.03,ggg))),1.);

      
    // gl_FragColor.r*=tex.a  ;

}
