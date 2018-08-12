/**
 * Created by Ted on 7/29/2018.
 */

import {GET_CLICKED_AREA, RESET_CLICKED_AREA} from "../api/staff_api_functions";

export default function(state = '', action){

    switch(action.type){
        case GET_CLICKED_AREA:
            // console.log(state);
            // console.log('Action received CLICKED_AREA ', action);
            // console.log("SWITCH: ",action.payload.location);
            return action.payload;
        case RESET_CLICKED_AREA:
            // console.log(state);
            // console.log('Action received RESET_CLICKED_AREA ', action);
            // console.log("SWITCH: ",action.payload.location);
            return action.payload;
    }
    // console.log("STATE FROM CLICKED REDUCER: ", state);
    return state;
}