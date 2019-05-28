<template>
  <div id="productOptionsValuesIndexPage" class="q-layout-page layout-padding">

    <!--TITLE-->
    <h1 class="q-headline text-primary">
      <q-icon name="fas fa-stream"></q-icon>
      Options Values
    </h1>

    <!--Content-->
    <div class="relative-position backend-page">
      <!--Table-->
      <div class="col-12">
        <q-table
          :data="table.data"
          :columns="table.columns"
          :pagination.sync="table.pagination"
          @request="getData"
          :filter="table.filter"
          class="shadow-1 border-top-color"
        >
          <!--Table slot left-->
          <template slot="top-left" slot-scope="props">
            <!--Search-->
            <q-search hide-underline clearable v-model="table.filter.search" @input="getDataTable"/>
          </template>
          <!--Table slot right-->
          <template slot="top-right" slot-scope="props">
            <!--Product Option-->
            <div class="cont-vue-tree q-mr-xs">
              <div class="stack-label float-left">Product Option: </div>
              <treeselect
                :clearable="false"
                :options="options"
                @input="getDataTable(true)"
                value-consists-of="BRANCH_PRIORITY"
                v-if="options.length" v-model="optionId"
                placeholder=""
              />
            </div>
            <!--Button new record-->
            <q-btn icon="fas fa-edit" color="positive" label="New Value"
                   v-if="$auth.hasAccess('icommerce.optionvalues.create')"
                   @click="formItemShow = true; itemIdToEdit = false"/>
            <!--Button refresh data-->
            <q-btn icon="fas fa-sync-alt" color="info" class="q-ml-xs"
                   @click="getDataTable(true)">
              <q-tooltip :delay="300">Refresh Data</q-tooltip>
            </q-btn>
          </template>

          <!--= Custom Columns =-->
          <q-td slot="body-cell-actions" slot-scope="props" :props="props">
            <!--Edit button-->
            <q-btn color="positive" icon="fas fa-pen" size="sm"
                   v-if="$auth.hasAccess('icommerce.optionvalues.edit')"
                   @click="itemIdToEdit = props.row.id; formItemShow = true">
              <q-tooltip :delay="300">Edit</q-tooltip>
            </q-btn>
            <!--Delete button-->
            <q-btn color="negative" icon="fas fa-trash-alt" size="sm" class="q-ml-xs"
                   v-if="$auth.hasAccess('icommerce.optionvalues.destroy')"
                   @click="deleteItem(props.row)">
              <q-tooltip :delay="300">Delete</q-tooltip>
            </q-btn>
          </q-td>
        </q-table>
      </div>

      <!--Loading-->
      <inner-loading :visible="loading"></inner-loading>
    </div>

    <!--Form category (create and/or update)-->
    <form-option-value v-model="formItemShow" @created="getDataTable(true)"
                       :option-id="optionId" :item-id="itemIdToEdit"
                       @updated="getDataTable(true)">
    </form-option-value>
  </div>
</template>

<script>
  //Services
  import commerceServices from '@imagina/qcommerce/_services/index';
  //Component
  import formOptionValue from '@imagina/qcommerce/_components/admin/optionValues/form'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import innerLoading from 'src/components/master/innerLoading'

  export default {
    components: {
      formOptionValue,Treeselect,innerLoading
    },
    mounted() {
      this.$nextTick(function () {
        this.getDataTable()
        this.getOptions()
      })
    },
    data() {
      return {
        loading: true,
        table: {
          data: [],
          columns: [
            {name: 'id', label: 'ID', field: 'id', style: 'width: 50px'},
            {name: 'description', label: 'Description', field: 'description', align: 'rigth'},
            {
              name: 'created_at', label: 'Creation Date', field: 'createdAt', align: 'left',
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
          }
        },
        formItemShow: false,
        dialogDeleteItem: false,
        itemIdToEdit: false,
        itemIdToDelete: false,
        optionId: null,
        options: []
      }
    },
    methods: {
      //Request products with params from server table
      getDataTable(refresh = false) {
        this.getData({pagination: this.table.pagination}, refresh)
      },
      //Get products
      getData({pagination, filter}, refresh = false) {
        if(this.optionId){
          this.loading = true

          //Params to request
          let params = {
            refresh: refresh,
            params: {
              filter: this.table.filter,
              page: pagination.page,
              take: pagination.rowsPerPage
            }
          }

          //Add option ID to filter
          params.params.filter.optionId = this.optionId

          //Request
          commerceServices.crud.index('apiRoutes.eCommerce.optionValues', params).then(response => {
            this.table.data = response.data
            this.table.pagination.page = response.meta.page.currentPage
            this.table.pagination.rowsNumber = response.meta.page.total
            this.table.pagination.rowsPerPage = pagination.rowsPerPage
            this.loading = false
          }).catch(error => {
            this.loading = false
            this.$helper.alert.error('Failed: ' + error, 'bottom')
          })
        }
      },
      //Get all options
      getOptions() {
        return new Promise((resolve, reject) => {
          let configName = 'apiRoutes.eCommerce.options'
          let params = {//Params to request
            refresh: true,
            params: {filter: {type: ['select', 'radio', 'checkbox']}},
          }
          //Request
          commerceServices.crud.index(configName, params).then(response => {
            this.options = []
            response.data.forEach((item) => {
              this.options.push({label: item.description, id: item.id});
            })
            if(this.options.length)
              this.optionId = this.options[0].id
              this.getDataTable(true)
            resolve(true)
          }).catch(error => {
            this.$helper.alert.error('Failed: ' + error, 'bottom')
            reject(true)
          })
        })
      },
      //Delete category
      deleteItem(item) {
        this.$q.dialog({
          title: item.id+' - '+item.description,
          message: 'Do you want delete this Option Value?',
          color: 'negative',
          ok: 'Delete',
          cancel: true
        }).then(data => {
          this.loading = true
          commerceServices.crud.delete('apiRoutes.eCommerce.optionValues', item.id).then(response => {
            this.getDataTable(true)
            this.$helper.alert.success('Option deleted')
            this.dialogDeleteItem = false
            this.loading = false
          }).catch(error => {
            this.loading = false
            this.$helper.alert.error('Failed: ' + error, 'bottom')
          })
        }).catch(data => {})
      }
    }
  }
</script>

<style lang="stylus">
  @import "~variables";
  #productOptionsValuesIndexPage
    .q-table-container
      .vue-treeselect__value-container
        width 100px
</style>