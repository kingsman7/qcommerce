export default {
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
