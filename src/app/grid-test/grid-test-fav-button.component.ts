import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {map, Observable, take} from 'rxjs';
import {Store} from '@ngrx/store';
import {addFavorite, removeFavorite} from '../state/favorite.actions';
import {CommonModule} from '@angular/common';

class ICellRendererParams {
  data: any;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="grid-fav-wrapper">
      <button (click)="favorite_toggle()" class="grid-fav">
        <img *ngIf="isFavorited | async as boolean; else favorite" src="assets/icons/heart_filled.svg"
             alt="Save this listing"/>
        <ng-template #favorite>
          <img src="assets/icons/heart_outline.svg" alt="Unsave this listing"/>
        </ng-template>
      </button>
    </div>`,
  styleUrls: ['./grid-test.component.css'],
})
export class CustomButtonComponent implements ICellRendererAngularComp {
  isFavorited = new Observable<boolean>();
  id!: number;

  constructor(private readonly store: Store<{ favorite: number[] }>) {
    this.isFavorited = this.store.select('favorite').pipe(map(favorites => favorites.includes(this.id)));
  }

  agInit(params: ICellRendererParams): void {
    this.id = params.data.id;
  }

  refresh(params: ICellRendererParams) {
    this.id = params.data.id;
    return true;
  }

  favorite_toggle() {
    this.isFavorited.pipe(take(1)).subscribe(isFavorited => {
      isFavorited ? this.store.dispatch(removeFavorite({favorite: this.id})) : this.store.dispatch(addFavorite({favorite: this.id}));
    });
  }
}
