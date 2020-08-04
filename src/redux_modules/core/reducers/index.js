import {combineReducers} from 'redux';
import dashboardReducers from './dashboard';
import layoutReducers from './layout';
import modalReducers from './modal';

const appReducers = combineReducers({
    dashboard : dashboardReducers,
    layout: layoutReducers,
    modal: modalReducers,
})

export default appReducers;