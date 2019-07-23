<template>
  <div>
    <div class="row shadow-1">
      <div class="col-xs-12 col-md-12 flex flex-center">
        <h1 class="q-headline text-primary ">
          <q-chip color="primary">4</q-chip>
          {{title}}
        </h1>
      </div>
      <div class="col-xs-12 col-md-12 q-my-sm q-px-sm relative-position">
        <q-item-separator />
        
        <q-field
          :error="error.shippingMethod.$error"
          error-label="Shipping Method Required">
          <q-item
            separator dense
            tag="label"
            v-for="(shippingMethod, index) in $store.state.eCommerce.shippingMethods"
            :key="index">
            <q-item-side>
              <q-radio
                v-if="shippingMethod.calculations.price !== null && shippingMethod.calculations.price >= 0"
                style="display: block"
                v-model="shipping"
                :val="shippingMethod"/>
            </q-item-side>
            <q-item-main>
              <q-item-tile label>
                {{shippingMethod.title}}
              </q-item-tile>
              <q-item-tile sublabel>
                
                <div v-if="shippingMethod.calculations.msj!=='error' && shippingMethod.calculations.msj!=='freeshipping'">
                  
                  <div v-if="shippingMethod.calculations.items">
                    <q-item
                      v-if="shippingMethod.calculations.items"
                      separator dense
                      tag="label"
                      v-for="(item, index) in formatItemsForShippingMethod(shippingMethod.calculations.items, shippingMethod.id)"
                      :key="index">
                      <q-item-side>
                        <q-radio
                          style="display: block"
                          v-model="shipping"
                          :val="item"/>
                      </q-item-side>
                      <q-item-main>
                        <q-item-tile label>
                          {{item.configTitle}}
                        </q-item-tile>
                        <q-item-tile sublabel>
                          {{item.price}}
                        </q-item-tile>
                      </q-item-main>
                    </q-item>
                  </div>
                  
                </div>
                
                <div v-if="shippingMethod.calculations.status == 'error'">
                  <span class="text-negative">
                    {{shippingMethod.calculations.msj}}
                  </span>
                </div>
                
                <div v-if="shippingMethod.calculations.errors">
                  <span class="text-warning">
                    {{shippingMethod.calculations.errors}}
                  </span>
                </div>
                
              </q-item-tile>
            </q-item-main>
            <q-item-side
              v-if="(shippingMethod.mainImage.path).indexOf('default.jpg') == -1 ? true : true"
              :avatar="shippingMethod.mainImage.path" />
          </q-item>
        </q-field>
        <inner-loading :visible="loading" />
      </div>
    </div>
  </div>
</template>

<script>
  import innerLoading from 'src/components/master/innerLoading'
  export default {
    components:{
      innerLoading
    },
    props:{
      title:{
        type:String,
        default:'Shipping Methods'
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
            shippingMethodPrice: 0,
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
    watch:{
      shipping(val){
        this.checkoutData.attributes.shippingMethod = this.shipping.name
        this.checkoutData.attributes.shippingMethodId = this.shipping.id
         this.checkoutData.attributes.shippingMethodPrice = this.shipping.price || 0
      },
      '$store.state.eCommerce.shippingMethods': function () {
        this.loading = true
        
        setTimeout(()=>{
          this.loading = false
        
        },1000)
      }
    },
    data(){
      return{
        loading:false,
        shipping:'',
        shippingUPS:'',
      }
    },
    methods:{
      formatItemsForShippingMethod(shippingMethods, parent = 0){
        return shippingMethods.map( shippingMethod => {
          let data =shippingMethod
          data.name = shippingMethod.configName
          data.id = parent
          data.price = shippingMethod.price
          return data
        })
      },
    }
  }
</script>

<style scoped>

</style>
