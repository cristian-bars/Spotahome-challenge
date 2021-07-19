import { combineReducers } from 'redux';
import roomsReducer from './roomsReducer';
import roomReducer from './roomReducer';

const rootReducer = combineReducers({
  rooms: roomsReducer,
  roomInfo: roomReducer
});

export default rootReducer;
