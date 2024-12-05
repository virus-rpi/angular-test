import { Component } from '@angular/core';
import {AnimationTestComponent} from '../animation-test/animation-test.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-test',
  imports: [
    AnimationTestComponent,
    FormsModule
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  isOpen: boolean = false;

}
