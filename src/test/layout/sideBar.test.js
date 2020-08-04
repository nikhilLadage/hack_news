import React from 'react';
import { render } from '@testing-library/react';
import Containers from '../../app/containers';
import {Provider} from 'react-redux';
import redux_modules from '../../redux_modules';

test('Test side bar', () => {
  const { getAllByText } = render(
    <Provider store ={redux_modules.store}>
        <Containers.LayoutContainers.SideBarContainerComponent />
    </Provider>);
  const linkElement = getAllByText(/Sign out/i);
  expect(linkElement[0]).not.toBeEmpty()
});
