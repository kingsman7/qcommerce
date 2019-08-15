//Layout container
import master from 'src/layouts/master'
import blank from 'src/layouts/blank'

//Middleware
import auth from '@imagina/quser/_router/middlewares/auth'
import access from '@imagina/quser/_router/middlewares/access'

export default {
	// Index Product
	productsIndex: {
		permission: null,
		activated: true,
		path: '/products',
		name: 'products.index',
		layout: require('@imagina/qcommerce/_layouts/frontend/products/index').default,
		containerLayout: master,
		title: 'Product Index',
		icon: 'fas fa-boxes',
		//middleware: [auth,access]
	},
	// Index Product
	productsIndexByCategory: {
		permission: null,
		activated: true,
		path: '/products/:slugCategory',
		name: 'products.index.by.category',
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

}
