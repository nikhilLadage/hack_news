import addToDo from './addToDo';
import createReducer from '../handler';


const dashboardReducers = createReducer([] , {
    ADD_TODO : addToDo
});

export default dashboardReducers;