<template>
  <div>
    <div class="row shadow-1">
      <div class="col-xs-12 col-md-12 flex flex-center">
        <h1 class="q-headline text-primary">
          <q-chip color="primary">2</q-chip>
          {{title}}
        </h1>
      </div>
      <div class="col-xs-12 col-md-12 q-px-md">
        <q-item-separator />
        
        <div class="row gutter-x-sm" v-if="$store.state.auth.userData || false">
          <div class="col-xs-12  col-md-12">
            
            <q-field
              :error="false"
              error-label="Field Required">
              <q-select
                @input="changeAddressInSelect()"
                filter
                float-label="Addresses"
                v-model="addressInSelect"
                :options="toFormatToQSelect($store.state.auth.userData.addresses)"/>
            </q-field>
          </div>
        </div>
        
        <div v-show="!$store.state.auth.userData">
          <div class="row gutter-x-sm" >
            <div class="col md-6">
              <q-field
                :error="error.shippingFirstName.$error || false"
                error-label="Field Required ">
                <q-input
                  v-model="checkoutData.attributes.shippingFirstName"
                  float-label="First Name"/>
              </q-field>
            </div>
            <div class="col md-6">
              <q-field
                :error="error.shippingLastName.$error || false"
                error-label="Field Required">
                <q-input
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
                :error="error.shippingZipCode.$error || false"
                error-label="Field Required">
                <q-input
                  v-model="checkoutData.attributes.shippingZipCode"
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
          },
          shippingAndBillingAddressIsSame: true,
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
        addressInSelect:'',
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
      refreshShippingMethods(){
        let params = {
          refresh:true,
          params:{
            filter:this.checkoutData.attributes
          }
        }
        this.$store.dispatch('eCommerce/GET_SHIPPING_METHODS', params);
      },
      changeAddressInSelect(){
        this.checkoutData.attributes.shippingFirstName = this.addressInSelect.firstName || 'Default Value'
        this.checkoutData.attributes.shippingLastName = this.addressInSelect.lastName || 'Default Value'
        this.checkoutData.attributes.shippingCompany = this.addressInSelect.shippingCompany || 'Default Value'
        this.checkoutData.attributes.shippingAddress1 = this.addressInSelect.address1 || 'Default Value'
        this.checkoutData.attributes.shippingAddress2 = this.addressInSelect.address2 || 'Default Value'
        this.checkoutData.attributes.shippingCountry = this.addressInSelect.country || 'Default Value'
        this.checkoutData.attributes.shippingZone = this.addressInSelect.state || 'Default Value'
        this.checkoutData.attributes.shippingCity = this.addressInSelect.city || 'Default Value'
        this.checkoutData.attributes.shippingZipCode = this.addressInSelect.zipCode || 'Default Value'
        // Get All Shipping Methods in new Data
        this.refreshShippingMethods()
      },
      toFormatToQSelect(array){
        return array.map( item => ({label:item.name || `${item.firstName} ${item.lastName} - ${item.city} ${item.state} ${item.address1}`, value:item }) )
      }
    }
  }
</script>
