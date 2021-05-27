import { BaseComponent } from './base-component';

export class Timer extends BaseComponent {
  private offset: number;

  private clock: number;

  private interval: NodeJS.Timeout | null;

  min: number;

  sec: number;

  constructor() {
    super('div', ['timer']);
    this.clock = 0;
    this.offset = 0;
    this.min = 0;
    this.sec = 0;
    this.interval = null;

    this.update = this.update.bind(this);
  }

  start(): void {
    if (!this.interval) {
      this.offset = Date.now();
      this.interval = setInterval(this.update.bind(this), 1);
      this.min = 0;
    }
  }

  stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  reset(): void {
    this.clock = 0;
    this.render();
  }

  clear(): void {
    this.min = 0;
    this.sec = 0;
    this.clock = 0;
  }

  private delta(): number {
    const now = Date.now();
    const d = now - this.offset;

    this.offset = now;
    return d;
  }

  private update() {
    this.clock += this.delta();
    this.render();
  }

  private render() {
    this.sec = Math.floor(this.clock / 1000);
    if (this.sec === 60) {
      this.min++;
      this.reset();
    }

    this.element.innerHTML = `${this.min}<p>:</p>${this.sec}`;
  }
}
