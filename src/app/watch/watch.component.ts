import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DateService } from '../date.service';

@Component({
  selector: 'app-watch',
  standalone: true,
  imports: [],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.scss'
})
export class WatchComponent {

  _date: Date = new Date()

  _dateService: DateService
  
  @Input() timezone: string;
  @Input() canvasSize: number = 800
  @Input() watchRelativeSize: number = 0.9

  @Input() printLabels: boolean = true

  @Input() backgroundColor: string = '#fdf0d5'

  @Input() secondHandColor: string = '#c1121f'
  @Input() secondHandWidth: number = 8
  @Input() secondHandRelativeSize: number = 0.8

  @Input() minuteHandColor: string = '#669bbc'
  @Input() minuteHandWidth: number = 10
  @Input() minuteHandRelativeSize: number = 0.8

  @Input() hourHandColor: string = '#003049'
  @Input() hourHandWidth: number = 15
  @Input() hourHandRelativeSize: number = 0.6

  @Input() textColor: string = '#c1121f'
  @Input() textWeight: 'normal' | 'bold' | 'lighter' | 'bolder' = 'lighter'
  @Input() textFontFamily: string = 'Courier'
  @Input() textRelativeOffset: number = 0.8
  @Input() textRelativeSize: number = 0.08

  @Input() minorTickColor: string = '#c1121f'
  @Input() minorTickWidth: number = 8;

  @Input() majorTickColor: string = '#780000'
  @Input() majorTickWidth: number = 10;

  @Input() hourCenterPinDiameter: number = 20
  @Input() minuteCenterPinDiameter: number = 15
  @Input() secondCenterPinDiameter: number = 10
  @Input() centerPinDiameter: number = 5
  @Input() centerPinColor: string = '#003049'

  @ViewChild("canvas", { static: false }) canvas: ElementRef | undefined

  @Input() set date(date: Date) {
    this._date = date
    this.drawClock()
  }

  constructor(
    private dateService: DateService
  ) {
    this._dateService = dateService
    this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    setInterval(() => {
      this._date = this._dateService.convertToTimezone(new Date(), this.timezone);
      this.drawClock()
    })
  }

  drawClock() {
    if (this._date && this.canvas && this.canvas.nativeElement) {
      const ctx = this.canvas.nativeElement.getContext("2d");
      const width = this.canvasSize
      const height = this.canvasSize
      const centerX = width / 2;
      const centerY = height / 2;
      const radius  = this.canvasSize / 2 * this.watchRelativeSize;

      this.clearCanvas(ctx);
      this.drawTicks(radius, centerX, centerY, ctx);
      if(this.printLabels)
        this.drawLabels(ctx, centerX, centerY, height, width, radius);
      this.drawHourHand(ctx, centerX, centerY, radius);
      this.drawMinuteHand(ctx, centerX, centerY, radius);
      this.drawSecondHand(centerX, radius, centerY, ctx);
      this.drawCenterPin(centerX, centerY, ctx, this.centerPinColor, this.centerPinDiameter); 
     
    }
  }

  private clearCanvas(ctx: any) {
    ctx.clearRect(0, 0, this.canvasSize, this.canvasSize);
  }

