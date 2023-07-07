import { Injectable, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private signal!: WritableSignal<number>;

  constructor() { }

  setData(func: WritableSignal<number>) {
    this.signal = func;
  }

  getData(): WritableSignal<number> {
    return this.signal;
  }
}
