<template>
  <section>
    <div class="q-container relative-position">
      <div class="row gutter-x-sm q-my-md">
        <div class="col-xs-12 col-sm-12 col-md-3">
          <menu-categories class="widgetMenuCategories" title="· Nuestro Menú ·" />
        </div>
        <div class="col-md-9">
          <div 
            class="row gutter-x-sm"
            v-if="products.length">
            <router-link 
              tag="div" :key="index"
              v-for="(product, index) in products"
              class="col-xs-12 col-sm-12 col-md-4 text-center product"
              :to="{name:'product.show', params: { slugProduct: product.slug }}">
              <div 
                :style="`background-image: url(${product.mainImage.path});`"
                class="product-img">
                <q-btn 
                  :to="{name:'product.show', params: { slugProduct: product.slug }}"
                  label="Pedir"
                  color="primary" 
                  class="q-btn inline q-my-md btn-product"/>
              </div>
              <div class="q-mt-lg">
                <span class="q-display-1 color-baked-title">
                  {{product.name}}
                </span>
                <p class="">
                  $ {{$n(product.price)}}
                </p>
              </div>
            </router-link>
          </div>
          <div 
            class="row" 
            v-else>
            <div class="col-md-12">
              <span class="q-display-1">
                No hay productos que concuerden con la selección.
              </span>
            </div>
          </div>
          <div 
            class="row" 
            v-if="paginate.maxPages > 1">
            <div class="col-md-12 flex justify-end q-pt-xl">
              <q-pagination 
                direction-links
                @input="getProducts()"
                v-model="paginate.page" 
                :min="paginate.minPages" 
                :max="paginate.maxPages" />
            </div>
          </div>
        </div>
      </div>
      <!--Inner Loading-->
      <inner-loading :visible="visible"></inner-loading>
    </div>
  </section>
</template>

<script>
  // Services
  import icommerceService from '@imagina/qcommerce/_services/index';

  // Components
  import menuCategories from '@imagina/qcommerce/_components/frontend/categories/menu'
  import innerLoading from 'src/components/master/innerLoading'

  export default {
    components:{
      menuCategories,
      innerLoading
    },
    watch:{
      $route(to, from) {
        this.getProducts()
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.getProducts()
      })
    },
    data(){
      return{
        showProduct:false,
        visible:false,
        products:[],
        paginate:{
          page: 1,
          take:10,
          minPages: 1,
          maxPages: 0
        }
      }
    },
    methods:{
      // Get all products by category :slug
      getProducts(){
        this.visible = true
        let params = {
          params:{
            filter:{
              categorySlug:this.$route.params.slugCategory,
              locale:'es'
            },
            include:'productOptions,optionValues',
            take:this.paginate.take,
            page:this.paginate.page,
          }
        }
        icommerceService.crud
        .index('apiRoutes.eCommerce.products',params)
        .then(response=>{
          this.paginate.maxPages = response.meta.page.lastPage
          this.products = response.data
          this.visible = false
        })
        .catch(error=>{
          this.$helper.alert.error('Failed: ' + error, 'bottom')
          this.visible = false
        })
      }
    }
  }

</script>

<style scoped lang="stylus">
  
  @import "~variables";
  
  div.product
    cursor pointer

  .product-img
    background-position: center; 
    background-repeat: no-repeat; 
    background-size: cover;
    width: 100%
    height 260px
    border: 1px solid #dddddd52
    border-radius 10px
  
  .btn-product
    margin-top 240px

  .color-secondary
    color: $secondary

  .color-primary
    color: $secondary

</style>