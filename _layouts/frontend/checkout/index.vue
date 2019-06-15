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
        
        <!-- (Component) Billing Details -->
        <billingAddress/>
        
        <!-- (Component) Shipping Address -->
        <shippingAddress/>
        
      </div>
      <div class="col-md-4 gutter-y-sm">
        
        <!-- (Component) Delivery Methods -->
        <shippingMethods/>
        
        <!-- (Component) Payment Methods -->
        <paymentMethods/>
        
        <!-- (Component) Order Summary -->
        <summary/>
        
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
  import summary from '@imagina/qcommerce/_components/frontend/checkout/summary'
  
  export default {
    components:{
      customerInformation,
      billingAddress,
      shippingAddress,
      shippingMethods,
      paymentMethods,
      summary,
    },
    data(){
      return{
      
      }
    }
  }
</script>

<style scoped>

</style>
