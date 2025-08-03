import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WatchComponent } from "./watch/watch.component";
import { NineSegmentDigitComponent } from './nine-segment-digit/nine-segment-digit.component';
import { NineSegmentWatchComponent } from './nine-segment-watch/nine-segment-watch.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, WatchComponent, NineSegmentWatchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  textColor: string = '#d9d9d9'
  backgroundColor: string = '#000000'
  hourHandColor: string = '#d9d9d9'
  minuteHandColor: string = '#d9d9d9'
  secondHandColor: string = '#c1121f'
  minorTickColor: string = '#d9d9d9'
  majorTickColor: string = '#d9d9d9'
  centerPinColor: string = '#003049'

  canvasSize: number = 500
  
  secondHandWidth: number = 1
  minuteHandWidth: number = 3
  hourHandWidth: number = 3
  minorTickWidth: number = 1;
  majorTickWidth: number = 2;
  hourCenterPinDiameter: number = 3
  minuteCenterPinDiameter: number = 2
  secondCenterPinDiameter: number = 1
  centerPinDiameter: number = 1

  available_timezones: Array<string>;

  time_a = new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' });
  time_b = new Date().toLocaleString('en-US', { timeZone: 'America/Mexico_City' });
  time_c = new Date().toLocaleString('en-US', { timeZone: 'Europe/London' });

  interval;
  currentIndex:number = 0

  constructor() {
    this.available_timezones = Intl.supportedValuesOf('timeZone');

    this.interval = setInterval(() => {
      this.time_a = new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' });
      this.time_b = new Date().toLocaleString('en-US', { timeZone: 'America/Mexico_City' });
      this.time_c = new Date().toLocaleString('en-US', { timeZone: 'Europe/London' });
    }, 1)

  }

}
