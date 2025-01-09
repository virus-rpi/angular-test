import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HousingService} from '../housing.service';
import {HousingLocation} from '../housinglocation';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ViewsService} from '../views.service';

@Component({
  selector: 'app-details',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img
        class="listing-photo"
        src="{{housingLocation?.photo || ''}}"
        alt="Exterior photo of {{ housingLocation?.name }}"
        crossorigin
        height="600"
        width="50%"
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
        <p>
          {{ liveViewers }} View{{ liveViewers > 1 ? 's' : '' }}
        </p>
      </section>
      <br/>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" required/>
          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName" required/>
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" required/>
          <button type="submit" class="primary" [disabled]="applyForm.invalid">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css'],
  standalone: true
})

export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  liveViewersService: ViewsService = inject(ViewsService)
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  })
  liveViewers!: number;

  constructor() {
    const housingLocationId =Number(this.route.snapshot.params['id']);

    const viewedLocations = sessionStorage.getItem('viewedLocations') ? JSON.parse(sessionStorage.getItem('viewedLocations') ?? '[]') : [];

    this.housingService.getHousingLocationById(housingLocationId).subscribe((housingLocation) => {
      this.housingLocation = housingLocation;
    })
    if (!viewedLocations.includes(housingLocationId)) {
      this.liveViewersService.addView(housingLocationId).subscribe({
        next: () => console.log('added view'),
        error: (err) => console.error('error adding view: ', err)
      })
      viewedLocations.push(housingLocationId);
      sessionStorage.setItem('viewedLocations', JSON.stringify(viewedLocations));
    }
    this.liveViewersService.getLiveViewsForId(housingLocationId).subscribe((liveViewers) => {
      this.liveViewers = liveViewers
    })
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }
}
