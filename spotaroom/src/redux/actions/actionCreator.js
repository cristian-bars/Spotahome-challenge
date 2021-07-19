import axios from 'axios';
import actionTypes from './actionTypes';

const url = 'https://www.spotahome.com/api/public/listings/search/markers/madrid';

function loadRooms() {
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

export default loadRooms();
