import { PerspectiveCamera, Vector3 } from "three";
import type { Spaceship } from "./spaceship";

export class CameraController {
  private readonly offset: Vector3 = new Vector3(0, 4, -8);

  constructor(
    private readonly perspectiveCamera: PerspectiveCamera,
    private readonly spaceship: Spaceship
  ) {}

  public update(): void {
    if (!this.spaceship.model) return;

    const rotateOffset = this.offset.clone().applyQuaternion(this.spaceship.model.quaternion);
    const desiredPosition = this.spaceship.model.position.clone().add(rotateOffset);

    this.perspectiveCamera.position.lerp(desiredPosition, 0.05);

    this.perspectiveCamera.lookAt(
      this.spaceship.model.position)
  }
}
