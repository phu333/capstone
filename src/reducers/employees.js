import axios from 'axios'
import {message} from'antd'
var initialState = [];
const myEmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIST_employee':
            return state;
        case 'CREATE_employee':
            console.log(action)
            state = initialState
            axios({
                url: '/api/v1/Customer',
                method: "GET",
                headers: {
                  Authorization: 'Bearer ' + action,
        
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
        case 'UPDATE_employee':
            console.log(action.employee.id)
            
            var New = state.filter(employee =>  employee.id !== action.employee.id )
            console.log(New)
            state = New
            state.push(action.employee)
            return [...state];
        case 'DEACTIVE_employee':
            state.filter(employee => employee.id !== action.employee.id)
            return [...state];
        default:
            return state;
    }
}
export default myEmployeeReducer;