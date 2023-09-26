import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "shared/service/authentication/auth-service.service";
import { LoginSuccessfull, failureAuth, startAuthLoading, startLogin } from "../actions/auth.actions";
import { Store } from "@ngrx/store";
import { catchError, map, switchMap, tap } from "rxjs";


@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private _store: Store,
    private _authService: AuthService
  ) {}
 
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startLogin),
      tap(() => this._store.dispatch(startAuthLoading())),
      switchMap((action) =>
        this._authService.signIn(action.credential).pipe(
          map(res => {
              let token = res.access_token;
              localStorage.setItem("token", token);
              return token;
          }),
          switchMap(token => [ LoginSuccessfull({ token: token }) ]),
          catchError((error) => [ failureAuth({ errorMsg: error }) ])
        )
      )
    )
  );
 
}
