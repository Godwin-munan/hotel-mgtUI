import { isDevMode } from "@angular/core";
import { routerReducer } from "@ngrx/router-store";
import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { loggingMetaReducer } from "../meta-reducers/gobal-meta-reducers";
import { AppState } from "../states/app.state";
import { authReducer } from "./auth.reducers";



export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  authReducer: authReducer,
}

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? 
[loggingMetaReducer, 
] : 
[];