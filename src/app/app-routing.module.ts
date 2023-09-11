import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/form', pathMatch: 'full' },

  {
    path: 'form',
    loadComponent: () =>
    import('./features/form/form.component').then(
      (module) => module.FormComponent,
    ),
  },

  {
    path: 'complete',
    loadComponent: () =>
    import('./features/complete/complete.component').then(
      (module) => module.CompleteComponent,
    ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
