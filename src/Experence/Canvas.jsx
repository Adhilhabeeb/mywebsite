import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';


import vertex from "./shader/vert.glsl"
import frag from "./shader/frag.glsl"

import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader';




// Load the HDR environment map

const ThreeBox = () => {
  const mountRef = useRef(null);
  let sceneref=useRef()
let loaded=useRef(false)
let managerref=useRef(null)
  useEffect(() => {
    // Scene
    const raycaster = new THREE.Raycaster();
    const scene = new THREE.Scene();
    let raycaster2 = new THREE.Raycaster();
    sceneref.current=scene
    const loader = new THREE.TextureLoader();
    // loader.load("../../public/citrus_orchard_road_puresky_4k.exr" , 
    //     function(texture)
    //             {
    //              scene.background = texture;  
    //             },()=>{

    //                 console.log("prroblem loading texture");
    //             },(error) => {
    //                 console.error('An error happened while loading the texture:', error);
    //             })

    const manager = new THREE.LoadingManager();
    manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
        console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    };
    
    manager.onLoad = function ( ) {
if (loaded.current) {
            console.log("already loaded")
         
    
}
        console.log( 'Loading complete!');
    };
    
 
    manager.onProgress = async (url, loaded, total=2) => {
        let progress = loaded / total * 100;
        console.log('progress: ', progress);
  };
    manager.onError = function ( url ) {
        console.log( 'There was an error loading ' + url );
    };
//    async function loadTexture(url) {

//     return new Promise((resolve ,reject)=>{
//        new EXRLoader(manager)
//       .load('/citrus_orchard_road_puresky_4k.exr', function (texture) {
      
//         resolve(texture)
//       },(el) => {
//         console.log(el,"loading exrbachjhh");
//       }
//       , (error) => {
//         reject(error)
//         console.error('An error happened while loading the texture:', error);
//       }
//       );
//     })
//    }

// let bg=loadTexture('/citrus_orchard_road_puresky_4k.exr').then((texture)=>{
//     loaded.current=true
//         console.log("laodeddddd  exrrrr")
//         texture.mapping = THREE.EquirectangularRefractionMapping;
//         scene.background = texture;
//         scene.environment = texture;
// })

let textu=new THREE.TextureLoader(manager).load('/vite.svg')
    // // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    camera.position.y = 2;


    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Box (Blue)
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 'blue' });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.y = 1; // Raise the cube above the plane
    scene.add(cube);
//
let cube2=new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 'red' }));
cube2.position.y = 1; // Raise the cube above the plane
scene.add(cube2)
    // planew 

    const planeGeometry = new THREE.PlaneGeometry(100, 100);
    const planeMaterial = new THREE.ShaderMaterial({
      extensions: { derivatives: "#extension GL_OES_standard_derivatives : enable" },
      vertexShader: vertex,
      fragmentShader: frag,
      side: THREE.DoubleSide,
      uniforms: {
      umouse2:{ value: new THREE.Vector3(0, 0, 0) },
        resolution: { value: new THREE.Vector4(0, 0, 0, 0) },
        umouse: { value: new THREE.Vector3(0, 0, 0) }
      },
    });
    planeMaterial.uniforms.umouse.value=new THREE.Vector3(0, 0, 0);
    planeMaterial.uniforms.umouse2.value=new THREE.Vector3(0, 0, 0);
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = Math.PI / 2; // Rotate the plane to be horizontal
    scene.add(plane);

    // raycaster setup
  
    // Animation Loop
    let clock=new THREE.Clock();
    const animate = () => {
      let elapsedTime = clock.getDelta()
      requestAnimationFrame(animate);

///////
const origin2 = cube2.position.clone();
const direction2 = new THREE.Vector3(0, -1, 0); // Downward
direction2.normalize();

raycaster2.set(origin2, direction2);
  const arrowHelper2 = new THREE.ArrowHelper(direction2, origin2, 2, "red");
// scene.add(arrowHelper2);
const intersects2 = raycaster2.intersectObject(plane);
  
if (intersects2.length > 0) {
  const hit = intersects2[0];
  console.log("Hit222222222 the plane at:", hit.point);

  // Convert world hit point to plane local space
  const localPoint = plane.worldToLocal(hit.point.clone());

  // Convert to UV
  // Your plane is 7x7, centered at origin => map -3.5 to +3.5 => UV (0 to 1)
  const uv = new THREE.Vector2(
    (localPoint.x + 50) / 100,
    (localPoint.z + 50) / 100
  );
  

  planeMaterial.uniforms.umouse2.value.set(uv.x - 0.5, uv.y - 0.5, 0);
}
 else {
  console.log("No intersection with plane    intt22222");
}



      ///////////
      const origin = cube.position.clone();
      const direction = new THREE.Vector3(0, -1, 0); // Downward
      direction.normalize();
  
  // 5. Set the raycaster's origin and direction
  raycaster.set(origin, direction);
  const arrowHelper = new THREE.ArrowHelper(direction, origin, 2, 0xffff00);
// scene.add(arrowHelper);

  // 6. Cast the ray and check for intersections with the plane
  const intersects = raycaster.intersectObject(plane);
  
  if (intersects.length > 0) {
    const hit = intersects[0];
    // console.log("Hit the plane at:", hit.point);
  
    // Convert world hit point to plane local space
    const localPoint = plane.worldToLocal(hit.point.clone());
  
    // Convert to UV
    // Your plane is 100x100, centered at origin => map -3.5 to +3.5 => UV (0 to 1)
    const uv = new THREE.Vector2(
      (localPoint.x + 50) / 100,
      (localPoint.z + 50) / 100
    );
    
  
    planeMaterial.uniforms.umouse.value.set(uv.x - 0.5, uv.y - 0.5, 0);
  }
   else {
    console.log("No intersection with plane");
  }
  cube.position.x+=Math.sin(elapsedTime*0.1)
  cube2.position.x-=Math.sin(elapsedTime*0.1)
  console.log(elapsedTime)
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
    
    };
  }, []);

  return (
    <div
      ref={mountRef}
        style={{ width: '100%', height: '100vh', backgroundColor: '#000' }}
    />
  );
};

export default ThreeBox;
