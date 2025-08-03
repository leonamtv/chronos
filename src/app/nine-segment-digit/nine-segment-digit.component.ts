import { Component, Input } from '@angular/core';
import { NineSegmentDisplayComponent } from '../nine-segment-display/nine-segment-display.component';

@Component({
  selector: 'app-nine-segment-digit',
  standalone: true,
  imports: [NineSegmentDisplayComponent],
  templateUrl: './nine-segment-digit.component.html',
  styleUrl: './nine-segment-digit.component.scss'
})
export class NineSegmentDigitComponent {

  _digit: string = ''
  _bitMask: number = 0b000000000

  @Input() width: number = 360
  @Input() height: number = 500
  @Input() randomNoise: boolean = false;
  @Input() glowColor: string = '#bbff9cff'
  @Input() glowBlur: number = 30
  @Input() backgroundColor: string = '#000000'
  @Input() colorOn: string = '#51ff00'
  @Input() colorOff: string = '#ffffff1a'
  
  @Input() set digit(val: string){
    this._digit = val
    this._bitMask = this._getBitMaskFromValue(val) 
  }

  get bitMask () {
    return this._bitMask
  }

  _getBitMaskFromValue(val: string) : number {
    let bitMaskMap: Map<string, number> = new Map()
    bitMaskMap.set('0',0b001111110)
    bitMaskMap.set('1',0b000110000) 
    bitMaskMap.set('2',0b001101101) 
    bitMaskMap.set('3',0b001111001) 
    bitMaskMap.set('4',0b000110011) 
    bitMaskMap.set('5',0b001011011) 
    bitMaskMap.set('6',0b001011111) 
    bitMaskMap.set('7',0b001110000) 
    bitMaskMap.set('8',0b001111111) 
    bitMaskMap.set('9',0b001111011) 
    bitMaskMap.set(':',0b110000000)
    bitMaskMap.set('.',0b100000000)
    bitMaskMap.set('', 0b000000000)

    if (!bitMaskMap.has(val))
      return 0b000000000
    let bitMask = bitMaskMap.get(val)
    return (bitMask === undefined) 
      ? 0b000000000
      : bitMask
  }

}
