import React from 'react';
import { render } from '@testing-library/react';
import Containers from '../../app/containers';
import {Provider} from 'react-redux';
import redux_modules from '../../redux_modules';

test('Test navigation bar', () => {
  const { getByTestId } = render(
    <Provider store ={redux_modules.store}>
        <Containers.LayoutContainers.NavBarContainerComponent />
    </Provider>);
  const linkElement = getByTestId('toggle-bar-icon');
  expect(linkElement).not.toBeEmpty();
});
