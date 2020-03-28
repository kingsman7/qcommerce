<template>
  <div class="row relative-position q-col-gutter-md q-col-gutter-y-md">
    
    <infoProduct
      class="col-md-3"
      :product="product"
      :key="index"
      v-for="(product, index) in products.data"
    />
    
    <inner-loading
      :visible="products.loading"/>
  </div>
</template>

<script>
  import infoProduct from '@imagina/qcommerce/_components/frontend/products/infoProduct'
  export default {
    components:{
      infoProduct
    },
    data () {
      return {
        products:{
          loading: false,
          data: []
        },
        status:{
          activate: 1
        }
      }
    },
    watch: {
      '$route.params.slugCategory': function (val) {
        this.$nextTick( () => {
          this.getProducts()
        })
      }
    },
    created() {
      this.$nextTick( () => {
        this.getProducts()
      })
    },
    methods:{
      getProducts(){
        let params = {
          params:{
            filter: {
              status: this.status.activate,
              categorySlug: this.$route.params.slugCategory
            }
          }
        }
        this.products.loading = true
        this.$crud.index('apiRoutes.qcommerce.products',params).then( ({data}) => {
          this.products.data = data
          this.products.loading = false
        }).catch( error => {
          this.$helper.alert.error('Failed: ' + error, 'bottom')
          this.products.loading = false
        })
      }
    }
  }
</script>