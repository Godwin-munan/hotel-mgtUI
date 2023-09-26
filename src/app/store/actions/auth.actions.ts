import { createAction, props } from "@ngrx/store";
import { LoginInfo } from "core/model/login-info";

//Auth state
export const setAuthenticated = createAction('[Auth] Set Authenticated');
export const setUnauthenticed = createAction('[Auth] Set Unauthenticad');
export const failureAuth = createAction(
  '[Auth] Failed to Authenticate',
  props<{errorMsg: string}>()
  );

//Login
export const startLogin = createAction(
  '[Auth] Start Login',
  props<{ credential: LoginInfo }>()
  );

export const startAuthLoading = createAction('[Auth] Start Auth Loading');

export const LoginSuccessfull = createAction(
  '[Auth] Successful Login',
  props<{ token: string }>()
  );