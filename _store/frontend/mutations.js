export function SET_SHIPPINGMETHODS(state, payload) {
  state.shippingMethods = payload
}

export function SET_PAYMENT_METHODS(state, payload) {
  state.paymentMethods = payload
}

export function SET_STORES(state, payload) {
  state.stores = payload
}

export function UPDATE_CHECKOUT (state, payload){
  // pdt
  state.checkout = payload
}

export function RETET_CHECKOUT (state, payload){
  state.checkout = {}
}
