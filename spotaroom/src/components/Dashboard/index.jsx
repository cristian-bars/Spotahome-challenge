/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Select from 'react-select';
import { loadRooms, loadList } from '../../redux/actions/actionCreator';
import logo from '../../assets/logo.jpg';
import './styles.css';

function Dashboard({ rooms, dispatch, roomInfo }) {
  const [currentItem, setCurrentProperty] = useState('Show All');

  useEffect(() => {
    dispatch(loadRooms(currentItem));
  }, [currentItem]);

  if (rooms.length && roomInfo.length === 0) {
    let roomsUrl = 'https://www.spotahome.com/api/public/listings/search/homecards_ids?ids[]=';
    for (let i = 0; i < 29; i += 1) {
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
      value: 'Show All'
    },
    {
      key: 'Apartments',
      label: 'Apartments',
      value: 'apartment'
    },
    {
      key: 'Rooms',
      label: 'Rooms',
      value: 'room'
    },
    {
      key: 'Studios',
      label: 'Studios',
      value: 'studio'
    },
    {
      key: 'Residences',
      label: 'Residences',
      value: 'room_shared'
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
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav>
          <ul className="navList">
            <li className="navItem" key="company">The company</li>
            <li className="navItem" key="work">How we work</li>
            <li className="navItem" key="contact">Contact</li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="filters">
          <div className="filtersTitle">Filters</div>
          <div className="filtersContent">
            <div className="propertySection">
              <div className="filterPriceTitle">
                Property type:
              </div>
              <div className="priceFilter">
                <Select
                  options={propertyType}
                  onChange={(selectedItem) => setCurrentProperty(selectedItem.value)}
                />
              </div>
            </div>
            <div className="sortSection">
              <div className="filterSortTitle">
                Sort by:
              </div>
              <div className="sortFilter">
                <Select
                  options={sort}
                  // onChange={({ selectedItem }) => setCurrentItem(selectedItem.value)}
                />
              </div>
            </div>

          </div>

        </div>
        <div className="contentRooms">
          <ul>
            {roomInfo.length ? (
              roomInfo.map((element) => (
                currentItem !== 'Show All' ? (
                  <>
                    { element.type === currentItem && (
                      <li key={element.id}>
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
                    )}
                  </>
                ) : (
                  <>
                    <li key={element.id}>
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
                )

              ))
            ) : (
              <div>loading...</div>
            )}

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
