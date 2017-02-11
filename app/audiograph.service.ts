import { ActionReducer, Action,Store,Reducer } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';


export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const TOGGLE_MENU = 'TOGGLE_MENU';
export const RESET = 'RESET';


export function counterReducer(state: any, action: Action) {
   var changeState = () => {
    return Object.assign({}, state, action.payload);
  };
  console.log(state)
    switch (action.type) {
        case TOGGLE_MENU:
          if (typeof action.payload === 'undefined') {
              action.payload = { menuOpen: !state.menuOpen };
            }
        return changeState();
        // case INCREMENT:
        //     return state + 1;

        // case DECREMENT:
        //     return state - 1;

        case RESET:
            return 0;

        default:
            return state;
    }
}


