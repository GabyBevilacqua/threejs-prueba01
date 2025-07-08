
import * as THREE from 'three';

export class StarField {
  private readonly stars: THREE.Points[] = [];
  private readonly starGeometry: THREE.BufferGeometry;
  private readonly starMaterial: THREE.PointsMaterial;

  constructor(private readonly scene: THREE.Scene, private readonly count: number) {
    this.starGeometry = new THREE.BufferGeometry();
    this.starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    this.createStars();
  }

  private createStars(): void {
    const positions = new Float32Array(this.count * 3);
    for (let i = 0; i < this.count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100; // z
    }
    this.starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starField = new THREE.Points(this.starGeometry, this.starMaterial);
    this.scene.add(starField);
    this.stars.push(starField);
  }
}