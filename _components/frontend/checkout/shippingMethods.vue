<template>
  <div>
    <div class="row shadow-1">
      <div class="col-md-12 flex flex-center">
        <h1 class="q-headline text-primary ">
          <q-chip color="primary">5</q-chip>
          {{title}}
        </h1>
      </div>
      <div class="col-md-12 q-my-sm q-mx-sm">
        <q-field
          v-for="(shippingMethod, index) in $store.state.eCommerce.shippingMethods"
          :key="index">
          <q-radio
            v-model="shipping"
            :val="shippingMethod"
            :label="`${shippingMethod.title}`" />
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
        default:()=>{}
      },
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
