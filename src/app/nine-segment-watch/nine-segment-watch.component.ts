import { Component, Input } from '@angular/core';
import { NineSegmentDigitComponent } from '../nine-segment-digit/nine-segment-digit.component';

@Component({
  selector: 'app-nine-segment-watch',
  standalone: true,
  imports: [NineSegmentDigitComponent],
  templateUrl: './nine-segment-watch.component.html',
  styleUrl: './nine-segment-watch.component.scss'
})
export class NineSegmentWatchComponent {
  _date: Date = new Date()

  firstHourDigit: string = ''
  secondHourDigit: string = ''
  firstMinuteDigit: string = ''
  secondMinuteDigit: string = ''
  firstSecondDigit: string = ''
  secondSecondDigit: string = ''
  firstMillisecondDigit: string = ''
  secondMillisecondDigit: string = ''
  thirdMillisecondDigit: string = ''

  blinkingColon: string = ''
  blinkingDot: string = ''

  @Input() width: number = 60
  @Input() height: number = this.width * 1.4
  @Input() randomNoise: boolean = false;
  @Input() glowColor: string = '#ff0000ff'
  @Input() glowBlur: number = 20
  @Input() backgroundColor: string = '#000000'
  @Input() colorOn: string = '#ffb4b4ff'
  @Input() colorOff: string = '#ffcece1a'

  @Input() set date(date: Date) {
    this._date = date
  }

  constructor() {
    setInterval(() => {
      this._date = new Date()
      this._calculateSeparators()
    }, 500)
    setInterval(() => {
      this._date = new Date()
      this._calculateDigits()
    }, 10)
  }

  _calculateSeparators() {
    this.blinkingColon = (this.blinkingColon == '')
      ? ':'
      : ''

    this.blinkingDot = (this.blinkingDot == '')
      ? '.'
      : ''
  }

  _calculateDigits() {
    let hours = this._date.getHours().toString().padStart(2, '0')
    let minutes = this._date.getMinutes().toString().padStart(2, '0')
    let seconds = this._date.getSeconds().toString().padStart(2, '0')
    let miliseconds = this._date.getMilliseconds().toString().padStart(3, '0');

    this.firstHourDigit = hours[0]
    this.secondHourDigit = hours[1]

    this.firstMinuteDigit = minutes[0]
    this.secondMinuteDigit = minutes[1]

    this.firstSecondDigit = seconds[0]
    this.secondSecondDigit = seconds[1]

    this.firstMillisecondDigit = miliseconds[0]
    this.secondMillisecondDigit = miliseconds[1]
    this.thirdMillisecondDigit = miliseconds[2]

    
  }

}
