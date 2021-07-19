/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Select from 'react-select';
import { loadRooms, loadList } from '../../redux/actions/actionCreator';
import './styles.css';

function Dashboard({ rooms, dispatch, roomInfo }) {
  useEffect(() => {
    dispatch(loadRooms());
  }, []);

  if (rooms.length && roomInfo.length === 0) {
    let roomsUrl = 'https://www.spotahome.com/api/public/listings/search/homecards_ids?ids[]=';
    for (let i = 0; i < 30; i += 1) {
      roomsUrl += rooms[i].id;
      if (i !== rooms.length - 1) {
        roomsUrl += '&ids[]=';
      }
    }

    dispatch(loadList(roomsUrl));
  }

  const propertyType = [
    {
      key: 'Show All',
      label: 'Show All',
      value: 'All'
    },
    {
      key: 'Apartments',
      label: 'Apartments',
      value: 'Apartments'
    },
    {
      key: 'Rooms',
      label: 'Rooms',
      value: 'Rooms'
    },
    {
      key: 'Studios',
      label: 'Studios',
      value: 'Studios'
    },
    {
      key: 'Residences',
      label: 'Residences',
      value: 'Residences'
    }
  ];
  const sort = [
    {
      key: 'Price ascending',
      label: 'Price ascending',
      value: 'ascending'
    },
    {
      key: 'Price descending',
      label: 'Price descending',
      value: 'descending'
    },
    {
      key: 'Relevance ascending',
      label: 'Relevance ascending',
      value: 'relAscending'
    },
    {
      key: 'Relevance descending',
      label: 'Relevance descending',
      value: 'relDescending'
    }
  ];

  return (
    <>
      <header>
        <div className="Logo">
          <img src="assets/logo.jpg" alt="Logo" />
        </div>
        <nav>
          <ul className="navList">
            <li className="navItem">The company</li>
            <li className="navItem">How we work</li>
            <li className="navItem">Contact</li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="filters">
          <div className="filtersTitle">Filters</div>
          <div className="filterPriceTitle">
            Property type:
          </div>
          <div className="priceFilter">
            <Select options={propertyType} />

          </div>
          <div className="filterSortTitle">
            Sort by:
          </div>
          <div className="sortFilter">
            <Select options={sort} />

          </div>
        </div>
        <div className="contentRooms">
          <ul>
            {roomInfo.slice(1, 29).map((element) => (
              <>
                <li>
                  <div className="itemInfo">
                    <div className="itemImg">
                      <img src={element.mainPhotoUrl} alt="roomImage" />
                    </div>
                    <div className="itemDescription">
                      <div className="itemTitle">
                        {element.title}
                      </div>
                      <div className="itemSection">
                        <div className="itemPrice">
                          {element.pricePerMonth}
                        </div>
                        <div className="itemButton">
                          <a href="/">
                            <div className="button">Rent</div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                </li>
              </>
            ))}
          </ul>

        </div>
      </main>
    </>
  );
}

Dashboard.propTypes = {
  rooms: PropTypes.shape([]).isRequired,
  roomInfo: PropTypes.shape([]).isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(store) {
  return {
    rooms: store.rooms,
    roomInfo: store.roomInfo
  };
}

export default connect(mapStateToProps)(Dashboard);
