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
}