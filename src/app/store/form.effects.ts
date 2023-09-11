import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, tap } from 'rxjs';

import { sendForm, sendFormFailed, sendFormSuccess } from './form.actions';
import { FormService } from '../features/form/services/form.service';
import { ResponseHandlerService } from '../shared/services/response-handler.service';

export const sendForm$ = createEffect(
  (
    actions$ = inject(Actions),
    formService: FormService = inject(FormService),
  ) =>
    actions$.pipe(
      ofType(sendForm),
      mergeMap(({ form }) =>
        formService.sendForm(form).pipe(
          map((response) => {
            return sendFormSuccess({
              response,
            });
          }),
          catchError((error: string) =>
            of(sendFormFailed({ error })),
          ),
        ),
      )
    ),

  { functional: true},
)


export const handleSendFormSuccess$ = createEffect(
  (
    actions$ = inject(Actions),
    responseHandlerService: ResponseHandlerService = inject(ResponseHandlerService),
    router = inject(Router)
  ) =>
    actions$.pipe(
      ofType(sendFormSuccess),
      tap(() => responseHandlerService.response({ type: 'success', content: `Форма відправлена!` })),
      tap(() => router.navigate(['complete']))
    ),

  { functional: true, dispatch: false },
)

export const handleSendFormFailed$ = createEffect(
  (
    actions$ = inject(Actions),
    responseHandlerService: ResponseHandlerService = inject(ResponseHandlerService)
  ) =>
    actions$.pipe(
      ofType(sendFormFailed),
      tap(() => responseHandlerService.response({ type: 'error', content: 'Виникла помилка при відправленні форми' }))
    ),

  { functional: true, dispatch: false },
)
