import { HttpClient } from '@angular/common/http';
import { Injectable, Injector, OnDestroy, Signal, WritableSignal, computed, effect, signal } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { toSignal } from '@angular/core/rxjs-interop'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnDestroy{

  url: string = 'https://pokeapi.co/api/v2/';
  loading: WritableSignal<boolean> = signal(true);
  getNew: boolean = false;
  list!: Observable<any>;
  pokemonList: WritableSignal<any> = signal([]);
  subscription!: any;
  firstTime: boolean = true;

  constructor(private http: HttpClient, private injector: Injector) { 
    this.list = this.http.get(`${this.url}pokemon/?offset=${0 * 20}&limit=20`);
    this.pokemonList.set(this.list)
    // this.pokemonList = toSignal(this.list, {initialValue: []});
  }

  log = effect(() => {
    if(this.pokemonList() != undefined && this.getNew) {
      this.setLoading();
      this.getNew = false;
    }
  }, {injector: this.injector, allowSignalWrites: true});

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  getPokemonList(limit: number) {
    if(!this.firstTime) this.subscription.unsubscribe()
    this.firstTime = false;
    this.setLoading();
    this.list = this.http.get(`${this.url}pokemon/?offset=${limit * 20}&limit=20`);
    this.subscription = this.list.subscribe(res => this.pokemonList.set(res))
    this.getNew = true;
  }

  getPokemonDetail(url: string) {
    return this.http.get(url);
  }

  getPokemonListSignal(): WritableSignal<any> {
    return this.pokemonList;
  }

  getLoading(): WritableSignal<boolean> {
    return this.loading;
  }

  setLoading(): void {
    this.loading.set(!this.loading())
  }
}
