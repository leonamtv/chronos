import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NineSegmentWatchComponent } from '../nine-segment-watch/nine-segment-watch.component';
import { WatchComponent } from '../watch/watch.component';

@Component({
  selector: 'app-timezone',
  standalone: true,
  imports: [NineSegmentWatchComponent, WatchComponent],
  templateUrl: './timezone.component.html',
  styleUrl: './timezone.component.scss'
})
export class TimezoneComponent {

  @Output() removeTimezoneEvent = new EventEmitter<string>();

  @Input() timezone: string

  @Input() printLabels: boolean = false
  @Input() textColor: string = '#d9d9d9'
  @Input() backgroundColor: string = '#023047'
  @Input() hourHandColor: string = '#ffb703'
  @Input() minuteHandColor: string = '#ffb703'
  @Input() secondHandColor: string = '#fb8500'
  @Input() minorTickColor: string = '#ffb703'
  @Input() majorTickColor: string = '#ffb703'
  @Input() centerPinColor: string = '#003049'
  @Input() glowColor: string = '#fb8500'
  @Input() colorOn: string = '#ffb703'
  @Input() colorOff: string = '#ffe0e010'

  @Input() digitWidth: number = 100 / 1.4
  @Input() digitHeight: number = 100
  @Input() canvasSize: number = 100
  @Input() secondHandWidth: number = 2
  @Input() minuteHandWidth: number = 3
  @Input() hourHandWidth: number = 4
  @Input() minorTickWidth: number = 1;
  @Input() majorTickWidth: number = 4;
  @Input() hourCenterPinDiameter: number = 4
  @Input() minuteCenterPinDiameter: number = 3
  @Input() secondCenterPinDiameter: number = 2
  @Input() centerPinDiameter: number = 1
  @Input() width: number = 60
  @Input() height: number = this.width * 1.4
  @Input() randomNoise: boolean = true;
  @Input() glowBlur: number = 20

  constructor() {
    this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  }

  remove() {
    this.removeTimezoneEvent.emit(this.timezone)
  }

}
