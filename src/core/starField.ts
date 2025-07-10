
import * as THREE from 'three';

// version fusion que hizo chatgpt

export class StarField {
  private starField: THREE.Points;
  private static createStarTexture(): THREE.Texture {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    // Fondo transparente
    ctx.clearRect(0, 0, size, size);
    // Círculo blanco con gradiente
    const gradient = ctx.createRadialGradient(
      size / 2, size / 2, 0,
      size / 2, size / 2, size / 2
    );
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.3)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  constructor(
    private readonly scene: THREE.Scene,
    private readonly count: number = 20000,
    private readonly range: number = 1000,
  ) {
    this.starField = this.createStars();
    this.scene.add(this.starField);
  }

  private createStars(): THREE.Points {
    const positions = new Float32Array(this.count * 3);
    for (let i = 0; i < this.count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * this.range; // x position
      positions[i * 3 + 1] = (Math.random() - 0.5) * this.range; // y position
      positions[i * 3 + 2] = (Math.random() - 0.5) * this.range; // z position 
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2, // Tamaño de las estrellas
      transparent: true,
      opacity: 0.9,
      depthTest: true,
      map: StarField.createStarTexture(),
      alphaTest: 0.01,
      sizeAttenuation: true,
    });
    material.needsUpdate = true;

    return new THREE.Points(geometry, material);
  }
}


/*
version del curso

import { BufferGeometry, Float32BufferAttribute, Points, PointsMaterial, Scene } from 'three'

export class Starfield {
  private declare starField: Points

  constructor(
    private readonly scene: Scene,
    private readonly starQty: number = 20000,
    private readonly range: number = 1000,
  ) {
    this.createStarField()
  }

  private createStarField(): void {
    const positions = new Float32Array(this.starQty * 3) // posiciones de las estrellas en 3D

    for (let i = 0; i < this.starQty; i++) {
      positions[i * 3] = Math.random() * this.range - this.range / 2 // x position
      positions[i * 3 + 1] = Math.random() * this.range - this.range / 2 // y position
      positions[i * 3 + 2] = Math.random() * this.range - this.range / 2 // z position
    }

    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))

    const material = new PointsMaterial({
      color: 0xcccccc,
      size: 1,
      transparent: true,
      opacity: 0.7,
      depthTest: true,
    })

    this.starField = new Points(geometry, material)

    this.scene.add(this.starField)
  }
}


version copilot  -----------------------------------------------------------------------------------

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
*/