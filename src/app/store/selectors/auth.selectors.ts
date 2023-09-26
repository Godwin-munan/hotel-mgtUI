import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../states/auth.state";

export const selectAuthState = createFeatureSelector<AuthState>('auth')

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);
// Create a selector for successful authentication
export const selectAuthSuccess = createSelector(
  selectUser,
  (user) => !!user // Returns true if a user object exists (successful login)
); 

export const selectLoading = createSelector(
  selectAuthState,
  (state) => state.isloading
);

export const selectError = createSelector(
  selectAuthState,
  (state) => state.errorMsg
);

// export const authFeature = createFeature({
//   name: "auth",
//   reducer: selectAuthState,
// });

// const authState = authFeature.selectAuthState;
// export const selectIsAuthenticated = authFeature.selectIsAuthenticated;
// export const selectPrincipal = authFeature.selectPrincipal;