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
            <q-checkbox
              v-model="shippingBillingIsSame"
              label="My shipping and billing addresses are the same." />
          </div>
        </div>
        
        <div v-if="!shippingBillingIsSame">
          
          <div class="row gutter-x-sm">
            <div class="col md-6">
              <q-field
                :error="error.paymentFirstName.$error || false"
                error-label="Field Required ">
                <q-input
                  v-model="checkoutData.attributes.paymentFirstName"
                  float-label="First Name"/>
              </q-field>
            </div>
            <div class="col md-6">
              <q-field
                :error="error.paymentLastName.$error || false"
                error-label="Field Required ">
                <q-input
                  v-model="checkoutData.attributes.paymentLastName"
                  float-label="Last Name"/>
              </q-field>
            </div>
          </div>
          
          <div class="row gutter-x-sm">
            <div class="col md-12">
              <q-field
                :error="error.paymentCompany.$error || false"
                error-label="Field Required ">
                <q-input
                  v-model="checkoutData.attributes.paymentCompany"
                  float-label=" Company name"/>
              </q-field>
            </div>
          </div>
  
          <div class="row gutter-x-sm">
            <div class="col md-12">
              <q-field
                :error="error.paymentAddress1.$error || false"
                error-label="Field Required ">
                <q-input
                  v-model="checkoutData.attributes.paymentAddress1"
                  float-label=" Address 1"/>
              </q-field>
            </div>
          </div>
  
          <div class="row gutter-x-sm">
            <div class="col md-12">
              <q-field
                :error="error.paymentAddress2.$error || false"
                error-label="Field Required ">
                <q-input
                  v-model="checkoutData.attributes.paymentAddress2"
                  float-label=" Address 2"/>
              </q-field>
            </div>
          </div>
  
          <div class="row gutter-x-sm">
            <div class="col md-12">
              <q-field
                :error="error.paymentCountry.$error || false"
                error-label="Field Required ">
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
                :error="error.paymentZone.$error || false"
                error-label="Field Required ">
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
                :error="error.paymentCity.$error || false"
                error-label="Field Required ">
                <q-select
                  filter
                  float-label="City"
                  v-model="checkoutData.attributes.paymentCity"
                  :options="cities"/>
              </q-field>
            </div>
            <div class="col md-6">
              <q-field
                :error="error.paymentZipCode.$error || false"
                error-label="Field Required ">
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
      },
      error:{
        type:Object,
        default:()=>{}
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
    watch:{
      shippingBillingIsSame(val, oldVal){
        if(this.shippingBillingIsSame){
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
