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
              :error="error.shippingFirstName.$error || false"
              error-label="Field Required ">
              <q-input
                @input="handleOnChangeInput('FirstName', checkoutData.attributes.shippingFirstName)"
                v-model="checkoutData.attributes.shippingFirstName"
                float-label="First Name"/>
            </q-field>
          </div>
          <div class="col md-6">
            <q-field
              :error="error.shippingLastName.$error || false"
              error-label="Field Required">
              <q-input
                @input="handleOnChangeInput('LastName', checkoutData.attributes.shippingLastName)"
                v-model="checkoutData.attributes.shippingLastName"
                float-label="Last Name"/>
            </q-field>
          </div>
        </div>
        
        <div class="row gutter-x-sm">
          <div class="col md-12">
            <q-field
              :error="error.shippingCompany.$error || false"
              error-label="Field Required">
              <q-input
                @input="handleOnChangeInput('Company', checkoutData.attributes.shippingCompany)"
                v-model="checkoutData.attributes.shippingCompany"
                float-label=" Company name"/>
            </q-field>
          </div>
        </div>
        
        <div class="row gutter-x-sm">
          <div class="col md-12">
            <q-field
              :error="error.shippingAddress1.$error || false"
              error-label="Field Required">
              <q-input
                @input="handleOnChangeInput('Address1', checkoutData.attributes.shippingAddress1)"
                v-model="checkoutData.attributes.shippingAddress1"
                float-label=" Address 1"/>
            </q-field>
          </div>
        </div>
        
        <div class="row gutter-x-sm">
          <div class="col md-12">
            <q-field
              :error="error.shippingAddress2.$error || false"
              error-label="Field Required">
              <q-input
                @input="handleOnChangeInput('Address2', checkoutData.attributes.shippingAddress2)"
                v-model="checkoutData.attributes.shippingAddress2"
                float-label=" Address 2"/>
            </q-field>
          </div>
        </div>

        <div class="row gutter-x-sm">
          <div class="col md-12">
            <q-field
              :error="error.shippingCountry.$error || false"
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
              :error="error.shippingZone.$error || false"
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
              :error="error.shippingCity.$error || false"
              error-label="Field Required">
              <!-- RENDER SELECT IF CITIES LENGTH > 0, ELSE RENDER INPUT FIELD-->
              <q-select
                v-if="cities.length"
                filter
                @input="handleOnChangeInput('City', checkoutData.attributes.shippingCity)"
                float-label="City"
                v-model="city"
                :options="cities"/>
              <q-input
                v-else
                @input="handleOnChangeInput('City', checkoutData.attributes.shippingCity)"
                placeholder="City"
                float-label="Type City Name"
                v-model="city.name"/>
            </q-field>
          </div>
          <div class="col md-6">
            <q-field
              :error="error.shippingZipCode.$error || false"
              error-label="Field Required">
              <q-input
                @input="handleOnChangeInput('ZipCode', checkoutData.attributes.shippingZipCode)"
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
        this.checkoutData.attributes.shippingCountry = this.country.iso_2
        this.refreshShippingMethods()
      },
      province (val, oldVal) {
        this.checkoutData.attributes.shippingZone = this.province.name
        this.refreshShippingMethods()
      },
      city (val, oldVal) {
        this.checkoutData.attributes.shippingCity = this.city.name
        this.refreshShippingMethods()
      },
      'city.name':function (val, oldVal) {
        this.checkoutData.attributes.shippingCity = this.city.name
        this.refreshShippingMethods()
      },
      'checkoutData.attributes.shippingZipCode':function (val, oldVal) {
        if (this.checkoutData.attributes.shippingZipCode.length >= 4){
          this.refreshShippingMethods()
        }
      }
    },
    components:{
      Treeselect
    },
    data(){
      return{
        countries:[],
        provinces:[],
        cities:[],
        country:{},
        province:{},
        city:{
          name:''
        },
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
          this.handleOnChangeInput('Country', checkoutData.attributes.shippingCountry)
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
          this.handleOnChangeInput('Zone', checkoutData.attributes.shippingZone)
        })
        .catch(error=>{
          this.$helper.alert.error(`Error ${error}`)
        })
      },
      handleOnChangeInput(name, value){
        if (this.checkoutData.attributes.shippingAndBillingAddressIsSame){
          let inputName = `payment${name}`
          console.warn(inputName)
          this.checkoutData.attributes[inputName] = value
        }
      },
      refreshShippingMethods(){
        let params = {
          refresh:true,
          params:{
            filter:this.checkoutData.attributes
          }
        }
        this.$store.dispatch('eCommerce/GET_SHIPPING_METHODS', params);
      },
      toFormatToQSelect(array){
        return array.map( item => ({label:item.name, value:item }) )
      }
    }
  }
</script>
