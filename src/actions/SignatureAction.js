export const signatureInformation = () => {
  return {
    type: 'LIST_signature',
  }
}
export const createSignature = (signature) => {
  
  return {
    type: 'CREATE_signature',
    signature
  }
}
export const updateSignature = (signature) => {
  return {
    type: 'UPDATE_signature',
    signature
  }
}
export const deactiveSignature = (signatureID) => {
  return {
    type: 'DEACTIVE_signature',
    signatureID
  }
}