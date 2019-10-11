//plugins
import crud from '@imagina/qcrud/_services/baseService'


//Get product and set as current product
export function GET_PRODUCT({commit}, slug) {
  return new Promise((resolve, reject) => {
    let paramsRequest = {refresh: true,params : {filter : {field : 'slug'}}}

    if (slug){
      crud.show('apiRoutes.qcommerce.products', slug, paramsRequest).then(response => {
        commit('SET_PRODUCT', response.data)
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    }
    else
      reject('slug is required')
  })
}

//Get ategory and set as current category
export function GET_CATEGORY({commit}, slug) {
  return new Promise((resolve, reject) => {
    let paramsRequest = {refresh: true,params : {filter : {field : 'slug'}}}

    if (slug){
      crud.show('apiRoutes.qcommerce.categories', slug, paramsRequest).then(response => {
        commit('SET_CATEGORY', response.data)
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    }
    else
      reject('slug is required')
  })
}
