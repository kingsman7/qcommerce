//Layout container
import master from 'src/layouts/master'
import blank from 'src/layouts/blank'
import vcrud from '@imagina/qcrud/_components/vueCrud'

//Middleware
import auth from '@imagina/quser/_router/middlewares/auth'
import access from '@imagina/quser/_router/middlewares/access'

export default {
	//Product List
	products: {
		permission: null,
		activated: true,
		path: '/ecommerce/products',
		name: 'ecommerce.products.index',
		layout: require('@imagina/qcommerce/_layouts/products/index').default,
		containerLayout: master,
		title: 'Product List',
		icon: 'fas fa-boxes',
		middleware: [auth]
	},
	//Product Create
	productCreate: {
		permission: null,
		activated: true,
		path: '/ecommerce/products/create',
		name: 'ecommerce.products.create',
		layout: require('@imagina/qcommerce/_layouts/products/form').default,
		containerLayout: master,
		title: 'Product Create',
		icon: 'fas fa-boxes',
		middleware: [auth]
	},
	//Categories list
	categories: {
		permission: null,
		activated: true,
		path: '/ecommerce/product-categories',
		name: 'ecommerce.categories.index',
		layout: require('@imagina/qcommerce/_layouts/categoryIndex').default,
		containerLayout: master,
		title: 'Product Categories',
		icon: 'fas fa-layer-group'
	},
	//Product options
	productOptions: {
		permission: null,
		activated: true,
		path: '/ecommerce/product-options',
		name: 'ecommerce.products.options.index',
		layout: require('@imagina/qcommerce/_layouts/optionIndex').default,
		containerLayout: master,
		title: 'Product Options',
		icon: 'fas fa-cogs',
		middleware: [auth]
	},
	//Product options values
	productOptionsValues: {
		permission: null,
		activated: true,
		path: '/ecommerce/product-options-values',
		name: 'ecommerce.products.options.values.index',
		layout: require('@imagina/qcommerce/_layouts/optionValuesIndex').default,
		containerLayout: master,
		title: 'Options Values',
		icon: 'fas fa-stream',
		middleware: [auth]
	},
}