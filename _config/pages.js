//Layout container
import master from 'src/layouts/master'
import blank from 'src/layouts/blank'
import vcrud from '@imagina/qcrud/_components/vueCrud'

//Middleware
import auth from '@imagina/quser/_router/middlewares/auth'
import access from '@imagina/quser/_router/middlewares/access'

export default {
	//================= FRONT-END PAGES =====================================//
	// Index Product
	productsIndex: {
		permission: null,
		activated: true,
		path: '/products/:slugCategory',
		name: 'products.index',
		layout: require('@imagina/qcommerce/_layouts/frontend/products/index').default,
		containerLayout: master,
		title: 'Product Index',
		icon: 'fas fa-boxes',
		//middleware: [auth,access]
	},
	// Show Product
	productsShow: {
		permission: null,
		activated: true,
		path: '/product/:slugProduct',
		name: 'product.show',
		layout: require('@imagina/qcommerce/_layouts/frontend/products/show').default,
		containerLayout: master,
		title: 'Product Show',
		icon: 'fas fa-boxes',
		//middleware: [auth,access]
	},
	// Show Product
	shoppingCar: {
		permission: null,
		activated: true,
		path: '/shopping-cart',
		name: 'shopping.cart.index',
		layout: require('@imagina/qcommerce/_layouts/frontend/cart/index').default,
		containerLayout: master,
		title: 'Shopping Car Show',
		icon: 'fas fa-shopping-cart',
		//middleware: [auth,access]
	},
  // Show Cheackout
  checkout: {
    permission: null,
    activated: true,
    path: '/checkout',
    name: 'checkout.index',
    layout: require('@imagina/qcommerce/_layouts/frontend/checkout/index').default,
    containerLayout: master,
    title: 'Checkout',
    icon: 'fas fa-shopping-cart',
    middleware: [auth,access]
	},
	// Orders Index
	orders: {
		permission: null,
		activated: true,
		path: '/orders',
		name: 'orders.index',
		layout: require('@imagina/qcommerce/_layouts/frontend/orders/index').default,
		containerLayout: master,
		title: 'Orders Index',
		icon: 'fas fa-shopping-cart',
		middleware: [auth,access]
	},
	// Orders Show
	order: {
		permission: null,
		activated: true,
		path: '/order/:id',
		name: 'order.show',
		layout: require('@imagina/qcommerce/_layouts/frontend/orders/show').default,
		containerLayout: master,
		title: 'Orders Show',
		icon: 'fas fa-shopping-cart',
		middleware: [auth,access]
	},


	//================= ADMIN PAGES =====================================//
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
