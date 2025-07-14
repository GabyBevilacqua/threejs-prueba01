export class InputController {
  private keys: { [key: string]: boolean } = {};
  private joystick?: any;
 
  constructor() {
    this.listenToEvents();
    // Buscar si existe JoystickController en window
    if ((window as any).joystickController) {
      this.joystick = (window as any).joystickController;
      this.listenToJoystick();
    }
  }

  private listenToJoystick(): void {
    // Actualiza las teclas virtuales según la dirección del joystick en cada frame
    const update = () => {
      if (!this.joystick) return;
      const dir = this.joystick.getDirection();
      // Resetear direcciones
      this.keys['ArrowUp'] = false;
      this.keys['ArrowDown'] = false;
      this.keys['ArrowLeft'] = false;
      this.keys['ArrowRight'] = false;
      switch (dir) {
        case 'up':
          this.keys['ArrowUp'] = true;
          break;
        case 'down':
          this.keys['ArrowDown'] = true;
          break;
        case 'left':
          this.keys['ArrowLeft'] = true;
          break;
        case 'right':
          this.keys['ArrowRight'] = true;
          break;
      }
      requestAnimationFrame(update);
    };
    update();
  }

  public isPressed(keyCode: string): boolean {
    return !!this.keys[keyCode]
  }
  private onKeyDown(event : KeyboardEvent): void {
    this.keys[event.code] = true;
  }
  private onKeyUp(event: KeyboardEvent): void {
    this.keys[event.code] = false;
  }

  private listenToEvents(): void {
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));
  }

}
