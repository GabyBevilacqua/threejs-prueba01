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
  private readonly inputController = new InputController();
  private readonly spaceship = new Spaceship(this.scene, this.inputController, 0.2);

  private readonly starField = new StarField(this.scene, 1500); // 500 estrellas, ajusta el número si quieres

  constructor() {
    this.crateInstances();
    this.config();
    this.createLights();
    this.animate();
  }

  private crateInstances(): void {
    this.spaceship.loadModel();
  }

  private config(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.perspectiveCamera.position.set(0, 8, -10);
    this.perspectiveCamera.lookAt(0, 0, 0);
  }

  private animate(): void {
    this.renderer.render(this.scene, this.perspectiveCamera);
    this.spaceship.update();
    requestAnimationFrame(this.animate.bind(this));
  }

  private createLights(): void {
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 1);
    this.scene.add(directionalLight);
  }
}
