<template>
  <div class="q-container">
    <div class="row ">
      <div class="col-12 flex flex-center">
        <h1 class="q-headline text-primary">
          CHECKOUT
        </h1>
      </div>
    </div>
    <div class="row gutter-x-sm gutter-y-sm relative-position">
      
      <div class="col-sm-12 col-md-12 col-lg-4">
        <!-- (COMPONENT) CUSTOMER INFORMATION -->
        <customerInformation/>
      </div>
      <div class="col-sm-12 col-md-12 col-lg-4 gutter-y-sm">
        <!-- (COMPONENT) SHIPPING ADDRESS -->
        <shippingAddress :checkoutData="checkoutData" :error="$v.checkoutData.attributes"/>
        <!-- (COMPONENT) BILLING DETAILS -->
        <billingAddress :checkoutData="checkoutData" :error="$v.checkoutData.attributes"/>
      </div>
      <div class="col-sm-12 col-md-12 col-lg-4 gutter-y-sm">
        <!-- (COMPONENT) DELIVERY METHODS -->
        <shippingMethods :checkoutData="checkoutData" :error="$v.checkoutData.attributes"/>
        <!-- (COMPONENT) PAYMENT METHODS -->
        <paymentMethods :checkoutData="checkoutData" :error="$v.checkoutData.attributes"/>
        <!-- (COMPONENT) ORDER SUMMARY  -->
        <summaryCart/>
        <div>
          <q-btn label="Send" color="primary" class="full-width" @click="saveOrder()"/>
        </div>
      </div>
      
      <inner-loading :visible="loading" />
    </div>
  </div>
</template>

<script>
  // SERVICES
  import eCommerceService from '@imagina/qcommerce/_services/index'
  
  // PLUGINS
  import {required, requiredIf} from 'vuelidate/lib/validators'
  
  // COMPONENTS
  import customerInformation from '@imagina/qcommerce/_components/frontend/checkout/customerInformation'
  import billingAddress from '@imagina/qcommerce/_components/frontend/checkout/billingAddress'
  import shippingAddress from '@imagina/qcommerce/_components/frontend/checkout/shippingAddress'
  import shippingMethods from '@imagina/qcommerce/_components/frontend/checkout/shippingMethods'
  import paymentMethods from '@imagina/qcommerce/_components/frontend/checkout/paymentMethods'
  import summaryCart from '@imagina/qcommerce/_components/frontend/checkout/summary'
  import innerLoading from 'src/components/master/innerLoading'
  
  export default {
    props:{
      typeLayout:{
        type:String,
        default:'OnePage' // OnePage, Stepper
      }
    },
    components:{
      customerInformation,
      billingAddress,
      shippingAddress,
      shippingMethods,
      paymentMethods,
      summaryCart,
      innerLoading,
    },
    data(){
      return{
        loading:false,
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
            shippingZone: '',
          },
          shippingAndBillingAddressIsSame: true,
        }
      }
    },
    validations:{
      checkoutData:{
        attributes:{
          storeId: {required},
          customerId: {required},
          paymentMethod: {required},
          paymentMethodId: {required},
          shippingMethod: {required},
          shippingMethodId: {required},
          cartId: {required},
          paymentFirstName: {
            required: requiredIf(function () {
              return !this.checkoutData.shippingAndBillingAddressIsSame
            })
          },
          paymentLastName: {
            required: requiredIf(function () {
              return !this.checkoutData.shippingAndBillingAddressIsSame
            })
          },
          paymentCompany: {
            required: requiredIf(function () {
              return !this.checkoutData.shippingAndBillingAddressIsSame
            })
          },
          paymentNit: {
            required: requiredIf(function () {
              return !this.checkoutData.shippingAndBillingAddressIsSame
            })
          },
          paymentAddress1: {
            required: requiredIf(function () {
              return !this.checkoutData.shippingAndBillingAddressIsSame
            })
          },
          paymentAddress2: {
            required: requiredIf(function () {
              return !this.checkoutData.shippingAndBillingAddressIsSame
            })
          },
          paymentCity: {
            required: requiredIf(function () {
              return !this.checkoutData.shippingAndBillingAddressIsSame
            })
          },
          paymentZipCode: {
            required: requiredIf(function () {
              return !this.checkoutData.shippingAndBillingAddressIsSame
            })
          },
          paymentCountry: {
            required: requiredIf(function () {
              return !this.checkoutData.shippingAndBillingAddressIsSame
            })
          },
          paymentZone: {
            required: requiredIf(function () {
              return !this.checkoutData.shippingAndBillingAddressIsSame
            })
          },
          shippingFirstName: {required},
          shippingLastName: {required},
          shippingCompany: {required},
          shippingAddress1: {required},
          shippingAddress2: {required},
          shippingCity: {required},
          shippingZipCode: {required},
          shippingCountry: {required},
          shippingZone: {required}
        }
      }
    },
    methods:{
      // SEND ORDER TO SERVER
      async saveOrder(){
        await this.shippingBillingAddressSame()
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.$helper.alert.error(`Please fill the Order correctly`)
        } else {
          
          this.loading = true
          eCommerceService.crud.create('apiRoutes.eCommerce.orders', this.checkoutData)
          .then(response => {
            
            // CLEAR DATA IN SHOPPING CART
            this.$store.dispatch("shoppingCart/CLEAR_CART")
            
            // OPEN NEW WINDOW IF THE PAYMENT METHOD REQUIRES IT
            if(response.data.paymentData.external){
              window.open(response.data.paymentData.redirectRoute, '_blank');
            }
            
            // REDIRECT THE USER TO THE SHOW VIEW OF THE NEWLY CREATED ORDER
            this.$router.push({name : 'order.show' , params : {id : response.data.orderId}})
            
            this.$helper.alert.success('Order Created Succesfuly')
            this.loading = false
          })
          .catch( error => {
            this.loading = false
            this.$helper.alert.error(`Error ${error}`)
          })
        }
      },
      async shippingBillingAddressSame(){
        if (this.checkoutData.shippingAndBillingAddressIsSame){
          this.checkoutData.attributes.paymentFirstName = this.checkoutData.attributes.shippingFirstName
          this.checkoutData.attributes.paymentLastName = this.checkoutData.attributes.shippingLastName
          this.checkoutData.attributes.paymentCompany = this.checkoutData.attributes.shippingCompany
          this.checkoutData.attributes.paymentAddress1 = this.checkoutData.attributes.shippingAddress1
          this.checkoutData.attributes.paymentAddress2 = this.checkoutData.attributes.shippingAddress2
          this.checkoutData.attributes.paymentCity = this.checkoutData.attributes.shippingCity
          this.checkoutData.attributes.paymentZipCode = this.checkoutData.attributes.shippingZipCode
          this.checkoutData.attributes.paymentCountry = this.checkoutData.attributes.shippingCountry
          this.checkoutData.attributes.paymentZone = this.checkoutData.attributes.shippingZone
        }
      }
    }
  }
</script>
