export const customerInformation = () => {
    return {
      type: 'LIST_customer',
    }
  }
  export const createCustomer = (token) => {
    
    return {
      type: 'CREATE_customer',
      token
    }
  }
  export const updateCustomer = (customer) => {
    return {
      type: 'UPDATE_customer',
      customer
    }
  }
  export const deactiveCustomer = (customerID) => {
    return {
      type: 'DEACTIVE_customer',
      customerID
    }
  }