export default {
  //Quick Cards
  quickCards: [
    {
      component: () => import('@imagina/qcommerce/_components/quick-cards/lastOrders'),
      active: true
    },
    {
      component: () => import('@imagina/qcommerce/_components/quick-cards/productsToSoldOut'),
      active: true
    }
  ]
}