  private drawCenterPin(centerX: number, centerY: number, ctx: any, color: string, diameter: number) {
    let circle = new Path2D();

    circle.moveTo(centerX, centerY);
    circle.arc(centerX, centerY, diameter, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill(circle);
    ctx.fill();
  }

  private drawTicks(radius: number, centerX: number, centerY: number, ctx: any) {
    ctx.lineCap = "square";

    let outerCircleRadius = radius;
    let midCircleRadius = radius * 0.95;
    let innerCircleRadius = radius * 0.9;

    for (let angle = 0; angle < 360; angle += 6) {

      let x1 = centerX + outerCircleRadius * Math.cos(angle * Math.PI / 180);
      let y1 = centerY + outerCircleRadius * Math.sin(angle * Math.PI / 180);

      ctx.beginPath();
      ctx.moveTo(x1, y1);

      if (angle % 15 == 0) {
        ctx.lineWidth = this.majorTickWidth;
        ctx.strokeStyle = this.majorTickColor;
        let x2 = centerX + innerCircleRadius * Math.cos(angle * Math.PI / 180);
        let y2 = centerY + innerCircleRadius * Math.sin(angle * Math.PI / 180);
        ctx.lineTo(x2, y2);
      } else {
        ctx.lineWidth = this.minorTickWidth;
        ctx.strokeStyle = this.minorTickColor;
        let x2 = centerX + midCircleRadius * Math.cos(angle * Math.PI / 180);
        let y2 = centerY + midCircleRadius * Math.sin(angle * Math.PI / 180);
        ctx.lineTo(x2, y2);
      }
      ctx.stroke();
    }
  }

  private drawLabels(ctx: any, centerX: number, centerY: number, height: any, width: any, radius: number) {
    let labels = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    let textAngle = Math.PI / 6;
    
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(textAngle);
    
    labels.forEach(label => {
      ctx.font = this.textWeight + " " + radius * this.textRelativeSize + "px " + this.textFontFamily;
      ctx.textAlign = "center";
      ctx.fillStyle = this.textColor;
      ctx.textBaseline = 'middle';
      ctx.fillText(label, 0, -this.textRelativeOffset * radius);
      ctx.rotate(Math.PI / 6);
    });
    ctx.restore();
  }

  private drawHourHand(ctx: any, centerX: number, centerY: number, radius: number) {
    ctx.lineCap = "round";

    ctx.beginPath();

    ctx.moveTo(centerX, centerY);

    let hourX = centerX + radius * this.hourHandRelativeSize * Math.cos((30 * this._date.getHours() + 0.5 * this._date.getMinutes()) * Math.PI / 180 - Math.PI / 2);
    let hourY = centerY + radius * this.hourHandRelativeSize * Math.sin((30 * this._date.getHours() + 0.5 * this._date.getMinutes()) * Math.PI / 180 - Math.PI / 2);

    ctx.lineWidth = this.hourHandWidth;
    ctx.strokeStyle = this.hourHandColor;
    ctx.lineTo(hourX, hourY);
    ctx.stroke();

    this.drawCenterPin(centerX, centerY, ctx, this.hourHandColor, this.hourCenterPinDiameter); 
  }

  private drawMinuteHand(ctx: any, centerX: number, centerY: number, radius: number) {
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);

    let minuteX = centerX + radius * this.minuteHandRelativeSize * Math.cos(6 * this._date.getMinutes() * Math.PI / 180 - Math.PI / 2);
    let minuteY = centerY + radius * this.minuteHandRelativeSize * Math.sin(6 * this._date.getMinutes() * Math.PI / 180 - Math.PI / 2);

    ctx.lineWidth = this.minuteHandWidth;
    ctx.strokeStyle = this.minuteHandColor;
    ctx.lineTo(minuteX, minuteY);
    ctx.stroke();

    this.drawCenterPin(centerX, centerY, ctx, this.minuteHandColor, this.minuteCenterPinDiameter); 
  }

  private drawSecondHand(centerX: number, radius: number, centerY: number, ctx: any) {
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);

    let secondX = centerX + radius * this.secondHandRelativeSize * Math.cos(6 * this._date.getSeconds() * Math.PI / 180 - Math.PI / 2);
    let secondY = centerY + radius * this.secondHandRelativeSize * Math.sin(6 * this._date.getSeconds() * Math.PI / 180 - Math.PI / 2);

    ctx.lineWidth = this.secondHandWidth;
    ctx.strokeStyle = this.secondHandColor;
    ctx.lineTo(secondX, secondY);
    ctx.stroke();

    this.drawCenterPin(centerX, centerY, ctx, this.secondHandColor, this.secondCenterPinDiameter); 
  }
}
