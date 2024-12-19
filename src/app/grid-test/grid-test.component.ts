import {Component, inject, ViewChild} from '@angular/core';
import {AgGridAngular} from 'ag-grid-angular';
import type {ColDef} from 'ag-grid-community';
import {AllCommunityModule, ModuleRegistry} from 'ag-grid-community';
import {HousingService} from '../housing.service';
import {HousingLocation} from '../housinglocation';
import {CustomButtonComponent} from './grid-test-fav-button.component';
import {map} from 'rxjs';
import {Store} from '@ngrx/store';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-grid-test',
  imports: [AgGridAngular],
  templateUrl: './grid-test.component.html',
  styleUrl: './grid-test.component.css'
})
export class GridTestComponent {
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  housingService: HousingService = inject(HousingService);

  rowData!: HousingLocation[];
  colDefs: ColDef<HousingLocation>[] = [
    {field: "name"},
    {headerName: "Location", valueGetter: p => p.data?.city + ", " + p.data?.state},
    {field: "availableUnits", valueFormatter: p => p.value?.toString() + " unit" + (p.value === 1 ? "" : "s")},
    {field: "wifi"},
    {field: "laundry"},
    {
      field: "id",
      headerName: "Favoirte",
      cellRenderer: CustomButtonComponent,
      comparator: this.favoriteComparator.bind(this),
      filterParams: {
        filterOptions: ["empty", {
          displayKey: "favorited",
          displayName: "Favroited",
          numberOfInputs: 0,
          predicate: this.favoriteFilter.bind(this)
        }, {
          displayKey: "unfavorited",
          displayName: "Unfavroited",
          numberOfInputs: 0,
          predicate: (filterValues: any[], cellValue: any) => !this.favoriteFilter(filterValues, cellValue)
        }], maxNumConditions: 1
      }
    },
  ];

  defaultColDef: ColDef = {
    flex: 1,
    filter: true,
  };

  constructor(private readonly store: Store<{ favorite: number[] }>) {
    this.housingService.getAllHousingLocations().subscribe((housingLocations) => {
      this.rowData = housingLocations;
    });

    this.store.select('favorite').subscribe(() => {
      this.agGrid.api.onSortChanged();
      this.agGrid.api.onFilterChanged();
    });
  }

  favoriteComparator(a: number, b: number) {
    let aFavorited = false;
    let bFavorited = false;

    this.store.select('favorite').pipe(
      map(favorites => {
        aFavorited = favorites.includes(a);
        bFavorited = favorites.includes(b);
      })
    ).subscribe();

    if (aFavorited && !bFavorited) {
      return -1;
    } else if (!aFavorited && bFavorited) {
      return 1;
    } else {
      return 0;
    }
  }

  favoriteFilter(_filterValues: any[], cellValue: any) {
    let favorited = false;
    this.store.select('favorite').pipe(
      map(favorites => {
        favorited = favorites.includes(cellValue);
      })
    ).subscribe();
    return favorited;
  }
}
