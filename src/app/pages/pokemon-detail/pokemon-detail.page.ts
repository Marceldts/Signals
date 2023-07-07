import { Component, OnInit, Signal, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {  Router } from '@angular/router';
import { Ability } from 'src/app/interfaces/ability';
import { ApiService } from 'src/app/services/api.service';
import { Pokemon } from 'src/app/interfaces/pokemon'

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit {

  url!: string;
  pokemonDetail!: Signal<any>;
  name!: string;
  abilities!: Ability[];
  id!: number;
  sprite!: string;
  types!: any[];
  dataSetter!: any;
  firstTime: boolean = true;

  constructor(private router: Router, private api: ApiService) {
    this.url = this.router.getCurrentNavigation()?.extras.state?.['queryParams'].url;
    this.name = this.router.getCurrentNavigation()?.extras.state?.['queryParams'].name;
    this.pokemonDetail = toSignal(this.api.getPokemonDetail(this.url), {initialValue: {}});
    this.dataSetter = effect(() => {
      console.log(this.pokemonDetail())
      if(!this.firstTime) this.setData()
      this.firstTime = false
    })
   }

  ngOnInit() {
  }

  goBack(): void {
    this.router.navigate(['/tabs/tab2'])
  }

  setData(): void {
    this.id = this.pokemonDetail().id;
    this.abilities = this.pokemonDetail().abilities;
    this.sprite = this.pokemonDetail().sprites.front_default;
    this.types = this.pokemonDetail().types;
  }


}
