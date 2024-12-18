import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HousingLocation} from '../housinglocation';
import {RouterLink} from '@angular/router';
import {Store} from '@ngrx/store';
import {map, Observable, take} from 'rxjs';
import {addFavorite, removeFavorite} from '../state/favorite.actions';

@Component({
  selector: 'app-housing-location',
  imports: [CommonModule, RouterLink],
  template: `
    <a class="listing" [routerLink]="['/details', housingLocation.id]">
      <img
        class="listing-photo"
        [src]="housingLocation.photo"
        alt="Exterior photo of {{ housingLocation.name }}"
        crossorigin
      />
      <h2 class="listing-heading">{{ housingLocation.name }}</h2>
      <p class="listing-location">{{ housingLocation.city }}, {{ housingLocation.state }}</p>
      <div class="listing-bottom">
        <button (click)="favorite_toggle($event)" class="listing-save">
          <img *ngIf="isFavorited | async as boolean; else favorite" src="assets/icons/heart_filled.svg"
               alt="Save this listing"/>
          <ng-template #favorite>
            <img src="assets/icons/heart_outline.svg" alt="Unsave this listing"/>
          </ng-template>
        </button>
        <p>Learn More</p>
      </div>
    </a>
  `,
  styleUrls: ['./housing-location.component.css']
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
  isFavorited = new Observable<boolean>();

  constructor(private readonly store: Store<{ favorite: number[] }>) {
    this.isFavorited = this.store.select('favorite').pipe(map(favorites => favorites.includes(this.housingLocation.id)));
  }

  favorite_toggle(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isFavorited.pipe(take(1)).subscribe(isFavorited => {
      isFavorited ? this.store.dispatch(removeFavorite({favorite: this.housingLocation.id})) : this.store.dispatch(addFavorite({favorite: this.housingLocation.id}));
    });
  }
}
