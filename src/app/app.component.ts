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
    'Europe/London',
    'Pacific/Noumea']

  constructor() {
    this.availableTimezones = Intl.supportedValuesOf('timeZone');
  }

  removeTimezone(tzToRemove: string) {
    this.timezones = this.timezones.filter((tz) => tz != tzToRemove)
  }

  addTimezone() {
    if(this.selectedTz != '' && this.timezones.length < 6) {
      this.timezones.push(this.selectedTz)
      this.selectedTz = ''
    }
      
  }

}
