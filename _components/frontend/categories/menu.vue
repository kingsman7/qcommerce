<template>
  <div id="menuCategoriesComponent">
    <div class="relative-position content">
      <!--Title-->
      <div class="title-menu q-title q-mb-sm">{{title}}</div>
      <!--Recursive list-->
      <recursive-item id="menuList" :menu="menuCategories" />
      <!--Loading-->
      <inner-loading :visible="loading" />
    </div>
  </div>
</template>
<script>
  //Components
  import recursiveItem from 'src/components/master/recursiveItem'
  import innerLoading from 'src/components/master/innerLoading'
  //Services
  import commerceServices from '@imagina/qcommerce/_services/index'

  export default {
    props: {
      title : {default : 'Categories'}
    },
    components: {recursiveItem, innerLoading},
    watch: {},
    mounted() {
      this.$nextTick(function () {
        this.getCategories()
      })
    },
    data() {
      return {
        loading: false,
        menuCategories: []
      }
    },
    methods: {
      //Get categories
      getCategories() {
        this.loading = true
        let params = {refresh: false, params: {}}
        //Request
        commerceServices.crud.index('apiRoutes.eCommerce.categories', params).then(response => {
          this.orderCategoriesToMenu(response.data)
          this.loading = false
        }).catch(error => {
          console.warn('Error getting categories',error)
          this.loading = false
        })
      },
      //Order categories to menu
      orderCategoriesToMenu(categories) {
        const recursiveMenu = (items) => {
          let menu = []
          items.forEach((item) => {
            let data = {
              title: item.title ? item.title : item.label,
              name: 'products.index',
              params: {slugCategory: item.slug},
              permission: item.showMenu ? null : 'no.show.item',
              activated: true
            }
            //cHeck childrens
            if (item.children) data.children = recursiveMenu(item.children)
            menu.push(data)//Add to data menu
          })
          
          return menu//Return response
        }
        this.menuCategories = recursiveMenu(this.$helper.array.builTree(categories))
      },
    }
  }
</script>
<style lang="stylus">
  @import "~variables";
  #menuCategoriesComponent
    #menuList
      .q-item
        &:hover
          cursor: pointer;
</style>
