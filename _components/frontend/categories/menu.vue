<template>
  <div class="row relative-position" style="min-height: 400px">
    <div class="col-xs-12">
      <q-item class="bg-primary text-white">
        <q-item-section avatar>
          <q-icon name="dehaze" />
        </q-item-section>
        <q-item-section>
          <div class="text-bold	text-subtitle1 q-ml-sm">
            {{ $tr('qcommerce.layout.form.categories') | upperCase}}
          </div>
        </q-item-section>
      </q-item>
      <menuItems
        :items="categories.data"/>
    </div>
    <inner-loading
      :visible="categories.loading"/>
  </div>
</template>

<script>
  import menuItems from '@imagina/qcommerce/_components/frontend/categories/menuItems'
  export default {
    components:{
        menuItems
    },
    data() {
      return{
        categories: {
          loading: false,
          data: []
        }
      }
    },
    filters:{
      upperCase: function (value){
        return value.toUpperCase()
      }
    },
    created() {
      this.$nextTick( () => {
        this.getCategories()
      })
    },
    methods:{
      getCategories () {
        let params = {}
        this.categories.loading = true
        this.$crud.index('apiRoutes.qcommerce.categories', params).then(({ data }) => {
          this.categories.data = this.$array.builTree(data)
          this.categories.loading = false
        }).catch( error => {
          this.$helper.alert.error('Failed: ' + error, 'bottom')
          this.categories.loading = false
        })
      }
    }
  }
</script>