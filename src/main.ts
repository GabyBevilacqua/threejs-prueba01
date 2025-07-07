import './style.css';

import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import type { GLTF } from 'three/examples/jsm/Addons.js';
import { AmbientLight, DirectionalLight } from 'three';


const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const scene = new Scene();
const renderer = new WebGLRenderer({ canvas, antialias: true });
const perspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const gltfLoader = new GLTFLoader();

renderer.setSize(window.innerWidth, window.innerHeight);
perspectiveCamera.position.set(0, 8, -10);
perspectiveCamera.lookAt(0, 0, 0);

//iluminacion
const ambientLight = new AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new DirectionalLight(0xffffff, 1);
scene.add(directionalLight);

gltfLoader.load('/spaceship.glb', (gltf: GLTF) => {
  const spaceship = gltf.scene;
  spaceship.scale.set(0.2, 0.2, 0.2);
  scene.add(spaceship);
})

console.log("hola desde el script");

function animate() { 
  renderer.render(scene, perspectiveCamera);
  requestAnimationFrame(animate);

  console.log("animating...");
}

animate();