import { createReducer, on, createFeature } from '@ngrx/store';

import { IFormState } from './form.state.interfaces';
import { cleanForm, sendForm, sendFormFailed, sendFormSuccess } from './form.actions';

export const form = 'form';

export const formInitialState: IFormState = {
  isLoading: false,
  error: '',
  form: null,
};

export const FormFeature = createFeature({
  name: form,
  reducer: createReducer(
    formInitialState,

    on(sendForm, (state: IFormState, { form }) => ({
      ...state,
      form: form,
      error: '',
      isLoading: true,
    })),
    on(sendFormSuccess, (state: IFormState, { response }) => ({
      ...state,
      isLoading: false,
      error: '',
    })),
    on(sendFormFailed, (state: IFormState, { error }) => ({
      ...state,
      error: error,
      isLoading: false,
    })),

    on(cleanForm, (state: IFormState) => ({
      ...state,
      error: '',
      isLoading: false,
      form: null,
    })),
  ),
});
