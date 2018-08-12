/**
 * Created by Ted on 7/28/2018.
 */
import {combineReducers} from 'redux';
import FindObject from './reducer_findObject';
import GetClickedArea from './reducer_getClickedArea';

const rootReducer = combineReducers({
  object: FindObject,
  cell: GetClickedArea
});

export default rootReducer;