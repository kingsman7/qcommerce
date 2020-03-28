<template>
  <div class="row">
    <div class="col-xs-12">
      <q-card class="my-card no-shadow card-product">
        <q-img
          class="cursor-pointer	"
          @click="goToProduct(product)"
          spinner-color="white"
          :ratio="1"
          transition="flip-left"
          :src="product.mainImage.path"
          basic >
        </q-img>
        <q-card-actions class="row">
          <div class="col-md-12 flex flex-center text-subtitle1">
            <q-btn dense flat rounded>
              {{product.name}}
            </q-btn>
          </div>
          <div class="col-md-12 flex flex-center text-subtitle1 text-bold text-primary">
            $ {{$trc(product.price)}}
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      product:{
        type: Object,
        required: true,
        default: () => {}
      }
    },
    methods:{
      goToProduct(product){
        console.warn(product)
      }
    }
  }
</script>

<style>

</style>