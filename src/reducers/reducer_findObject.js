/**
 * Created by Ted on 7/29/2018.
 */

import {FETCH_OBJECT, RESET_ARRAY_STATE, FETCH_OBJECT2} from "../api/staff_api_functions";

export default function(state = [], action){

  switch(action.type){
    case FETCH_OBJECT:
      // console.log('Action received FETCH OBJECT 1', action);
      // console.log("SWITCH: ",action.payload.location);
      return [action.payload.location, ...state];

    case FETCH_OBJECT2:
      // console.log('Action received FETCH OBJECT 2', action);
      // console.log("SWITCH: ",action.payload.location);
      return [action.payload, ...state];

    case RESET_ARRAY_STATE:
        // console.log('Action received RESET ARRAY', action);
        // console.log(state);
        // console.log("SWITCH: ",action.payload.location);
        return [action.payload.location];

  }
  // console.log("STATE FROM REDUCER: ", state);
  return state;
}