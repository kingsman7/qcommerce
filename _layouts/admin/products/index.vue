<template>
  <div id="productIndexPage" class="q-layout-page layout-padding">

    <!--TITLE-->
    <h1 class="q-headline text-primary">
      <q-icon name="fas fa-boxes"></q-icon>
      Product List
    </h1>

    <!--Content-->
    <div class="relative-position backend-page">
      <!--Table-->
      <div class="col-12">
        <q-table
          :data="table.data"
          :columns="table.columns"
          :pagination.sync="table.pagination"
          @request="getdata"
          :filter="table.filter"
          class="shadow-1 border-top-color"
        >
          <!--Header Table-->
          <template slot="top" slot-scope="props">
            <div class="row full-width">
              <!--Search-->
              <div class="col-12 col-md-6 q-mt-sm">
                <div class="col-12 col-md-6">
                  <q-search hide-underline clearable v-model="table.filter.search"
                            @input="getDataTable"/>
                </div>
              </div>
              <!--Button Actions-->
              <div class="col-12 col-md-6 q-mt-sm text-right">
                <!--Button new record-->
                <q-btn icon="fas fa-edit" color="positive" label="New Product"
                       v-if="$auth.hasAccess('icommerce.products.create')"
                       :to="{name: 'ecommerce.products.create'}" rounded />
                <!--Button refresh data-->
                <q-btn icon="fas fa-sync-alt" color="info" class="q-ml-xs"
                       @click="getDataTable(true)" rounded>
                  <q-tooltip :delay="300">Refresh Data</q-tooltip>
                </q-btn>
              </div>
              <!--Filters-->
              <div class="col-12 q-mt-sm">
                <!--By category-->
                <div class="cont-vue-tree">
                  <div class="stack-label float-left">Category:</div>
                  <treeselect
                    :clearable="false"
                    :options="table.options.categories"
                    @input="getDataTable(true)"
                    value-consists-of="BRANCH_PRIORITY"
                    v-model="table.filters.categoryId"
                    placeholder=""
                  />
                </div>
                <!--By Status-->
                <div class="cont-vue-tree">
                  <div class="stack-label float-left">Status:</div>
                  <treeselect
                    :clearable="false"
                    :options="table.options.status"
                    @input="getDataTable(true)"
                    value-consists-of="BRANCH_PRIORITY"
                    v-model="table.filters.status"
                    placeholder=""
                  />
                </div>
                <!--By Stock Status-->
                <div class="cont-vue-tree">
                  <div class="stack-label float-left">Stock Status:</div>
                  <treeselect
                    :clearable="false"
                    :options="table.options.stockStatus"
                    @input="getDataTable(true)"
                    value-consists-of="BRANCH_PRIORITY"
                    v-model="table.filters.stockStatus"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </template>

          <!--= Custom Columns =-->
          <q-td slot="body-cell-actions" slot-scope="props" :props="props">
            <!--Edit button-->
            <q-btn color="positive" icon="fas fa-pen" size="sm" rounded
                   v-if="$auth.hasAccess('icommerce.products.edit')"
                   :to="{name : 'ecommerce.products.edit' , params : {id : props.row.id}}">
              <q-tooltip :delay="300">Edit</q-tooltip>
            </q-btn>
            <!--Delete button-->
            <q-btn color="negative" icon="fas fa-trash-alt" size="sm" rounded
                   v-if="$auth.hasAccess('icommerce.products.destroy')"
                   @click="deleteItem(props.row)" class="q-ml-xs">
              <q-tooltip :delay="300">Delete</q-tooltip>
            </q-btn>
          </q-td>
        </q-table>
      </div>

      <!--Loading-->
      <inner-loading :visible="loading" />
    </div>
  </div>
</template>

