const createReducer = (initialState, handlers) =>{
    console.log('..........', handlers);
    return (state = initialState, action) => {       
        if(handlers.hasOwnProperty(action.type)){
            return handlers[action.type](state, action);
        }else{
            return state;
        }   
    } 
};

export default createReducer;