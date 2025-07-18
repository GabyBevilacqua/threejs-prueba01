import type { Scene, Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import type { GLTF } from "three/examples/jsm/Addons.js";
import type { InputController } from "./inputController";

export class Spaceship {
  private readonly gltfLoader = new GLTFLoader();
  public declare model: Object3D;
  private readonly speed = 0.2;
  private readonly rotationSpeed = 0.05;
  private scale: number;
  
  constructor(
    private readonly scene: Scene,
    private readonly inputController: InputController,
    scale: number,
  ) {
    this.scale = scale;
  }

  public loadModel(): void {
    this.gltfLoader.load("/spaceship.glb", (gltf: GLTF) => {
      this.model = gltf.scene;
      this.setScale(this.scale);
      this.scene.add(this.model);
    });
  }

  public setScale(newScale: number): void {
    this.scale = newScale;
    if (this.model) {
      this.model.scale.set(this.scale, this.scale, this.scale);
    }
  }

  public update(): void {
    if (!this.model) return;

    if (this.inputController.isPressed("KeyW") || this.inputController.isPressed("ArrowUp")) {
      this.model.translateZ(this.speed);
    }
    if (this.inputController.isPressed("KeyS") || this.inputController.isPressed("ArrowDown")) {
      this.model.translateZ(-this.speed);
    }
    if (this.inputController.isPressed("KeyA") || this.inputController.isPressed("ArrowLeft")) {
      this.model.rotateY(this.rotationSpeed);
    }
    if (this.inputController.isPressed("KeyD") || this.inputController.isPressed("ArrowRight")) {
      this.model.rotateY(-this.rotationSpeed);
    }
  }
}
