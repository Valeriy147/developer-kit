import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SharedModule } from '../../shared/shared.module';
import { IDeveloperData } from '../form/interfaces/developer-form.interfaces';
import { FormFeature } from '../../store/form.reducer';
import { cleanForm } from '../../store/form.actions';

@Component({
  standalone: true,
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss'],
  imports: [CommonModule, SharedModule],
})
export class CompleteComponent {
  private _router: Router = inject(Router);
  private _store: Store = inject(Store);

  public developerData: Observable<IDeveloperData | null> = this._store.select(FormFeature.selectForm);

  public newForm(): void {
    this._store.dispatch(cleanForm())
    this._router.navigate(['form'])
  }
}
