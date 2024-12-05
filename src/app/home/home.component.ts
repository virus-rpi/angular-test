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
    <section class="filter_section">
        <input type="text" placeholder="Filter by city" #city_filter (input)="filterCity(city_filter.value)"  />
    </section>
    <section class="filter_section">
      <span>
      <label for="wifi_filter" class="filter_label">Wifi</label>
      <input type="checkbox" id="wifi_filter"  (change)="filterWifi(wifi_filter.checked)" #wifi_filter />
      </span>
      <span>
        <label for="laundry_filter" class="filter_label">Laundry</label>
        <input type="checkbox" id="laundry_filter" (change)="filterLaundry(laundry_filter.checked)" #laundry_filter />
      </span>
      <span>
        <input type="checkbox" id="units_toggle" disabled (change)="toggleUnitsFilter(units_toggle.checked, units_filter.value)" #units_toggle />
        <label for="units_filter" class="filter_label">Minimum units</label>
        <input type="number" id="units_filter" min="0"  (input)="filterUnits(units_filter.value)" #units_filter />
      </span>
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

  filterCriteria = {
    city: '',
    units: 0,
    wifi: false,
    laundry: false,
  }

  constructor() {
    this.housingService.getAllHousingLocations().subscribe((housingLocations) => {
      this.housingLocationList = housingLocations;
      this.filteredLocationList = housingLocations;
    });
  }

  filterCity(city: string) {
    this.filterCriteria.city = city;
    this.filterResults();
  }

  filterUnits(units: string) {
    this.filterCriteria.units = Number(units);
    this.filterResults();

    const unit_toggle = document.getElementById('units_toggle') as HTMLInputElement;
    unit_toggle.checked = this.filterCriteria.units > 0;
    unit_toggle.disabled = false;
  }

  filterWifi(wifi: boolean) {
    this.filterCriteria.wifi = wifi;
    this.filterResults();
  }

  filterLaundry(laundry: boolean) {
    this.filterCriteria.laundry = laundry;
    this.filterResults();
  }

  toggleUnitsFilter(checked: boolean, value: string) {
    this.filterCriteria.units = checked ? Number(value) : 0
    this.filterResults();
  }

  filterResults() {
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) => {
      const matchesCity = !this.filterCriteria.city || housingLocation?.city.toLowerCase().includes(this.filterCriteria.city.toLowerCase());
      const matchesUnits = !this.filterCriteria.units || housingLocation?.availableUnits >= this.filterCriteria.units;
      const matchesWifi = !this.filterCriteria.wifi || housingLocation?.wifi === this.filterCriteria.wifi;
      const matchesLaundry = !this.filterCriteria.laundry || housingLocation?.laundry === this.filterCriteria.laundry;
      return matchesCity && matchesUnits && matchesWifi && matchesLaundry;
    });
  }
}
