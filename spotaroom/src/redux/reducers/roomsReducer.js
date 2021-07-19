import actionTypes from '../actions/actionTypes';

function roomsReducer(rooms = [], action) {
  switch (action.type) {
    case actionTypes.LOAD_DATA:
      return action.rooms;

    default:
      return rooms;
  }
}
export default roomsReducer;
