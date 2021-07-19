/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Select from 'react-select';
import loadRooms from '../../redux/actions/actionCreator';
import './styles.css';

function Dashboard({ rooms, dispatch }) {
  useEffect(() => {
    dispatch(loadRooms);
  }, []);

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
            {rooms.slice(1, 29).map((element) => (
              <>
                <li>{element.id}</li>
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
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(store) {
  return {
    rooms: store.rooms
  };
}

export default connect(mapStateToProps)(Dashboard);
