export type JoystickDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export class JoystickController {
  private container!: HTMLDivElement;
  private stick!: HTMLDivElement;
  private active: boolean = false;
  private direction: JoystickDirection = 'none';

  constructor() {
    this.createJoystick();
    this.addListeners();
  }

  private createJoystick() {
    this.container = document.createElement('div');
    this.container.className = 'joystick-container';
    this.stick = document.createElement('div');
    this.stick.className = 'joystick-stick';
    this.container.appendChild(this.stick);
    document.body.appendChild(this.container);
  }

  private addListeners() {
    let startX = 0, startY = 0;
    const moveHandler = (clientX: number, clientY: number) => {
      const rect = this.container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = clientX - centerX;
      const dy = clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = rect.width / 2 - 20;
      let angle = Math.atan2(dy, dx);
      // Limit stick movement
      if (distance > maxDistance) {
        clientX = centerX + Math.cos(angle) * maxDistance;
        clientY = centerY + Math.sin(angle) * maxDistance;
      }
      this.stick.style.transform = `translate(${clientX - centerX}px, ${clientY - centerY}px)`;
      // Direction logic
      if (distance < 20) {
        this.direction = 'none';
      } else {
        if (Math.abs(dx) > Math.abs(dy)) {
          this.direction = dx > 0 ? 'right' : 'left';
        } else {
          this.direction = dy > 0 ? 'down' : 'up';
        }
      }
    };
    // Mouse events
    this.container.addEventListener('mousedown', (e) => {
      this.active = true;
      startX = e.clientX;
      startY = e.clientY;
      moveHandler(e.clientX, e.clientY);
    });
    window.addEventListener('mousemove', (e) => {
      if (!this.active) return;
      moveHandler(e.clientX, e.clientY);
    });
    window.addEventListener('mouseup', () => {
      if (!this.active) return;
      this.active = false;
      this.stick.style.transform = '';
      this.direction = 'none';
    });
    // Touch events
    this.container.addEventListener('touchstart', (e) => {
      this.active = true;
      const touch = e.touches[0];
      moveHandler(touch.clientX, touch.clientY);
    });
    window.addEventListener('touchmove', (e) => {
      if (!this.active) return;
      const touch = e.touches[0];
      moveHandler(touch.clientX, touch.clientY);
    });
    window.addEventListener('touchend', () => {
      if (!this.active) return;
      this.active = false;
      this.stick.style.transform = '';
      this.direction = 'none';
    });
  }

  public getDirection(): JoystickDirection {
    return this.direction;
  }
}


