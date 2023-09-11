import { createAction, props } from '@ngrx/store';

import { FormActions } from './form.action.enum';
import { IDeveloperData } from '../features/form/interfaces/developer-form.interfaces';


export const sendForm = createAction(
  FormActions.SEND_FORM,
  props<{ form: IDeveloperData }>(),
);

export const sendFormSuccess = createAction(
  FormActions.SEND_FORM_SUCCESS,
  props<{ response: {success: boolean} }>(),
);

export const sendFormFailed = createAction(
  FormActions.SEND_FORM_FAILED,
  props<{ error: string }>(),
);

export const cleanForm = createAction(
  FormActions.CLEAN_FORM
);
