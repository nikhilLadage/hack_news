import React from 'react';
import { render } from '@testing-library/react';
import Containers from '../../app/containers';
import {Provider} from 'react-redux';
import redux_modules from '../../redux_modules';

test('Test add new challenge', () => {
  const { getAllByText } = render(
    <Provider store ={redux_modules.store}>
        <Containers.ChallengeContainers.AddNewChallengeContainerComponent />
    </Provider>);
  const linkElement = getAllByText(/Description/i);
  expect(linkElement[0]).toBeInTheDocument();
});
