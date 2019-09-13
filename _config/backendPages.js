//Layout container
import master from 'src/layouts/master'
import blank from 'src/layouts/blank'

//Middleware
import auth from '@imagina/quser/_router/middlewares/auth'
import access from '@imagina/quser/_router/middlewares/access'

export default {
  //Product List
	products: {
		permission: 'icommerce.products.index',
		activated: true,
		path: '/ecommerce/products',
		name: 'qcommerce.admin.products.index',
		layout: require('@imagina/qcommerce/_layouts/admin/products/index').default,
		containerLayout: master,
		title: 'qcommerce.sidebar.adminProducts',
		icon: 'fas fa-boxes',
		middleware: [auth,access]
	},
	//Product Create
	productCreate: {
		permission: 'icommerce.products.create',
		activated: true,
		path: '/ecommerce/products/create',
		name: 'qcommerce.admin.products.create',
		layout: require('@imagina/qcommerce/_layouts/admin/products/form').default,
		containerLayout: master,
		title: 'qcommerce.sidebar.adminProductCreate',
		icon: 'fas fa-boxes',
		middleware: [auth,access]
	},
	//Product Update
	productEdit: {
		permission: 'icommerce.products.edit',
		activated: true,
		path: '/ecommerce/products/:id',
		name: 'qcommerce.admin.products.edit',
		layout: require('@imagina/qcommerce/_layouts/admin/products/form').default,
		containerLayout: master,
		title: 'qcommerce.sidebar.adminProductEdit',
		icon: 'fas fa-boxes',
		middleware: [auth,access]
	},
	//Categories list
	categories: {
		permission: 'icommerce.categories.index',
		activated: true,
		path: '/ecommerce/product-categories',
		name: 'qcommerce.admin.categories',
		layout: require('@imagina/qcommerce/_layouts/admin/category/index').default,
		containerLayout: master,
		title: 'qcommerce.sidebar.adminCategories',
		icon: 'fas fa-layer-group',
		middleware: [auth,access]
	},
	//Product options
	options: {
		permission: 'icommerce.options.index',
		activated: true,
		path: '/ecommerce/product-options',
		name: 'qcommerce.admin.options',
		layout: require('@imagina/qcommerce/_layouts/admin/option/index').default,
		containerLayout: master,
		title: 'qcommerce.sidebar.adminOptions',
		icon: 'fas fa-cogs',
		middleware: [auth,access]
	},
	//Product options values
	optionValues: {
		permission: 'icommerce.optionvalues.index',
		activated: true,
		path: '/ecommerce/product-options-values',
		name: 'qcommerce.admin.options.values',
		layout: require('@imagina/qcommerce/_layouts/admin/optionValues/index').default,
		containerLayout: master,
		title: 'qcommerce.sidebar.adminValues',
		icon: 'fas fa-stream',
		middleware: [auth,access]
	},
	// Payment Methods
	paymentMethods: {
		permission: 'icommerce.payment-methods.manage',
		activated: true,
		path: '/payment-methods',
		name: 'qcommerce.admin.payment.methods',
		layout: require('@imagina/qcommerce/_layouts/admin/paymentMethods/index').default,
		containerLayout: master,
		title: 'qcommerce.sidebar.adminPaymentMethods',
		icon: 'fas fa-money-bill-wave',
		middleware: [auth,access]
	},
	// Shipping Methods
	shippingMethods: {
		permission: 'icommerce.shipping-methods.manage',
		activated: true,
		path: '/shipping-methods',
		name: 'qcommerce.admin.shipping.methods',
		layout: require('@imagina/qcommerce/_layouts/admin/shippingMethods/index').default,
		containerLayout: master,
		title: 'qcommerce.sidebar.adminShippingMethods',
		icon: 'fas fa-shipping-fast',
		middleware: [auth,access]
	},
  orders: {
    permission: null,
    activated: true,
    path: '/orders',
    name: 'qcommerce.admin.shipping.orders.index',
    layout: require('@imagina/qcommerce/_layouts/admin/order/index').default,
    containerLayout: master,
    title: 'qcommerce.sidebar.adminOrders',
    icon: 'fas fa-box-open',
    middleware: [auth,access]
  },
  order: {
    permission: null,
    activated: true,
    path: '/order/:id',
    name: 'qcommerce.admin.shipping.orders.show',
    layout: require('@imagina/qcommerce/_layouts/admin/order/show').default,
    containerLayout: master,
    title: 'qcommerce.sidebar.adminOrders',
    icon: 'fas fa-box-open',
    middleware: [auth,access]
  },
  coupons: {
    permission: null,
    activated: true,
    path: '/coupons',
    name: 'qcommerce.admin.coupons.index',
    layout: require('@imagina/qcommerce/_layouts/admin/coupons/index').default,
    containerLayout: master,
    title: 'qcommerce.sidebar.adminCoupons',
    icon: 'fas fa-ticket-alt',
    middleware: [auth,access]
  },
  couponsCreate: {
    permission: null,
    activated: true,
    path: '/coupons/create',
    name: 'qcommerce.admin.coupons.create',
    layout: require('@imagina/qcommerce/_layouts/admin/coupons/form').default,
    containerLayout: master,
    title: 'qcommerce.sidebar.adminCoupons',
    icon: 'fas fa-ticket-alt',
    middleware: [auth,access]
  },
  couponsEdit: {
    permission: null,
    activated: true,
    path: '/coupons/:id',
    name: 'qcommerce.admin.coupons.edit',
    layout: require('@imagina/qcommerce/_layouts/admin/coupons/form').default,
    containerLayout: master,
    title: 'qcommerce.sidebar.adminCoupons',
    icon: 'fas fa-ticket-alt',
    middleware: [auth,access]
  },
}
