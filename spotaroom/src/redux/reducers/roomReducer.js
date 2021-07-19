import actionTypes from '../actions/actionTypes';

function roomReducer(roomInfo = [], action) {
  switch (action.type) {
    case actionTypes.LOAD_ROOM_INFORMATION:
      return action.roomInfo;

    default:
      return roomInfo;
  }
}
export default roomReducer;
