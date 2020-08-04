import React from 'react';
import { render } from '@testing-library/react';
import App from '../app/App';
import {Provider} from 'react-redux';
import redux_modules from '../redux_modules';

test('renders learn react link', () => {
  const { getAllByText } = render(
    <Provider store ={redux_modules.store}>
        <App />
    </Provider>);
  const linkElement = getAllByText(/Dashboard/i);
  expect(linkElement[0]).toBeInTheDocument();
});
