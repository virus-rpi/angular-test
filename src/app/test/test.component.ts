import {Component} from '@angular/core';
import {AnimationTestComponent} from '../animation-test/animation-test.component';
import {FormsModule} from '@angular/forms';
import {GridTestComponent} from '../grid-test/grid-test.component';

@Component({
  selector: 'app-test',
  imports: [
    AnimationTestComponent,
    FormsModule,
    GridTestComponent
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  isOpen: boolean = false;
}
