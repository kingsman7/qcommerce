<template>
  <q-page-container>
    <div class="row q-ma-xl q-col-gutter-md">
      <div class="col-md-3">
        <menuCategories />
      </div>
      <div class="col-md-9">
        <div class="row">
          <div class="col-md-12">
          </div>
          <div class="col-md-12">
            <containerProducts />
          </div>
        </div>
      </div>
    </div>
  </q-page-container>
</template>

<script>
    import menuCategories from '@imagina/qcommerce/_components/frontend/categories/menu'
    import containerProducts from '@imagina/qcommerce/_components/frontend/products/containerProducts'
    
    export default {
      name: 'PageIndex',
      components:{
        menuCategories,
        containerProducts
      },

      data () {
        return {
        
        }
      }
    }
</script>

<style lang="stylus">

</style>