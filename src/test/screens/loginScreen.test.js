import React from 'react';
import { render } from '@testing-library/react';
import Containers from '../../app/containers';
import {Provider} from 'react-redux';
import redux_modules from '../../redux_modules';
import { BrowserRouter as Router} from "react-router-dom";

test('Test login page', () => {
  const { getAllByText } = render(
    <Provider store ={redux_modules.store}>
        <Router>
             <Containers.LoginScreenContainers.LoginScreenContainerComponent />
        </Router>
    </Provider>);
  const linkElement = getAllByText(/Login/i);
  expect(linkElement[0]).toBeInTheDocument();
});