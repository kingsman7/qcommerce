<template>
  <div class="q-container">
    <div class="row ">
      <div class="col-md-12 flex flex-center">
        
        <!-- (Prop) Title -->
        <h1 class="q-headline text-primary ">
          CHECKOUT
        </h1>
        
      </div>
    </div>
    <div class="row gutter-x-sm">
      
      <div class="col-md-4">
        
        <!-- (Component) Customer Information -->
        <customerInformation/>
        
      </div>
      <div class="col-md-4 gutter-y-sm">
  
        <!-- (Component) Shipping Address -->
        <shippingAddress :checkoutData="checkoutData"/>
        
        <!-- (Component) Billing Details -->
        <billingAddress :checkoutData="checkoutData"/>
        
  
        
      </div>
      <div class="col-md-4 gutter-y-sm">
        
        <!-- (Component) Delivery Methods -->
        <shippingMethods/>
        
        <!-- (Component) Payment Methods -->
        <paymentMethods/>
        
        <!-- (Component) Order Summary PDT -->
        
        
      </div>
    </div>
  </div>
</template>

<script>
  // COMPONENTS
  import customerInformation from '@imagina/qcommerce/_components/frontend/checkout/customerInformation'
  import billingAddress from '@imagina/qcommerce/_components/frontend/checkout/billingAddress'
  import shippingAddress from '@imagina/qcommerce/_components/frontend/checkout/shippingAddress'
  import shippingMethods from '@imagina/qcommerce/_components/frontend/checkout/shippingMethods'
  import paymentMethods from '@imagina/qcommerce/_components/frontend/checkout/paymentMethods'
  
  export default {
    components:{
      customerInformation,
      billingAddress,
      shippingAddress,
      shippingMethods,
      paymentMethods,
    },
    watch:{
      checkoutData(newVal){
        // Dispactch uptate checkout store data
      }
    },
    data(){
      return{
        checkoutData:{
          attributes: {
            storeId: 0,
            customerId: 0,
            paymentMethod: '',
            paymentMethodId: 0,
            shippingMethod: '',
            shippingMethodId: 0,
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
            shippingZone: ''
          }
        }
      }
    },
  }
</script>

<style scoped>

</style>
