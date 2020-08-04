import React from 'react';
import { render } from '@testing-library/react';
import Containers from '../../app/containers';
import {Provider} from 'react-redux';
import redux_modules from '../../redux_modules';

test('Test dashboard home', () => {
    const { getAllByText } = render(
      <Provider store ={redux_modules.store}>
          <Containers.DashboardContainers.DashboardHomeContainerComponent />
      </Provider>);
    const linkElement = getAllByText(/Dashboard/i);
    expect(linkElement[0]).toBeInTheDocument();
});

test('Test list of challenges', () => {
  const { getAllByText } = render(
    <Provider store ={redux_modules.store}>
        <Containers.DashboardContainers.ChallengeListsContainerComponent />
    </Provider>);
  const linkElement = getAllByText(/Vote/i);
  expect(linkElement[0]).toBeInTheDocument();
});