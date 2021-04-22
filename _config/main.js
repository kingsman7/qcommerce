export default {
  //Entities
  entityNames: {
    coupon: 'coupon',
    itemType: 'itemType',
    manufacturer: 'manufacturer',
    order: 'order',
    paymentMethod: 'paymentMethod',
    priceList: 'priceList',
    productCategory: 'productCategory',
    productDiscount: 'productDiscount',
    productOption: 'productOption',
    productOptionValue: 'productOptionValue',
    product: 'product',
    shippingMethod: 'shippingMethod',
    store: 'store',
    taxClass: 'taxClass',
    taxRate: 'taxRate',
  },
  //Quick Cards
  quickCards: [
    {
      active: true,
      permission: 'icommerce.orders.index',
      component: () => import('@imagina/qcommerce/_components/quick-cards/lastOrders')
    },
    {
      active: true,
      permission: 'icommerce.products.index',
      component: () => import('@imagina/qcommerce/_components/quick-cards/productsToSoldOut')
    }
  ]
}
