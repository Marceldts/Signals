import { Component, Injector, OnInit, WritableSignal, effect, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage {

  data: any;
  newSignal!: WritableSignal<number>;
  loading: boolean = true;
 
  constructor(private router: Router, private injector: Injector, private dataService: DataService) {
  }
  //Aunque estemos usando newSignal, al ser una referencia al signal que le pasamos, usa los mismos effects tambien!
  //Es decir, si tenemos un effect que le afecte al signal en la tab1, se seguirá ejecutando en esta página siempre que cambie el valor del signal
  //Si ponemos otro effect aquí que también escuche al mismo signal, se sobrescribirá el de la otra página cuando se entre en esta (y viceversa)
  ionViewWillEnter(): void {
    this.newSignal = this.dataService.getData();
    this.loading = false;
  }

  inc(): void {
    this.newSignal.update(value => value + 1)
  }
  dec(): void {
    this.newSignal.update(value => value - 1)
  }

  goBack(): void {
    this.router.navigate(['/tabs/tab1'])
  }

}
