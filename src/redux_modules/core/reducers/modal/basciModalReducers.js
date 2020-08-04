const modalReducers = (state, action) =>{
    return {
        ...action.payload
    };
};

export default modalReducers;