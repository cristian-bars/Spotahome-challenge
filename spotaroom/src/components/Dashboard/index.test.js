/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */

import { render } from '../../test-utils';
import Dashboard from './index';

test('should return a div with class products__list', () => {
  const { container } = render(<Dashboard />, {
    initialState: {
      rooms: [
        {
          id: 12345,
          title: 'Rooms for rent',
          pricePerMonth: 800,
          type: 'room_shared'
        },
        {
          id: 54321,
          title: '3-bedroom apartment',
          pricePerMonth: 650,
          type: 'apartment'
        }
      ]
    }
  });
  const filters = container.querySelector('.filters');
  expect(filters).toBeInTheDocument();
});
