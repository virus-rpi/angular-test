import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HousingLocationComponent} from '../housing-location/housing-location.component';
import {HousingLocation} from '../housinglocation';
import {HousingService} from '../housing.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocationComponent, FormsModule],
  template: `
    <section>
      <form (ngSubmit)="filterResults(filter.value)">
        <input type="text" placeholder="Filter by city" #filter />
        <button class="primary" type="submit">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.housingService.getAllHousingLocations().subscribe((housingLocations) => {
      this.housingLocationList = housingLocations;
      this.filteredLocationList = housingLocations;
    });
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
}
