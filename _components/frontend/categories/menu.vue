<template>
  <div id="menuCategoriesComponent">
    <div class="relative-position content">
      <!--Categories desktop-->
      <div class="q-hide q-sm-show q-pt-sm bg-white">
        <!--Title-->
        <div class="title-menu q-title q-mb-sm text-primary q-pl-sm">
          <q-icon v-if="icon" :name="icon" color="primary" size="17px" class="q-mr-sm"/>
          <span v-if="title">{{title}}</span>
        </div>
        <!--Recursive list-->
        <recursive-item :translatable="false" id="menuList" :menu="menuCategories"/>
      </div>

      <!--Categories Mobile-->
      <div class="q-sm-hide">
        <!--Button open modal-->
        <q-btn :label="title" :icon="icon || ''" @click="modal.show = true"
               class="no-shadow" color="primary"/>
        <!--Categorries modal-->
        <q-modal v-model="modal.show" class="q-md-hide" maximized>
          <q-modal-layout>
            <!--Header-->
            <q-toolbar slot="header">
              <q-btn flat round dense v-close-overlay
                     icon="keyboard_arrow_left"/>
              <q-toolbar-title v-if="title">
                {{title}}
              </q-toolbar-title>
            </q-toolbar>

            <!--Recursive list-->
            <div class="layout-padding">
              <recursive-item :translatable="false" id="menuList" :menu="menuCategories"/>
            </div>
          </q-modal-layout>
        </q-modal>
      </div>

      <!--Loading-->
      <inner-loading :visible="loading"/>
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
      title: {default: 'Categories'},
      icon: {default: false},
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
        menuCategories: [],
        modal: {
          show: false
        }
      }
    },
    methods: {
      //Get categories
      getCategories() {
        this.loading = true
        let params = {refresh: false, params: {}}
        //Request
        commerceServices.crud.index('apiRoutes.qcommerce.categories', params).then(response => {
          this.orderCategoriesToMenu(response.data)
          this.loading = false
        }).catch(error => {
          console.warn('Error getting categories', error)
          this.loading = false
        })
      },
      //Order categories to menu
      orderCategoriesToMenu(categories) {
        const recursiveMenu = (items) => {
          //Default list
          let menu = [
            {
              title: this.$tr('ui.label.all'),
              name: 'products.index',
              permission: null,
              activated: true
            }
          ]

          items.forEach((item) => {
            let data = {
              title: item.title ? item.title : item.label,
              name: 'products.index.by.category',
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
