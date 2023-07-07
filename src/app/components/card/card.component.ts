import { Component, Input, OnInit, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {
  @Input()
  signal!: WritableSignal<number>;

  constructor() { }

  ngOnInit() {}

  inc(): void {
    this.signal.update(value => value + 1)
  }
  dec(): void {
    this.signal.update(value => value - 1)
  }
}
