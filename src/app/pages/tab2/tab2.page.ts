import { Component, WritableSignal } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  pokemonList!: WritableSignal<any>;
  loading!: WritableSignal<boolean>;
  signalsLoaded: boolean = false;
  limit: number = 0;

  constructor(private api: ApiService, private router: Router) {
  }
  
  ionViewWillEnter(){
    this.api.getPokemonList(0)
    this.pokemonList = this.api.getPokemonListSignal();
    this.loading = this.api.getLoading();
    this.signalsLoaded = true;
  }


  getNewPokemon(number: number) {
    this.limit = this.limit + number;
    this.api.getPokemonList(this.limit);
  }

  goToPokeDetail(name: string, url: string) {
    let data: NavigationExtras = {
      queryParams: {
        url: url,
        name: name
      }
    }
    this.router.navigate(['/pokemon', name], {state: data})
  }
}
