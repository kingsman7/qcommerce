<template>
  <div>
    <div class="row shadow-1">
      <div class="col-md-12 flex flex-center">
        <h1 class="q-headline text-primary ">
          <q-chip color="primary">4</q-chip>
          {{title}}
        </h1>
      </div>
      <div class="col-md-12 q-my-sm q-px-sm">
        <q-item-separator />
        <q-field
          :error="error.shippingMethod.$error"
          error-label="* Payment Method Required">
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
                
                <div  v-if="shippingMethod.calculations.priceshow || false">
                  ${{$n(shippingMethod.calculations.price)}}
                </div>
  
                <div v-if="shippingMethod.calculations.msj!=='error' && shippingMethod.calculations.msj!=='freeshipping'">
                  <pre>{{shippingMethod.calculations.items}}</pre>
  
                  <div
                    :key="index"
                    v-for="(item, index) in shippingMethod.calculations.items">
                    {{item}}
                  </div>
                  
                </div>
                
                <div v-if="shippingMethod.calculations.status == 'error'">
                  <span class="text-warning">
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
              :image="shippingMethod.mainImage.path" />
          </q-item>
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
        shipping:''
      }
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
