import basicModalReducers from './basciModalReducers';
import actions from '../../actions';
import createReducer from '../handler';

const modalReducers = createReducer([], {
    [actions.modal.basicModalActions.TOGGLE_MODAL] : basicModalReducers
});

export default modalReducers;