<template>
  <div id="menuCategoriesComponent">
    <div class="relative-position content">
      <!--Categories desktop-->
      <div class="q-hide q-sm-show q-pt-sm bg-white">
        <!--Title-->
        <div class="title-menu text-h6 q-mb-sm text-primary q-pl-sm">
          <q-icon v-if="icon" :name="icon" color="primary" size="17px" class="q-mr-sm"/>
          <label v-if="title">{{title}}</label>
        </div>
        <!--Recursive list-->
        <recursive-item class="text-left" :translatable="false" :menu="menuCategories"/>
      </div>

      <!--Categories Mobile-->
      <div class="q-sm-hide">
        <!--Button open modal-->
        <q-btn :label="title" :icon="icon || ''" @click="modal.show = true"
               class="no-shadow" color="primary"/>
        <!--Categorries modal-->
        <q-dialog v-model="modal.show" class="q-sm-hide" maximized>
          <q-card>
            <!--Header-->
            <q-toolbar class="bg-primary text-white">
              <q-toolbar-title v-if="title">
                {{title}}
              </q-toolbar-title>
              <q-btn flat v-close-popup icon="fas fa-times"/>
            </q-toolbar>

            <!--Recursive list-->
            <div class="layout-padding">
              <recursive-item :translatable="false" :menu="menuCategories"/>
            </div>
          </q-card>
        </q-dialog>
      </div>

      <!--Loading-->
      <inner-loading :visible="loading"/>
    </div>
  </div>
</template>
<script>
  //Components
  import recursiveItem from 'src/components/master/recursiveItem'
  //Services
  import commerceServices from '@imagina/qcommerce/_services/index'

  export default {
    props: {
      title: {default: 'Categories'},
      icon: {default: false},
    },
    components: {recursiveItem},
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
          console.error('Error getting categories', error)
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
        this.menuCategories = recursiveMenu(this.$array.builTree(categories))
      },
    }
  }
</script>
<style lang="stylus">
</style>
