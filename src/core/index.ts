import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
} from "three";
import { Spaceship } from "./spaceship";
import { InputController } from "./inputController";
import { StarField } from "./starField";
import { CameraController } from "./cameraController";
import { JoystickController } from "./JoystickController";

declare global {
  interface Window {
    joystickController: JoystickController;
  }
}

export class App {
  private readonly canvas = document.getElementById(
    'canvas'
  ) as HTMLCanvasElement;
  private readonly scene = new Scene();
  private readonly renderer = new WebGLRenderer({
    canvas: this.canvas,
    antialias: true,
  });
  private readonly perspectiveCamera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // Instanciar el joystick primero
  private readonly joystick = (() => {
    // @ts-ignore
    window.joystickController = new JoystickController();
    return window.joystickController;
  })();
  private readonly inputController = new InputController();
  private readonly spaceship = new Spaceship(this.scene, this.inputController, 0.2);
  private readonly cameraController = new CameraController(this.perspectiveCamera, this.spaceship);

  //private readonly starField = new StarField(this.scene, 1500); // 500 estrellas, ajusta el número si quieres

  constructor() {
    this.crateInstances();
    this.config();
    this.createLights();
    this.animate();
    window.addEventListener("resize", this.onResize.bind(this))
    // El joystick ya se instancia antes de InputController
  }

  private crateInstances(): void {
    this.spaceship.loadModel();
    new StarField(this.scene); // se puede colocar aqui dentro del parentesois (this.scene , 1500) 1500 estrellas
  }

  private config(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.perspectiveCamera.position.set(0, 8, -10);
    this.perspectiveCamera.lookAt(0, 0, 0);
  }

  private animate(): void {
    this.renderer.render(this.scene, this.perspectiveCamera);
    this.spaceship.update();
    this.cameraController.update();
    requestAnimationFrame(this.animate.bind(this));
  }

  private createLights(): void {
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 1);
    this.scene.add(directionalLight);
  }

  private onResize(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
    this.perspectiveCamera.updateProjectionMatrix();
    // Ajustar el tamaño de la nave espacial proporcionalmente
    const minDim = Math.min(window.innerWidth, window.innerHeight);
    const newScale = minDim / 3000; // Puedes ajustar el divisor para el tamaño deseado
    this.spaceship.setScale(newScale);
  }
}
