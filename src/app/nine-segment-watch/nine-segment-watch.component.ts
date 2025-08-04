import { Component, Input } from '@angular/core';
import { NineSegmentDigitComponent } from '../nine-segment-digit/nine-segment-digit.component';
import { DateService } from '../date.service';

@Component({
  selector: 'app-nine-segment-watch',
  standalone: true,
  imports: [NineSegmentDigitComponent],
  templateUrl: './nine-segment-watch.component.html',
  styleUrl: './nine-segment-watch.component.scss'
})
export class NineSegmentWatchComponent {
  _date: Date = new Date()
  _dateService: DateService

  firstHourDigit: string = ''
  secondHourDigit: string = ''
  firstMinuteDigit: string = ''
  secondMinuteDigit: string = ''
  firstSecondDigit: string = ''
  secondSecondDigit: string = ''

  blinkingColon: string = ''

  @Input() timezone: string
  @Input() width: number = 60
  @Input() height: number = this.width * 1.4
  @Input() randomNoise: boolean = false;
  @Input() glowColor: string = '#ff0000ff'
  @Input() glowBlur: number = 20
  @Input() backgroundColor: string = '#232323ff'
  @Input() colorOn: string = '#ffb4b4ff'
  @Input() colorOff: string = '#ffcece1a'

  @Input() set date(date: Date) {
    this._date = date
  }

  constructor(
    private dateService: DateService
  ) {
    this._dateService = dateService
    this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    setInterval(() => {
      this._date = this._dateService.convertToTimezone(new Date(), this.timezone)
      this._calculateSeparators()
      this._calculateDigits()
    }, 500)
  }

  _calculateSeparators() {
    this.blinkingColon = (this.blinkingColon == '')
      ? ':'
      : ''
  }

  _calculateDigits() {
    let hours = this._date.getHours().toString().padStart(2, '0')
    let minutes = this._date.getMinutes().toString().padStart(2, '0')
    let seconds = this._date.getSeconds().toString().padStart(2, '0')

    this.firstHourDigit = hours[0]
    this.secondHourDigit = hours[1]

    this.firstMinuteDigit = minutes[0]
    this.secondMinuteDigit = minutes[1]

    this.firstSecondDigit = seconds[0]
    this.secondSecondDigit = seconds[1]
  }

}
