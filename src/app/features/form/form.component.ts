import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormArray,
  FormGroup,
  Validators,
  FormControl,
  ValidationErrors,
  AsyncValidatorFn,
  AbstractControl
} from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SharedModule } from '../../shared/shared.module';

import { IDeveloperData, IVersions } from './interfaces/developer-form.interfaces';
import { sendForm } from '../../store/form.actions';
import { VERSIONS } from './constance/versions.constance';
import { FormFeature } from '../../store/form.reducer';

@Component({
  standalone: true,
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  imports: [ CommonModule, SharedModule],
})
export class FormComponent implements OnInit{
  private _store = inject(Store);
  private _versions: IVersions = VERSIONS

  public developerForm!: FormGroup;
  public emailExistsError: boolean = false;
  public minDate!: Date;
  public maxDate!: Date;
  public isLoading$: Observable<boolean> = this._store.select(FormFeature.selectIsLoading);

  ngOnInit(): void {
    this._formInit();
    this._setMinMaxDates();
  }

  private _formInit(): void {
    this.developerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      framework: new FormControl('', Validators.required),
      frameworkVersion: new FormControl('', Validators.required),
      email: new FormControl(
        '',
        [Validators.required, Validators.email],
        [this.emailAsyncValidator]
        ),
      hobbies: new FormArray([])
    })
    this.addHobby()
  }

  public addHobby(): void {
    const hobby: FormGroup =  new FormGroup({
      name: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
    });

    this.hobbies.push(hobby);
  }

  public removeHobby(index: number): void {
    if( this.hobbies.value.length >= 2 ) {
      this.hobbies.removeAt(index);
    }
  }

  private emailAsyncValidator: AsyncValidatorFn = (control: AbstractControl) => {
    return new Promise<ValidationErrors | null>((resolve) => {
      setTimeout(() => {
        if (control.value === 'test@test.test') {
          this.emailExistsError = true;
          resolve({ emailExists: true });
        } else {
          this.emailExistsError = false;
          resolve(null);
        }
      }, 2000);
    });
  }

  private _setMinMaxDates(): void {
    const currentDate = new Date();
    this.minDate = new Date(currentDate);
    this.minDate.setFullYear(currentDate.getFullYear() - 120);
    this.maxDate = new Date(currentDate);
    this.maxDate.setFullYear(currentDate.getFullYear() - 10);
  }

  public onSubmit(): void {
    if(this.developerForm.invalid) {
      return
    }
    const formData: IDeveloperData = this.developerForm.value;
    this._store.dispatch(sendForm({form: formData}))
  }

  public getFrameworkVersions(): string[]{
    const selectedFramework: keyof IVersions = this.developerForm.get('framework')!.value as keyof IVersions;
    return this._versions[selectedFramework] || [];
  }

  get hobbies(): FormArray {
    return this.developerForm.get('hobbies') as FormArray;
  }
}

