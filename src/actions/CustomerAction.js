export const customerInformation = () => {
    return {
      type: 'LIST_customer',
    }
  }
  export const createCustomer = (customer) => {
    
    return {
      type: 'CREATE_customer',
      customer
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