import axios from 'axios';
import actionTypes from './actionTypes';

let url = 'https://www.spotahome.com/api/public/listings/search/markers/madrid';

export function loadRooms(value) {
  if (value !== 'Show All') {
    url = `https://www.spotahome.com/api/public/listings/search/markers/madrid?type[]=${value}`;
  }
  return async (dispatch) => {
    try {
      const { data } = await axios(url);
      dispatch({
        type: actionTypes.LOAD_DATA,
        rooms: data.data
      });
    } catch (error) {
      dispatch({
        type: actionTypes.LOAD_DATA_ERROR
      });
    }
  };
}

export function loadList(roomsUrl) {
  return async (dispatch) => {
    try {
      const { data } = await axios(roomsUrl);
      dispatch({
        type: actionTypes.LOAD_ROOM_INFORMATION,
        roomInfo: data.data.homecards
      });
    } catch (error) {
      dispatch({
        type: actionTypes.LOAD_ROOM_INFORMATION_ERROR
      });
    }
  };
}
