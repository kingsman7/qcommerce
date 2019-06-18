<template>
  <div>
    <div class="row shadow-1">
      <div class="col-md-12 flex flex-center">
        <h1 class="q-headline text-primary ">
          <q-chip color="primary">5</q-chip>
          {{title}}
        </h1>
      </div>
      <div class="col-md-12 q-my-sm q-mx-sm">
        <q-field
          :error="error.paymentMethodId.$error || false"
          v-for="(paymentMethod, index) in $store.state.eCommerce.paymentMethods"
          :key="index">
          <q-radio
            v-model="payment"
            :val="paymentMethod"
            :label="paymentMethod.title" />
        </q-field>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      title:{
        type:String,
        default:'Payment Methods'
      },
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
        })
      },
      error:{
        type:Object,
        default:()=>{}
      }
    },
    data(){
      return{
        loading:false,
        payment:''
      }
    },
  }
</script>
