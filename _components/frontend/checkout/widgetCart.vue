<template>
  <div>
    <div class="row shadow-1">
      <div class="col-12 flex flex-center">
        <h1 class="q-headline text-primary ">
          <q-chip color="primary">6</q-chip>
          Order Summary
        </h1>
      </div>
      <div class="col-12">
        <cart :checkoutData="checkoutData"/>
      </div>
    </div>
  </div>
</template>

<script>
  import cart from '@imagina/qcommerce/_components/frontend/cart/widgetCart'
  export default {
    components:{
      cart
    },
    props: {
      checkoutData:{
        type:Object,
        default:()=>({
          attributes: {
            storeId: 0,
            customerId: 0,
            paymentMethod: '',
            paymentMethodId: 0,
            shippingMethod: '',
            shippingMethodId: 0,
            shippingMethodPrice: 0,
            cartId: 0,
            paymentFirstName: '',
            paymentLastName: '',
            paymentCompany: '',
            paymentNit: '',
            paymentAddress1: '',
            paymentAddress2: '',
            paymentCity: '',
            paymentZipCode: '',
            paymentCountry: '',
            paymentZone: '',
            shippingFirstName: '',
            shippingLastName: '',
            shippingCompany: '',
            shippingAddress1: '',
            shippingAddress2: '',
            shippingCity: '',
            shippingZipCode: '',
            shippingCountry: '',
            shippingZone: '',
          },
          shippingAndBillingAddressIsSame: true,
        })
      },
    },
  }
</script>

<style scoped>
</style>
