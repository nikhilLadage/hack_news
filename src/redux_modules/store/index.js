import {createStore} from 'redux';
import core from '../core';

const store = createStore(core.reducers);

export default store;