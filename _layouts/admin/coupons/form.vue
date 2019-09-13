<template>
  <div
    id="pageId"
    class="q-layout-page layout-padding">
    <h1 class="q-headline text-primary">
      <q-icon
        v-if="$route.meta.icon"
        :name="$route.meta.icon"/>
      {{ this.$route.params.id ? $tr('qcommerce.layout.updateCoupon') : $tr('qcommerce.layout.newCoupon') }}
    </h1>
    
    <div class="relative-position q-mb-lg backend-page">
      <div class="box">
        <div class="row gutter-x-sm">
  
          <!-- Left Form -->
          <div class="col-md-8">
  
  
            <q-field
              :error="$v.form.code.$error"
              :error-label="$tr('ui.message.fieldRequired')">
              <div class="input-title">
                {{$tr('qcommerce.layout.form.code')}} *
                <q-btn
                  @click="generateCoupon()"
                  label="Generate Code"
                  color="primary"/>
              </div>
              <q-input
                v-model="form.code"
                type="text"/>
            </q-field>
  
            <div>
              <q-field
                :error="$v.form.type.$error"
                :error-label="$tr('ui.message.fieldRequired')">
              <div class="input-title q-mt-xs">
                {{$tr('qcommerce.layout.form.type')}} *
              </div>
              <tree-select
                :clearable="false"
                v-model="form.type"
                :options="[
                  {label: 'Coupon for Order', id: 1},
                  {label: 'Coupon for Product', id: 2},
                  {label: 'Coupon for Category', id: 3},
                ]"
                placeholder=""/>
              </q-field>
              
              <div v-if="form.type == 2">
                <div class="input-title">
                  {{$tr('qcommerce.layout.form.product')}} *
                </div>
                <tree-select
                  :clearable="false"
                  v-model="form.productId"
                  :options="products.data"
                  placeholder=""/>
              </div>
              
              <div v-if="form.type == 3">
                <div class="input-title">
                  {{$tr('qcommerce.layout.form.category')}} *
                </div>
                <tree-select
                  :clearable="false"
                  v-model="form.categoryId"
                  :options="categories.data"
                  placeholder=""/>
              </div>
              
            </div>
  
            <q-field
              :error="$v.form.typeDiscount.$error"
              :error-label="$tr('ui.message.fieldRequired')">
            <div class="input-title">
              {{$tr('qcommerce.layout.form.typeDiscount')}} *
            </div>
            <tree-select
              :clearable="false"
              v-model="form.typeDiscount"
              :options="[
                {label: 'Fixed Value', id: '0'},
                {label: 'Percentage', id: '1'},
                ]"
              placeholder=""/>
            </q-field>
            
            <q-field
              :error="$v.form.discount.$error"
              :error-label="$tr('ui.message.fieldRequired')">
              <q-input
                v-model="form.discount"
                type="number"
                :stack-label="`${$tr('qcommerce.layout.form.discount')} *`"/>
            </q-field>
  
            <q-field
              :error="$v.form.quantityTotal.$error"
              :error-label="$tr('ui.message.fieldRequired')">
              <q-input
                v-model="form.quantityTotal"
                type="number"
                :stack-label="`${$tr('qcommerce.layout.form.quantityTotal')} *`"/>
            </q-field>
  
            <q-field
              :error="$v.form.quantityTotalCustomer.$error"
              :error-label="$tr('ui.message.fieldRequired')">
              <q-input
                v-model="form.quantityTotalCustomer"
                type="number"
                :stack-label="`${$tr('qcommerce.layout.form.quantityTotalCustomer')} *`"/>
            </q-field>


          </div>
          
          <!-- Right Form -->
          <div class="col-md-4 ">
  
            <q-field
              :error="$v.form.status.$error"
              :error-label="$tr('ui.message.fieldRequired')">
              <div class="input-title q-mt-xs">
                {{$tr('qcommerce.layout.form.status')}} *
              </div>
              <tree-select
                :clearable="false"
                v-model="form.status"
                :options="[
                    {label: 'Active', id: 1},
                    {label: 'Inactive', id: 2},
                  ]"
                placeholder=""/>
            </q-field>
  
  
            <q-field
              :error="$v.form.dateStart.$error"
              :error-label="$tr('ui.message.fieldRequired')">
              <div class="input-title">
                {{$tr('qcommerce.layout.form.dateStart')}} *
              </div>
              <q-datetime
                v-model="form.dateStart"
                type="datetime"/>
            </q-field>
  
            <q-field
              :error="$v.form.dateEnd.$error"
              :error-label="$tr('ui.message.fieldRequired')">
              <q-datetime
                v-model="form.dateEnd"
                type="datetime"
                :stack-label="`${$tr('qcommerce.layout.form.dateEnd')} *`"/>
            </q-field>
  
            <q-field
                :error="$v.form.shipping.$error"
                :error-label="$tr('ui.message.fieldRequired')">
              <div class="input-title">
                {{$tr('qcommerce.layout.form.shipping')}} *
              </div>
              <tree-select
                :clearable="false"
                v-model="form.shipping"
                :options="[
                    {label: this.$tr('ui.label.yes'), id: 1},
                    {label: this.$tr('ui.label.no'), id: 0},
                  ]"
                placeholder=""/>
              </q-field>
  
            <q-field
              :error="$v.form.logged.$error"
              :error-label="$tr('ui.message.fieldRequired')">
            <div class="input-title">
              {{$tr('qcommerce.layout.form.logged')}} *
            </div>
            <tree-select
              :clearable="false"
              v-model="form.logged"
              :options="[
                  {label: this.$tr('ui.label.yes'), id: 1},
                  {label: this.$tr('ui.label.no'), id: 0},
                ]"
              placeholder=""/>
            </q-field>
            
          </div>
        </div>
        <q-page-sticky
          position="bottom-right"
          :offset="[18, 18]">
          <!--Update button-->
          <q-btn
            v-if="$route.params.id"
            color="positive"
            :loading="loading"
            icon="fas fa-edit"
            :label="$tr('ui.label.update')"
            @click="updateItem()"/>
          <!--Save button-->
          <q-btn
            v-else
            color="positive"
            :loading="loading"
            icon="fas fa-edit"
            :label="$tr('ui.label.create')"
            @click="createItem()"/>
        </q-page-sticky>
        <inner-loading :visible="loading"/>
      </div>
    </div>
  </div>
