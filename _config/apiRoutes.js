const baseApiUrl = env('BASE_URL', 'http://localhost:8000') + '/api';
const moduleName = 'icommerce';
const moduleVersion = 'v3';
const urlBase = baseApiUrl + '/' + moduleName + '/' + moduleVersion

export default {
	version: moduleVersion,
	products : urlBase + '/products',
	productOptions : urlBase + '/product-option',
	productOptionValues : urlBase + '/product-option-values',
	options : urlBase + '/options',
	optionValues : urlBase + '/option-values',
	categories : urlBase + '/categories',
	cart : urlBase + '/carts',
	cartProducts : urlBase + '/cart-products',
	paymentMethods: urlBase + '/payment-methods',
	orders : urlBase + '/orders',
	orderStatus : urlBase + '/order-statuses',
	orderStatusHistory : urlBase + '/order-status-history',
  shippingMethods: urlBase + '/shipping-methods',
  shippingMethodsCalculationsAll: urlBase + '/shipping-methods/calculations/all',
  stores: urlBase + '/stores',
}
