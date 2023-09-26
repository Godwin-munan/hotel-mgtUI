import { Action, createReducer, on } from "@ngrx/store";
import { AuthState } from "../states/auth.state";
import { LoginSuccessfull, failureAuth, setAuthenticated, setUnauthenticed, startAuthLoading } from "../actions/auth.actions";

const initialState: AuthState = {
  user: undefined,
  token: undefined,
  isAuthenticated: false,
  isloading: false,
  errorMsg: undefined
};

export const authReducer = createReducer(
      initialState,
      on(setAuthenticated, (state) => ({ ...state, isAuthenticated: true })),
      on(setUnauthenticed, (state) => ({ ...state, isAuthenticated: false })),
      on(startAuthLoading, (state) => ({ ...state, isloading: true})),
      on(LoginSuccessfull, (state, action) => ({
          ...state,
          isAuthenticated: true,
          isloading: false,
          token: action.token
        })),
      on(failureAuth, (state, action) => ({ 
        ...state,
        isloading: false, 
        errorMsg: action.errorMsg
      })),
    )

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
