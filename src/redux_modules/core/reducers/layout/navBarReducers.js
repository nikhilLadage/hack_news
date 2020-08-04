const navBarReducers = (state, action) =>{
    return {
        toggleSidebar : action.payload === 'undefined' ? true : (action.payload ? false : true) 
    };
};

export default navBarReducers;