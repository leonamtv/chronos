import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TimezoneComponent } from "./timezone/timezone.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TimezoneComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  availableTimezones: Array<string>;
  selectedTz: string = ''

  timezones: Array<string> = [
    'America/Sao_Paulo', 
    'America/Mexico_City', 
    'Europe/London']

  constructor() {
    let savedTimeZonesStr: string | null = localStorage.getItem('timezones')
    if (savedTimeZonesStr != null ){
      let savedTimeZones: Array<string> | null = JSON.parse(savedTimeZonesStr)
      if (savedTimeZones != null && savedTimeZones.length > 0) {
        this.timezones = savedTimeZones
      }
    } else {
      localStorage.setItem('timezones', JSON.stringify(this.timezones))  
    }
    this.availableTimezones = Intl.supportedValuesOf('timeZone');
  }

  removeTimezone(tzToRemove: string) {
    this.timezones = this.timezones.filter((tz) => tz != tzToRemove)
    localStorage.setItem('timezones', JSON.stringify(this.timezones))
  }

  addTimezone() {
    if(this.selectedTz != '' && this.timezones.length < 6) {
      this.timezones.push(this.selectedTz)
      this.selectedTz = ''
      localStorage.setItem('timezones', JSON.stringify(this.timezones))
    }
  }

}
