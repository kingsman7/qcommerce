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
		permission: 'icommerce.products.index',
		activated: true,
		path: '/ecommerce/products',
		name: 'ecommerce.products.index',
		layout: require('@imagina/qcommerce/_layouts/admin/products/index').default,
		containerLayout: master,
		title: 'Product List',
		icon: 'fas fa-boxes',
		middleware: [auth,access]
	},
	//Product Create
	productCreate: {
		permission: 'icommerce.products.create',
		activated: true,
		path: '/ecommerce/products/create',
		name: 'ecommerce.products.create',
		layout: require('@imagina/qcommerce/_layouts/admin/products/form').default,
		containerLayout: master,
		title: 'Product Create',
		icon: 'fas fa-boxes',
		middleware: [auth,access]
	},
	//Product Update
	productEdit: {
		permission: 'icommerce.products.edit',
		activated: true,
		path: '/ecommerce/products/:id',
		name: 'ecommerce.products.edit',
		layout: require('@imagina/qcommerce/_layouts/admin/products/form').default,
		containerLayout: master,
		title: 'Product Edit',
		icon: 'fas fa-boxes',
		middleware: [auth,access]
	},
	//Categories list
	categories: {
		permission: 'icommerce.categories.index',
		activated: true,
		path: '/ecommerce/product-categories',
		name: 'ecommerce.categories.index',
		layout: require('@imagina/qcommerce/_layouts/admin/category/index').default,
		containerLayout: master,
		title: 'Product Categories',
		icon: 'fas fa-layer-group',
		middleware: [auth,access]
	},
	//Product options
	options: {
		permission: 'icommerce.options.index',
		activated: true,
		path: '/ecommerce/product-options',
		name: 'ecommerce.options.index',
		layout: require('@imagina/qcommerce/_layouts/admin/option/index').default,
		containerLayout: master,
		title: 'Product Options',
		icon: 'fas fa-cogs',
		middleware: [auth,access]
	},
	//Product options values
	optionValues: {
		permission: 'icommerce.optionvalues.index',
		activated: true,
		path: '/ecommerce/product-options-values',
		name: 'ecommerce.options.values.index',
		layout: require('@imagina/qcommerce/_layouts/admin/optionValues/index').default,
		containerLayout: master,
		title: 'Options Values',
		icon: 'fas fa-stream',
		middleware: [auth,access]
	},
}