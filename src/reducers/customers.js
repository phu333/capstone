var initialState = [];
const myCustomerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIST_customer':
            return state;
        case 'CREATE_customer':
            state.push(action.customer)
            
            return [...state];
        case 'UPDATE_customer':
            state.push(action.customer)
            return [...state];
        case 'DEACTIVE_customer':
            state.push(action.customerID)
            return [...state];
        default:
            return state;
    }
}
export default myCustomerReducer;