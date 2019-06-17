<template>
  <div>
    <div class="row shadow-1">
      <div class="col-md-12 flex flex-center">
        <h1 class="q-headline text-primary ">
          <q-chip color="primary">2</q-chip>
          {{title}}
        </h1>
      </div>
      <div class="col-md-12 q-px-md">
        
        <div class="row gutter-x-sm">
          <div class="col md-6">
            <q-field
              :error="false"
              error-label="We need a valid email">
              <q-input
                v-model="checkoutData.attributes.shippingFirstName"
                float-label="First Name"/>
            </q-field>
          </div>
          <div class="col md-6">
            <q-field
              :error="false"
              error-label="We need a valid email">
              <q-input
                v-model="checkoutData.attributes.shippingLastName"
                float-label="Last Name"/>
            </q-field>
          </div>
        </div>
        
        <div class="row gutter-x-sm">
          <div class="col md-12">
            <q-field
              :error="false"
              error-label="We need a valid email">
              <q-input
                v-model="checkoutData.attributes.shippingCompany"
                float-label=" Company name"/>
            </q-field>
          </div>
        </div>
        
        <div class="row gutter-x-sm">
          <div class="col md-12">
            <q-field
              :error="false"
              error-label="We need a valid email">
              <q-input
                v-model="checkoutData.attributes.shippingAddress1"
                float-label=" Address 1"/>
            </q-field>
          </div>
        </div>
        
        <div class="row gutter-x-sm">
          <div class="col md-12">
            <q-field
              :error="false"
              error-label="We need a valid email">
              <q-input
                v-model="checkoutData.attributes.shippingAddress2"
                float-label=" Address 2"/>
            </q-field>
          </div>
        </div>
        
        <div class="row gutter-x-sm">
          <div class="col md-12">
            <q-field
              :error="false"
              error-label="This field is required">
              <q-select
                @input="handleOnChangeCountry()"
                filter
                float-label="Country"
                v-model="checkoutData.attributes.shippingCountry"
                :options="$store.state.qlocations.countries"/>
            </q-field>
          </div>
        </div>
        
        <div class="row gutter-x-sm">
          <div class="col md-12">
            <q-field
              :error="false"
              error-label="We need a valid email">
              <q-select
                @input="handleOnChangeProvice()"
                filter
                float-label="State/Province"
                v-model="checkoutData.attributes.shippingZone"
                :options="provinces"/>
            </q-field>
          </div>
        </div>
        
        <div class="row gutter-x-sm">
          <div class="col md-6">
            <q-field
              :error="false"
              error-label="We need a valid email">
              <q-select
                filter
                float-label="City"
                v-model="checkoutData.attributes.shippingCity"
                :options="cities"/>
            </q-field>
          </div>
          <div class="col md-6">
            <q-field
              :error="false"
              error-label="We need a valid email">
              <q-input
                v-model="checkoutData.attributes.shippingZipCode"
                float-label="Zip/Postal code"/>
            </q-field>
          </div>
        </div>
      
      </div>
    </div>
  </div>
</template>

<script>
  // COMPONENTS
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    props:{
      title:{
        type: String,
        default:'Shipping Address'
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
      }
    },
    watch:{
      'checkoutData.attributes.shippingCountry':function (val, oldVal) {
        let params = {
          params:this.checkoutData.attributes
        }
        this.$store.dispatch('eCommerce/GET_SHIPPING_METHODS', params);
      },
      'checkoutData.attributes.shippingZone':function (val, oldVal) {
        let params = {
          params:this.checkoutData.attributes
        }
        this.$store.dispatch('eCommerce/GET_SHIPPING_METHODS',params);
      },
      'checkoutData.attributes.shippingCity':function (val, oldVal) {
        let params = {
          params:this.checkoutData.attributes
        }
        this.$store.dispatch('eCommerce/GET_SHIPPING_METHODS',params);
      },
      'checkoutData.attributes.shippingZipCode':function (val, oldVal) {
        let params = {
          params:this.checkoutData.attributes
        }
        this.$store.dispatch('eCommerce/GET_SHIPPING_METHODS', params);
      }
    },
    components:{
      Treeselect
    },
    data(){
      return{
        provinces:[],
        cities:[],
      }
    },
    methods:{
      handleOnChangeCountry(){
        let params = {
          refresh:true,
          params:{
            filter:{
              country:this.checkoutData.attributes.shippingCountry
            }
          }
        }
        this.$store.dispatch('qlocations/GET_PROVINCES',params)
        .then(response=>{
          this.provinces = this.$store.state.qlocations.provinces
        })
        .catch(error=>{
          this.$helper.alert.error(`Error ${error}`)
        })
      },
      handleOnChangeProvice(){
        let params = {
          refresh:true,
          params:{
            filter:{
              province_id:this.checkoutData.attributes.shippingZone
            }
          }
        }
        this.$store.dispatch('qlocations/GET_CITIES',params)
        .then(response=>{
          this.cities = this.$store.state.qlocations.cities
        })
        .catch(error=>{
          this.$helper.alert.error(`Error ${error}`)
        })
      }
    }
  }
</script>