<script>
  //Services
  import commerceServices from '@imagina/qcommerce/_services/index';
  //Component
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import innerLoading from 'src/components/master/innerLoading'

  export default {
    components: {
      Treeselect,
      innerLoading
    },
    mounted() {
      this.$nextTick(function () {
        this.getDataTable()
        this.getCategories()
      })
    },
    data() {
      return {
        table: {
          data: [],
          columns: [
            {name: 'id', label: 'ID', field: 'id', style: 'width: 50px'},
            {name: 'name', label: 'Title', field: 'name', style: 'width: 50px', align: 'rigth'},
            {name: 'sku', label: 'Sku', field: 'sku', align: 'left'},
            {
              name: 'category', label: 'Category', field: 'category', align: 'left',
              format: val => (val && val.title) ? val.title : ''
            },
            {
              name: 'status', label: 'Status', field: 'status', align: 'left',
              format: val => val ? 'Enabled' : 'Disabled'
            },
            {
              name: 'Stock', label: 'Stock', field: 'stockStatus', align: 'left',
              format : val => val ? 'In Stock' : 'Out Stock'
            },
            {name: 'slug', label: 'Slug', field: 'slug', align: 'left'},
            {
              name: 'price', label: 'Price', field: 'price', align: 'left',
              format: val => this.$n(val, 'currency', this.$q.i18n.lang)
            },
            {
              name: 'createdAt', label: 'Creation Date', field: 'createdAt', align: 'left',
              format: val => val ? this.$d(this.$moment(val, 'YYYY-MM-DD HH:mm').toDate(), 'short', this.$q.i18n.lang) : '-',
            },
            {name: 'actions', label: 'Actions', align: 'left'},
          ],
          pagination: {
            page: 1,
            rowsNumber: '',
            rowsPerPage: 10
          },
          filter: {
            search: null
          },
          filters: {
            categoryId: 0,
            status: 1,
            stockStatus: 1
          },
          options: {
            categories: [],
            status: [
              {label: 'Enabled', id: 1},
              {label: 'Disable', id: 0}
            ],
            stockStatus: [
              {label: 'In Stock', id: 1},
              {label: 'Out Stock', id: 0}
            ]
          }
        },
        loading: false,
      }
    },
    methods: {
      //Request products with params from server table
      getDataTable(refresh = false) {
        this.getdata({pagination: this.table.pagination}, refresh)
      },
      //Get products
      getdata({pagination, filter}, refresh = false) {
        this.loading = true
        //Params to request
        let params = {
          refresh: refresh,
          params: {
            include: 'category',
            filter: Object.assign({}, this.table.filter, this.table.filters),
            page: pagination.page,
            take: pagination.rowsPerPage,
          }
        }

        //Request
        commerceServices.crud.index('apiRoutes.eCommerce.products', params).then(response => {
          this.table.data = response.data
          this.table.pagination.page = response.meta.page.currentPage
          this.table.pagination.rowsNumber = response.meta.page.total
          this.table.pagination.rowsPerPage = pagination.rowsPerPage
          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$helper.alert.error('Failed: ' + error, 'bottom')
        })
      },
      //Get product categories
      getCategories() {
        return new Promise((resolve, reject) => {
          let configName = 'apiRoutes.eCommerce.categories'
          let params = {//Params to request
            refresh: true,
            params: {include: 'parent'},
          }
          //Request
          commerceServices.crud.index(configName, params).then(response => {
            this.table.options.categories = []
            let categories = this.$helper.array.tree(response.data)
            categories.unshift({label: 'All Categories', id: 0})
            this.table.options.categories = categories
            resolve(true)
          }).catch(error => {
            this.$helper.alert.error('Failed: ' + error, 'bottom')
            reject(true)
          })
        })
      },
      //Delete Product
      deleteItem(item) {
        this.$q.dialog({
          title: item.id+' - '+item.name,
          message: 'Do you want delete this product?',
          color: 'negative',
          ok: 'Delete',
          cancel: true
        }).then(data => {
          this.loading = true
          let configName = 'apiRoutes.eCommerce.products'
          commerceServices.crud.delete(configName, item.id, {params: {}}).then(response => {
            this.$helper.alert.success('Product deleted')
            this.getDataTable(true)
            this.loading = false
          }).catch(error => {
            this.$helper.alert.error('Failed: ' + error)
            this.loading = false
          })
        }).catch(data => {})
      }
    }
  }
</script>

<style lang="stylus">
  @import "~variables";
  #productIndexPage
      .q-search
        width 258px
</style>