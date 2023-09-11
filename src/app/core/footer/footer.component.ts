import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [ CommonModule, SharedModule ],
})
export class FooterComponent {

}
