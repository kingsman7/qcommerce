<template>
  <div>
    <div class="row shadow-1">
      <div class="col-xs-12 col-md-12 flex flex-center">
        <h1 class="q-headline text-primary ">
          <q-chip color="primary">3</q-chip>
          {{title}}
        </h1>
      </div>
      <div class="col-xs-12 col-md-12 col-md-12 q-px-md">
        <q-item-separator />
        <div class="row gutter-x-sm">
          <div class="col md-6 q-pb-lg">
            <q-checkbox
              v-model="checkoutData.shippingAndBillingAddressIsSame"
              label="My shipping and billing addresses are the same." />
          </div>
        </div>
  
        <div v-if="!checkoutData.shippingAndBillingAddressIsSame">
  
          <div class="row gutter-x-sm" v-if="$store.state.auth.userData || false">
            <div class="col md-12">
              <q-field
                :error="false"
                error-label="Field Required">
                <q-select
                  filter
                  float-label="Addresses"
                  v-model="modelTest"
                  :options="toFormatToQSelect($store.state.auth.userData.addresses)"/>
              </q-field>
            </div>
          </div>
  
          <div v-show="!$store.state.auth.userData">
  
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
                  error-label="Field Required">
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
                  error-label="Field Required">
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
                  error-label="Field Required">
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
                  error-label="Field Required">
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
                  error-label="Field Required">
                  <q-select
                    @input="getProvinces()"
                    filter
                    float-label="Country"
                    v-model="country"
                    :options="countries"/>
                </q-field>
              </div>
            </div>
  
            <div class="row gutter-x-sm">
              <div class="col md-12">
                <q-field
                  :error="error.paymentZone.$error || false"
                  error-label="Field Required">
                  <q-select
                    @input="getCities()"
                    filter
                    float-label="State/Province"
                    v-model="province"
                    :options="provinces"/>
                </q-field>
              </div>
            </div>
  
            <div class="row gutter-x-sm">
              <div class="col md-6">
                <q-field
                  :error="error.paymentCity.$error || false"
                  error-label="Field Required">
                  <!-- RENDER SELECT IF CITIES LENGTH > 0, ELSE RENDER INPUT FIELD-->
                  <q-select
                    v-if="cities.length"
                    filter
                    float-label="City"
                    v-model="city"
                    :options="cities"/>
                  <q-input
                    v-else
                    placeholder="City"
                    float-label="Type City Name"
                    v-model="city.name"/>
                </q-field>
              </div>
              <div class="col md-6">
                <q-field
                  :error="error.paymentZipCode.$error || false"
                  error-label="Field Required">
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
  </div>
</template>

<script>
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
            shippingZone: '',
            shippingAndBillingAddressIsSame: true,
          }
        })
      },
      error:{
        type:Object,
        default:()=>{}
      }
    },
    watch:{
      country (val, oldVal) {
        this.checkoutData.attributes.paymentCountry = this.country.iso_2
      },
      province (val, oldVal) {
        this.checkoutData.attributes.paymentZone = this.province.name
      },
      city (val, oldVal) {
        this.checkoutData.attributes.paymentCity = this.city.name
      },
      'city.name':function (val, oldVal) {
        this.checkoutData.attributes.paymentCity = this.city.name
      },
    },
    components:{

    },
    data(){
      return{
        shippingBillingIsSame: true,
        countries:[],
        provinces:[],
        cities:[],
        country:{},
        province:{},
        city:{
          name:''
        },
        modelTest: '',
      }
    },
    created(){
      this.getCountries()
    },
    methods:{
      getCountries(){
        this.countries = this.toFormatToQSelect(this.$store.state.qlocations.countries)
      },
      getProvinces(){
        let params = {
          refresh:true,
          params:{
            filter:{
              country:this.country.id
            }
          }
        }
        this.$store.dispatch('qlocations/GET_PROVINCES',params)
          .then(response=>{
            this.provinces = this.toFormatToQSelect(this.$store.state.qlocations.provinces)
          })
          .catch(error=>{
            this.$helper.alert.error(`Error ${error}`)
          })
      },
      getCities(){
        let params = {
          refresh:true,
          params:{
            filter:{
              province_id:this.province.id
            }
          }
        }
        this.$store.dispatch('qlocations/GET_CITIES',params)
          .then(response=>{
            this.cities = this.toFormatToQSelect(this.$store.state.qlocations.cities)
          })
          .catch(error=>{
            this.$helper.alert.error(`Error ${error}`)
          })
      },
      toFormatToQSelect(array){
        return array.map( item => ({label:item.name, value:item }) )
      }
    }
  }
</script>
