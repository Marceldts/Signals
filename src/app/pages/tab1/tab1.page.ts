import { Component, EffectRef, Injector, Signal, ValueEqualityFn, WritableSignal, computed, effect, signal } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';


export type ObjetoEjemplo = {
  dato: number;
  isEven: boolean;
  liked: boolean;
};
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  loading: boolean = true;
  storedValue: string | null = localStorage.getItem("number");
  numberSignal: WritableSignal<number> = signal(this.storedValue != null ? +this.storedValue : 0);
  computedNumberSignal: Signal<number> = computed(
    () => this.numberSignal() * this.numberSignal()
  );
  store!: EffectRef;
  log!: EffectRef;

  
  constructor(private injector: Injector, private router: Router, private dataService: DataService) {}
  
  
  ionViewWillEnter() {
    this.storedValue = localStorage.getItem("number");
    this.numberSignal.set(this.storedValue != null ? +this.storedValue : 0);
    this.log = effect((onCleanup) => {
      console.log(this.numberSignal())
      const prev = this.numberSignal();
      onCleanup(() => console.log("Clean up", prev))
    }, {injector: this.injector})
    this.store = effect(() => {
      localStorage.setItem("number", this.numberSignal().toString());
    }, {injector: this.injector})
    this.loading = false;
  }

  inc(): void {
    this.numberSignal.update(value => value + 1)
  }
  dec(): void {
    this.numberSignal.update(value => value - 1)
  }
  openDetailsWithState() {
    this.dataService.setData(this.numberSignal);
    this.router.navigate(['details']);
  }
}
