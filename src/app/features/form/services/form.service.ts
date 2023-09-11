import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, delay } from 'rxjs';
import { IDeveloperData } from '../interfaces/developer-form.interfaces';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private _http: HttpClient) { }

  public sendForm(form: IDeveloperData): Observable<{success: boolean}> {
  // TODO the right request
  // const url = `api/form`;
  // return this._http.post<{success: boolean}>(url, form);
  return of({ success: true }).pipe(
    delay(1000),
  );
  }

}
