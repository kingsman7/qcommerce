<template>
  <div>
    <div class="row shadow-1">
      <div class="col-md-12 flex flex-center">
        <h1 class="q-headline text-primary ">
          <q-chip color="primary">3</q-chip>
          {{title}}
        </h1>
      </div>
      <div class="col-md-12 q-px-md">
  
        <div class="row gutter-x-sm">
          <div class="col md-6 q-pb-lg">
            <q-checkbox v-model="shippingBillingIsSame" label="My shipping and billing addresses are the same." />
          </div>
        </div>
        
        <div v-if="!shippingBillingIsSame">
          
          <div class="row gutter-x-sm">
            <div class="col md-6">
              <q-field
                :error="false"
                error-label="We need a valid email">
                <q-input
                  v-model="checkoutData.attributes.paymentFirstName"
                  float-label="First Name"/>
              </q-field>
            </div>
            <div class="col md-6">
              <q-field
                :error="false"
                error-label="We need a valid email">
                <q-input
                  v-model="checkoutData.attributes.paymentLastName"
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
                  v-model="checkoutData.attributes.paymentCompany"
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
                  v-model="checkoutData.attributes.paymentAddress1"
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
                  v-model="checkoutData.attributes.paymentAddress2"
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
                  v-model="checkoutData.attributes.paymentCountry"
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
                  v-model="checkoutData.attributes.paymentZone"
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
                  v-model="checkoutData.attributes.paymentCity"
                  :options="cities"/>
              </q-field>
            </div>
            <div class="col md-6">
              <q-field
                :error="false"
                error-label="We need a valid email">
                <q-input
                  v-model="checkoutData.attributes.paymentZipCode"
                  float-label="Zip/Postal code"/>
              </q-field>
            </div>
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
        default:'Billing Address'
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
    components:{
      Treeselect
    },
    data(){
      return{
        shippingBillingIsSame: true,
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
              country:this.checkoutData.attributes.paymentCountry
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
              province_id:this.checkoutData.attributes.paymentZone
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
