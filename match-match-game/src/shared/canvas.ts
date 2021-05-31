import { BaseComponent } from './base-component';

export class Canvas extends BaseComponent {
  public base64Files = '';

  constructor(style: string) {
    super('canvas', ['canvas', style]);
    this.element.setAttribute('width', '168');
    this.element.setAttribute('height', '168');
  }

  drawImage(src: string): void {
    const img = new Image();
    img.src = src;
    img.style.objectFit = 'cover';
    img.onload = () => {
      const ctx = <CanvasRenderingContext2D>(<HTMLCanvasElement>this.element).getContext('2d');
      if (img.width > img.height) {
        ctx.drawImage(img, 0, 0, img.width * (168 / img.height), 168);
      } else {
        ctx.drawImage(img, 0, 0, 168, img.height * (168 / img.width));
      }
      this.base64Files = (this.element as HTMLCanvasElement).toDataURL();
    };
  }

  clear(): void {
    const ctx = <CanvasRenderingContext2D>(<HTMLCanvasElement>this.element).getContext('2d');
    ctx.clearRect(0, 0, 198, 198);
  }
}
