<template>
  <div>
    <div class="row shadow-1">
      <div class="col-md-12 flex flex-center">
        <h1 class="q-headline text-primary ">
          <q-chip color="primary">2</q-chip>
          Billing Address
        </h1>
      </div>
      <div class="col-md-12 q-px-md">
        
        <div class="row gutter-x-sm">
          <div class="col md-6">
            <q-field
              :error="false"
              error-label="We need a valid email">
              <q-input  v-model="checkoutData.attributes.paymentFirstName" float-label="First Name"/>
            </q-field>
          </div>
          <div class="col md-6">
            <q-field
              :error="false"
              error-label="We need a valid email">
              <q-input v-model="checkoutData.attributes.paymentLastName" float-label="Last Name"/>
            </q-field>
          </div>
        </div>
  
        <div class="row gutter-x-sm">
          <div class="col md-12">
            <q-field
              :error="false"
              error-label="We need a valid email">
              <q-input v-model="checkoutData.attributes.paymentCompany" float-label=" Company name"/>
            </q-field>
          </div>
        </div>
        
        <div class="row gutter-x-sm">
          <div class="col md-12">
            <q-field
              :error="false"
              error-label="We need a valid email">
              <q-input v-model="checkoutData.attributes.paymentAddress1" float-label=" Address 1"/>
            </q-field>
          </div>
        </div>
        
        <div class="row gutter-x-sm">
          <div class="col md-12">
            <q-field
              :error="false"
              error-label="We need a valid email">
              <q-input v-model="checkoutData.attributes.paymentAddress2" float-label=" Address 2"/>
            </q-field>
          </div>
        </div>
        
        <div class="row gutter-x-sm">
          <div class="col md-6">
          <q-field
            :error="false"
            error-label="We need a valid email">
            <q-input v-model="checkoutData.attributes.paymentCity" float-label="City"/>
          </q-field>
          </div>
            <div class="col md-6">
          <q-field
            :error="false"
            error-label="We need a valid email">
            <q-input v-model="checkoutData.attributes.paymentZipCode" float-label="Zip/Postal code"/>
          </q-field>
            </div>
        </div>
        
        <div class="row gutter-x-sm">
          <div class="col md-12">
            <q-field
              :error="false"
              error-label="We need a valid email">
              <q-input v-model="checkoutData.attributes.paymentCountry" float-label="Country"/>
            </q-field>
          </div>
        </div>
  
        <div class="row gutter-x-sm">
          <div class="col md-12">
            <q-field
              :error="false"
              error-label="We need a valid email">
              <q-input v-model="checkoutData.attributes.paymentZone" float-label="State/Province"/>
            </q-field>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      checkoutData:{
        type:Object,
        default:()=>({
          attributes: {
            storeId: 0,
            customerId: 0,
            paymentMethod: '',
            paymentMethod_id: 0,
            shippingMethod: '',
            shippingMethod_id: 0,
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
      }
    },
    data(){
      return{

      }
    }
  }
</script>

<style scoped>
</style>
