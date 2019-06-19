<template>
  <div>
    <div class="row shadow-1">
      <div class="col-md-12 flex flex-center">
        <h1 class="q-headline text-primary ">
          <q-chip color="primary">5</q-chip>
          {{title}}
        </h1>
      </div>
      <div class="col-md-12 q-my-sm q-px-sm">
        <q-item-separator />
        <q-field
          :error="error.paymentMethod.$error"
          error-label="Payment Method Required">
          <q-item separator dense
            tag="label"
            v-for="(paymentMethod, index) in $store.state.eCommerce.paymentMethods"
            :key="index">
            <q-item-side>
              <q-radio
                style="display: block"
                v-model="payment"
                :val="paymentMethod"/>
            </q-item-side>
            <q-item-main>
              <q-item-tile label>
                {{paymentMethod.title}}
              </q-item-tile>
              <q-item-tile sublabel>
                {{paymentMethod.description}}
              </q-item-tile>
            </q-item-main>
            <q-item-side :image="paymentMethod.mainImage.path" />
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
        default:'Payment Methods'
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
    watch:{
      payment(val){
        this.checkoutData.attributes.paymentMethod = this.payment.name
        this.checkoutData.attributes.paymentMethodId = this.payment.id
      }
    },
    data(){
      return{
        loading:false,
        payment:''
      }
    },
  }
</script>

<style scoped>
</style>
