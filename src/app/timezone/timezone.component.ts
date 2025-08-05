import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NineSegmentWatchComponent } from '../nine-segment-watch/nine-segment-watch.component';
import { WatchComponent } from '../watch/watch.component';
import { ColorService } from '../color.service';

@Component({
  selector: 'app-timezone',
  standalone: true,
  imports: [NineSegmentWatchComponent, WatchComponent],
  templateUrl: './timezone.component.html',
  styleUrl: './timezone.component.scss'
})
export class TimezoneComponent {

  _darkTheme: boolean = false
  _colorService: ColorService

  @Output() removeTimezoneEvent = new EventEmitter<string>();

  @Input() timezone: string

  @Input() printLabels: boolean = false

  @Input() textColor: string = '#d9d9d9'
  @Input() backgroundColor: string = '#EDF2F4' 
  @Input() hourHandColor: string = '#2B2D42'
  @Input() minuteHandColor: string = '#8D99AE'
  @Input() secondHandColor: string = '#EF233C'
  @Input() minorTickColor: string = '#8D99AE'
  @Input() majorTickColor: string = '#2B2D42'
  @Input() centerPinColor: string = '#003049'
  @Input() glowColor: string = '#EF233C'
  @Input() colorOn: string = '#D90429'
  @Input() colorOff: string = '#d9d9d943'

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
  @Input() width: number = 100 / 1.4
  @Input() height: number = 100
  @Input() randomNoise: boolean = false;
  @Input() glowBlur: number = this._darkTheme ? 10 : 0

  constructor(
    private colorService: ColorService
  ) {
    this._colorService = colorService
    this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  }

  remove() {
    this.removeTimezoneEvent.emit(this.timezone)
  }

  getColor(key: string) {
    return this._colorService.getColor(key, this._darkTheme)
  }

}
