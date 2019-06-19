import eCommerceService from '@imagina/qcommerce/_services/index'

export const GET_SHIPPING_METHODS = ({ commit, state, dispatch }, params = {}) => {
  return new Promise(async (resolve, reject) => {
    await eCommerceService.crud.index('apiRoutes.eCommerce.shippingMethodsCalculationsAll', params)
     .then(response => {
        commit('SET_SHIPPINGMETHODS', response.data)
        resolve(true)
     })
     .catch(error=>{
       reject(error)
     })
  })
}

export const GET_PAYMNENT_METHODS= ({ commit, state, dispatch }, params = {}) => {
  return new Promise(async (resolve, reject) => {
    await eCommerceService.crud.index('apiRoutes.eCommerce.paymentMethods', params)
     .then(response => {
       commit('SET_PAYMENT_METHODS', response.data)
        resolve(true)
     })
     .catch(error=>{
       reject(error)
     })
  })
}

export const GET_STORES= ({ commit, state, dispatch }, params = {}) => {
  return new Promise(async (resolve, reject) => {
    await eCommerceService.crud.index('apiRoutes.eCommerce.stores', params)
      .then(response => {
        commit('SET_STORES', response.data)
        resolve(true)
      })
      .catch(error=>{
        reject(error)
      })
  })
}

export const UPDATECHECKOUT = ({ commit, state, dispatch }, payload) => {
  commit('UPDATE_CHECKOUT', payload)
}

export const RETETCHECKOUT = ({ commit, state, dispatch }, payload) => {
  commit('RETET_CHECKOUT', payload)
}
