import { ActionReducer } from "@ngrx/store";


export function loggingMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('Action:', action);
    console.log('Previous State:', state);
    const nextState = reducer(state, action);
    console.log('Next State:', nextState);
    return nextState;
  };
}