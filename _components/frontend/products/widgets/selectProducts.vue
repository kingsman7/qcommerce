<template>
  <div id="widgetSelectProducts">
    <treeselect
      v-model="productSlug"
      :options="products"
      :clearable="false"
      placeholder=""
      :style="'width: '+width+' !important'"
      @input="$emit('input',productSlug)"
    />
    <q-progress v-if="loading" indeterminate color="primary" height="2px"/>
  </div>
</template>
<script>
  //components
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  // Services
  import commerceServices from '@imagina/qcommerce/_services/index';

  export default {
    props: {
      value : {default: false},
      categoryId: {default: false},
      width : {default: 'auto'}
    },
    components: {Treeselect},
    watch: {},
    mounted() {
      this.$nextTick(function () {
        this.productSlug = this.value
        this.getData()
      })
    },
    data() {
      return {
        loading: false,
        products: [],
        productSlug: null
      }
    },
    methods: {
      //Get data
      getData(refresh = false) {
        if (this.categoryId) {
          this.loading = true
          let params = {
            refresh: refresh,
            params: {filter: {categoryId: this.categoryId}}
          }
          //Request
          commerceServices.crud.index('apiRoutes.eCommerce.products', params).then(response => {
            this.products = this.$helper.array.tree(response.data, {label: 'name', id: 'slug'})
            this.loading = false
          }).catch(error => {
            console.error('[select-product-widget] Error getting products by category', error)
            this.loading = false
          })
        }
      },
      //Method to refresh data
      vRefresh() {
        this.getData(true)
      }
    }
  }
</script>
<style lang="stylus">
  @import "~variables";
  #widgetSelectProducts
    display: inline-block
    min-height 40px !important
</style>