</template>

<script>
  import recursiveList from 'src/components/master/recursiveListSelect'
  import { required } from 'vuelidate/lib/validators'
  export default {
    components:{
      recursiveList
    },
    data () {
      return {
        loading: false,
        types:[],
        products: {
          data: [],
          loading: false
        },
        categories: {
          data: [],
          loading: false
        },
        form: {
          id: '',
          code: '',
          type: null,
          categoryId: null,
          productId: null,
          customerId: null,
          discount: '',
          typeDiscount: null,
          logged: null,
          shipping: null,
          dateStart: '',
          dateEnd: '',
          quantityTotal: '',
          quantityTotalCustomer: '',
          status: null,
        },
      }
    },
    validations :{
      form: {
        code: { required },
        type: { required },
        discount: { required },
        typeDiscount: { required },
        logged: { required },
        shipping: { required },
        dateStart: { required },
        dateEnd: { required },
        quantityTotal: { required },
        quantityTotalCustomer: { required },
        status: { required },
      }
    },
    watch:{
      'form.type': function (val) {
        this.form.categoryId = null
        this.form.productId = null
      }
    },
    mounted() {
      this.$nextTick( () => {
        this.initForm()
      })
    },
    methods : {
      initForm(){
        this.getCategories()
        this.getProducts()
        if ( this.$route.params.id ) this.getData()
      },
      getData(){
        this.loading = true
        let params = {
          refresh: true,
          params: {}
        }
        this.$crud.show( 'apiRoutes.qcommerce.coupons', this.$route.params.id , params )
        .then( response => {
          console.warn( response.data.productId )
          Object.assign( this.form, {...response.data} )
          setTimeout( () => {
            this.form.productId = response.data.productId
            this.form.categoryId = response.data.categoryId
            this.loading = false
          }, 1000)
        }).catch( error => {
          this.$alert.error( {message: this.$tr( 'ui.message.errorRequest' ), pos: 'bottom'} )
          this.loading = false
        })
      },
      createItem(){
        this.$v.form.$touch()
        if ( this.$v.form.$error ) {
          this.loading = false
          this.$alert.error( {message: this.$tr('ui.message.formInvalid'), pos: 'bottom'} )
          return
        }
        this.loading = true
        this.$crud.create( 'apiRoutes.qcommerce.coupons', this.form )
        .then( response => {
          this.loading = false
          this.$router.push( {name: 'qcommerce.admin.coupons.index'} )
          this.$alert.success( {message: `${this.$tr('ui.message.recordCreated')} ID: ${response.data.id}`} )
        })
        .catch( error => {
          this.loading = false
          this.$alert.error( {message: this.$tr('ui.message.recordNoCreatde'), pos: 'bottom'} )
        })
      },
      updateItem(){
        this.$v.form.$touch()
        if ( this.$v.form.$error ) {
          this.loading = false
          this.$alert.error( {message: this.$tr('ui.message.formInvalid'), pos: 'bottom'} )
          return
        }
        this.loading = true
        this.$crud.update( 'apiRoutes.qcommerce.coupons', this.form.id, this.form )
        .then( response => {
          this.loading = false
          this.$router.push( {name: 'qcommerce.admin.coupons.index'} )
          this.$alert.success( {message: `${this.$tr('ui.message.recordUpdated')}`} )
          this.initForm()
        })
        .catch( error => {
          this.loading = false
          this.$alert.error( {message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom'} )
        })
      },
      getCategories(){
        this.categories.loading = true
        let params = {
          refresh: true,
          params: {
            include: 'parent'
          },
        }
        this.$crud.index( 'apiRoutes.qcommerce.categories', params )
        .then( response => {
          this.categories.data = this.$helper.array.tree( response.data )
          this.categories.loading = false
        })
        .catch( error => {
          this.$alert.error( {message: this.$tr('ui.message.errorRequest'), pos: 'bottom'} )
          this.categories.loading = false
        })
      },
      getProducts(){
        this.products.loading = true
        let params = {
          refresh: true,
          params: {},
        }
        this.$crud.index( 'apiRoutes.qcommerce.products', params )
        .then( response => {
          this.products.data = response.data.map( item => {
            return {
              id: item.id,
              label: item.name,
            }
          })
          this.products.loading = false
        })
        .catch( error => {
          this.$alert.error( {message: this.$tr('ui.message.errorRequest'), pos: 'bottom'} )
          this.products.loading = false
        })
      },
      generateCoupon(){
        this.form.code = this.makeCouponCode(20).toUpperCase()
      },
      makeCouponCode(length = 10) {
        let result = ''
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let charactersLength = characters.length
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt( Math.floor( Math.random() * charactersLength ) )
        }
        return result
      },
    }
  }
</script>

