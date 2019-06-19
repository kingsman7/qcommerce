<template>
  <div id="paymentMethodsIndex"
       class="q-layout-page row layout-padding">
  
    <!--TITLE-->
    <h1 class="q-headline text-primary">
      <q-icon name="fas fa-money-bill-wave"></q-icon>
      Payment Methods
    </h1>
  
    <!--Content-->
    <div class="col-12 relative-position backend-page">
      <!--Table-->
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
                   v-if="$auth.hasAccess('icommerce.payment-methods.edit')"
                   @click="itemToEdit = props.row; formItemShow = true">
              <q-tooltip :delay="300">Edit</q-tooltip>
            </q-btn>
            <!--status button-->
            <q-toggle color="positive" v-model="props.row.status" class="q-px-xs" @input="update(props.row)">
              <q-tooltip :delay="300">Enabled/Disabled</q-tooltip>
            </q-toggle>
          </q-td>
        </q-table>
 
    
      <!--Loading-->
      <inner-loading :visible="loading"></inner-loading>
      <component :is="itemToEdit.name" v-model="formItemShow" :item="itemToEdit" :itemId="itemToEdit.id"></component>
     
    </div>
  </div>
</template>
<script>
  //Plugins
  import {alert} from '@imagina/qhelper/_plugins/alert'

  //Services
  import commerceServices from '@imagina/qcommerce/_services/index';
  
  //Components
  import innerLoading from 'src/components/master/innerLoading'
  import icommercepaypal from '@imagina/qcommerce/_components/admin/paymentMethods/paypal'
  import icommercepayu from '@imagina/qcommerce/_components/admin/paymentMethods/payu'
  import icommercecheckmo from '@imagina/qcommerce/_components/admin/paymentMethods/checkmo'
  import icommerceauthorize from '@imagina/qcommerce/_components/admin/paymentMethods/authorize'
  
  export default {
    props: {},
    components: {
      innerLoading,
      icommercepaypal,
      icommercepayu,
      icommercecheckmo,
      icommerceauthorize
    },
    watch: {
      formItemShow(val){
        if(!val){
          this.getDataTable(true)
        }
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.getDataTable(true)
      })
    },
    data() {
      return {
        loading: false,
        formItemShow: false,
        itemToEdit : {},
        table: {
          data: [],
          columns: [
            {name: 'id', label: 'ID', field: 'id', style: 'width: 50px'},
            {name: 'title', label: 'Title', field: 'title', align: 'rigth'},
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
            search: null,
            allTranslations: true
          }
        },
      }
    },
    methods: {
      //Request products with params from server table
      getDataTable(refresh = false) {
        this.getData({pagination: this.table.pagination}, refresh)
      },
      //Get payment methods
      getData({pagination, filter}, refresh = false) {
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
    
    
    
        //Request
        commerceServices.crud.index('apiRoutes.eCommerce.paymentMethods', params).then(response => {
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
  
      //update payment methods
      update(data) {
        this.loading = true
    
    
        //Request
        commerceServices.crud.update('apiRoutes.eCommerce.paymentMethods', data.id, data).then(response => {
  
          this.loading = false
          this.$alert.success('Payment method updated', 'top')
        }).catch(error => {
          this.loading = false
          this.$helper.alert.error('Failed: ' + error, 'bottom')
        })
    
      },
      
    }
    
  }
</script>
<style lang="stylus">
  @import "~variables";
</style>