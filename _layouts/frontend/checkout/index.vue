<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        
        <!-- (Prop) Title -->
        <h1 class="q-headline text-primary">
          {{title}}
        </h1>
        
      </div>
    </div>
    <div class="row gutter-x-sm">
      <div class="col-md-4">
        
        <!-- (Component) Customer Information -->
        <CheckoutCustomer/>
        
      </div>
      <div class="col-md-4">
        
        <!-- (Component) Billing Details -->
        <CheckoutBilling/>
        
        <!-- (Component) Shipping Address -->
        <CheckoutShipping/>
        
      </div>
      <div class="col-md-4">
        
        <!-- (Component) Delivery Methods -->
        <CheckoutDelivery/>
        
        <!-- (Component) Payment Methods -->
        <CheckoutPayment/>
        
        <!-- (Component) Order Summary -->
        <CheckoutSummary/>
        
      </div>
    </div>
  </div>
</template>

<script>
  // COMPONENTS
  import CheckoutCustomer from '@imagina/qcommerce/_components/frontend/checkout/CheckoutCustomer'
  import CheckoutBilling from '@imagina/qcommerce/_components/frontend/checkout/CheckoutBilling'
  import CheckoutShipping from '@imagina/qcommerce/_components/frontend/checkout/CheckoutShipping'
  import CheckoutDelivery from '@imagina/qcommerce/_components/frontend/checkout/CheckoutDelivery'
  import CheckoutPayment from '@imagina/qcommerce/_components/frontend/checkout/CheckoutPayment'
  import CheckoutSummary from '@imagina/qcommerce/_components/frontend/checkout/CheckoutSummary'
  
  export default {
    props:{
      title:{
        type:String,
        default:'Checkout'
      }
    },
    components:{
      CheckoutCustomer,
      CheckoutBilling,
      CheckoutShipping,
      CheckoutDelivery,
      CheckoutPayment,
      CheckoutSummary,
    },
    data(){
      return{
      
      }
    }
  }
</script>

<style scoped>

</style>
