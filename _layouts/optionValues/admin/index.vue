<template>
  <div id="productOptionsValuesIndexPage" class="q-layout-page layout-padding">

    <!--TITLE-->
    <h1 class="q-headline text-primary">
      <q-icon name="fas fa-stream"></q-icon>
      Options Values
    </h1>

    <!--Content-->
    <div class="relative-position">
      <!--Table-->
      <div class="col-12">
        <q-table
          :data="table.data"
          :columns="table.columns"
          :pagination.sync="table.pagination"
          @request="getData"
          :filter="table.filter"
          class="shadow-1"
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
                :append-to-body="true"
                :options="options"
                @input="getDataTable(true)"
                value-consists-of="BRANCH_PRIORITY"
                v-if="options.length" v-model="optionId"
                placeholder=""
              />
            </div>
            <!--Button new record-->
            <q-btn icon="fas fa-edit" color="primary" label="New Value"
                   @click="formItemShow = true; itemIdToEdit = false"/>
            <!--Button refresh data-->
            <q-btn icon="fas fa-sync-alt" color="primary" class="q-ml-xs"
                   @click="getDataTable(true)">
              <q-tooltip :delay="300">Refresh Data</q-tooltip>
            </q-btn>
          </template>

          <!--= Custom Columns =-->
          <q-td slot="body-cell-actions" slot-scope="props" :props="props">
            <!--Edit button-->
            <q-btn color="primary" icon="fas fa-pen" size="sm"
                   @click="itemIdToEdit = props.row.id; formItemShow = true">
              <q-tooltip :delay="300">Edit</q-tooltip>
            </q-btn>
            <!--Delete button-->
            <q-btn color="negative" icon="fas fa-trash-alt" size="sm" class="q-ml-xs"
                   @click="itemIdToDelete = props.row; dialogDeleteItem = true">
              <q-tooltip :delay="300">Delete</q-tooltip>
            </q-btn>
          </q-td>
        </q-table>
      </div>

      <!--Loading-->
      <q-inner-loading :visible="loading">
        <div class="q-box-inner-loading">
          <q-spinner-hourglass size="50px" color="primary"/>
          <h6 class="q-ma-none text-primary q-title">Loading...</h6>
        </div>
      </q-inner-loading>
    </div>

    <!--Form category (create and/or update)-->
    <form-option-value v-model="formItemShow" @created="getDataTable(true)"
                       :option-id="optionId" :item-id="itemIdToEdit"
                       @updated="getDataTable(true)">
    </form-option-value>

    <!--Dialog to delete category-->
    <q-dialog v-model="dialogDeleteItem">
      <!-- Message -->
      <span slot="message">
        <h1 class="q-title text-negative">Delete Category</h1>
        Are you sure to delete category
        <span class="text-primary">{{itemIdToDelete.description}}</span>
      </span>

      <!--Buttons-->
      <template slot="buttons" slot-scope="props">
        <!--Button cancel-->
        <q-btn color="negative" label="Cancel" @click="dialogDeleteItem = false"/>
        <!--Button confirm delete category-->
        <q-btn color="primary" icon="fas fa-trash-alt" :loading="loading"
               label="Delete" @click="deleteItem()"/>
      </template>
    </q-dialog>
  </div>
</template>

<script>
  //Services
  import commerceServices from '@imagina/qcommerce/_services/index';
  //Component
  import formOptionValue from '@imagina/qcommerce/_components/optionValues/admin/form'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    components: {
      formOptionValue,Treeselect
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
          commerceServices.crud.index('apiRoutes.ecommerce.productOptionsValues', params).then(response => {
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
          let configName = 'apiRoutes.ecommerce.productOptions'
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
      deleteItem() {
        this.loading = true
        let idCategory = this.itemIdToDelete.id
        commerceServices.crud.delete('apiRoutes.ecommerce.productOptionsValues', idCategory).then(response => {
          this.getDataTable(true)
          this.$helper.alert.success('Option deleted')
          this.dialogDeleteItem = false
          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$helper.alert.error('Failed: ' + error, 'bottom')
        })
      }
    }
  }
</script>

<style lang="stylus">
  @import "~variables";
  #productOptionsValuesIndexPage
    .q-table-container
      border-top 3px solid $primary
      .q-table-top
        .q-input, .q-select
          padding-bottom 0px

          &:before
            border 1px solid transparent

          .q-if-inner
            border 1px solid $grey-4
            padding 5px 0px 5px 6px

            .q-if-label
              line-height 3 !important
              color $grey-8

        .q-select
          .q-if-inner
            border-right 0px
          .q-icon
            border 1px solid $grey-4
            border-left  0px
            height 36px
            padding 5px 3px
            margin 0px
          .q-input-target
            padding-left 4px


        .q-search
          border 1px solid $grey-4
          padding 6px 9px
          border-radius 5px
          .q-if-inner
            border 0px
        .cont-vue-tree
          border 1px solid $grey-4
          border-left 2px solid $primary
          border-radius 4px
          .stack-label
            padding 9px 4px
            color $primary
          .vue-treeselect
            float right

            .vue-treeselect__control
              border 0px !important
              width auto
              padding-right 5px !important

            .vue-treeselect__value-container
              width 100px

            .vue-treeselect__single-value
              font-size 15px
              height 36px
              padding 5px 3px
              line-height 1.8
    .q-btn
      box-shadow none
</style>