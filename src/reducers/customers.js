import axios from 'axios'
import {message} from'antd'
var initialState = [];

const myCustomerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIST_customer':
            return state;
        case 'CREATE_customer':
            console.log(action)
            state = initialState
            axios({
                url: '/api/v1/Customer',
                method: "GET",
                headers: {
                  Authorization: 'Bearer ' + action.token,
        
                }
              })
                .then((response) => {
        
                  return response.data;
                })
                .then((data) => {
                  
                  data.data.map((customer)=>state.push(customer))
                  
        
        
                })
                .catch(error => {
                  console.log(error)
                  if (error.response.status === 500) {
                      message.error(error.response.status + ' Server under maintainence');
                  } else if (error.response.status === 404) {
                      message.error(error.response.status + ' Server not found');
                  }
        
                });
                console.log(state)
            
            
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