import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  _colorMap: Map<string, object>;

  constructor() { 
    this._colorMap = new Map();
    this._colorMap.set("textColor", { "light" :'#d9d9d9', "dark" : '#d9d9d9' })
    this._colorMap.set("backgroundColor", { "light" :'#EDF2F4', "dark" : '#1a1c1dff'  })
    this._colorMap.set("hourHandColor", { "light" :'#2B2D42', "dark" : '#a4f0a2ff' })
    this._colorMap.set("minuteHandColor", { "light" :'#8D99AE', "dark" : '#a4f0a2ff' })
    this._colorMap.set("secondHandColor", { "light" :'#EF233C', "dark" : '#a4f0a2ff' })
    this._colorMap.set("minorTickColor", { "light" :'#8D99AE', "dark" : '#a4f0a2ff' })
    this._colorMap.set("majorTickColor", { "light" :'#2B2D42', "dark" : '#a4f0a2ff' })
    this._colorMap.set("centerPinColor", { "light" :'#003049', "dark" : '#a4f0a2ff' })
    this._colorMap.set("glowColor", { "light" :'#EF233C', "dark" : '#a4f0a2ff' })
    this._colorMap.set("colorOn", { "light" :'#D90429', "dark" : '#e0ffdfff' })
    this._colorMap.set("colorOff", { "light" :'#b1b1b143', "dark" : '#202324ff' })
  }

  getColor(key: string, darkTheme: boolean = false): string {
    if(this._colorMap.has(key)) {
      const color = this._colorMap.get(key)
      if (color === undefined)
        return '#fff'
      if (darkTheme)
        return color['dark' as keyof typeof color]
      return color['light' as keyof typeof color]
    }
    return '#fff'
  }

}
