import navBarReducers from './navBarReducers';
import createReducer from '../handler';
import actions from '../../actions';

const layoutReducers = createReducer([], {
    [actions.layout.navBarActions.TOGGLE_SIDEBAR] : navBarReducers
});

export default layoutReducers;