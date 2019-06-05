<template>
  <div id="crudOptionValues" class="relative-position backend-page">
    <!--Table-->
    <q-table
      :data="table.data"
      :columns="table.columns"
      row-key="name"
    >
      <!--Header-->
      <div slot="top-left">
        <span class="input-title">Product Option Values</span>
      </div>
      <div slot="top-right">
        <!--Button new record-->
        <q-btn icon="fas fa-edit" color="positive" label="New Option Value"
               @click="modal.itemId = false; modal.show = true"/>
      </div>

      <!--= Custom Columns =-->
      <q-td slot="body-cell-actions" slot-scope="props" :props="props">
        <!--Edit button-->
        <q-btn color="positive" icon="fas fa-pen" size="sm"
               @click="modal.itemId = props.row.id; setItemUpdate()">
          <q-tooltip :delay="300">Edit</q-tooltip>
        </q-btn>
        <!--Delete button-->
        <q-btn color="negative" icon="fas fa-trash-alt" size="sm" class="q-ml-xs"
               @click="deleteItem(props.row.id)">
          <q-tooltip :delay="300">Delete</q-tooltip>
        </q-btn>
      </q-td>
    </q-table>

    <!--Modal with form-->
    <q-modal id="formCategory" class="modal-form backend-page" v-model="modal.show"
             no-esc-dismiss no-backdrop-dismiss v-if="success">
      <q-modal-layout style="max-width: 1245px">
        <!--Header-->
        <q-toolbar slot="header">
          <q-toolbar-title v-if="!modal.itemId">New Product Option Value</q-toolbar-title>
          <q-toolbar-title v-else>Update Product Option Value ID: {{modal.itemId}}</q-toolbar-title>
          <q-btn flat v-close-overlay icon="fas fa-times"/>
        </q-toolbar>

        <!--Footer-->
        <q-toolbar slot="footer" color="white">
          <q-toolbar-title></q-toolbar-title>
          <!--Button Save-->
          <q-btn icon="fas fa-save" color="positive"
                 v-if="!modal.itemId" label="Save"
                 :loading="loading" @click="createItem()"/>
          <!--Button Update-->
          <q-btn label="Update" icon="fas fa-pen" color="positive"
                 :loading="loading" @click="updateItem()" v-else/>
        </q-toolbar>

        <!--Content-->
        <div class="layout-padding relative-position">
          <div class="row gutter-x-md">
            <!--Form left-->
            <div class="col-12 col-md-6">
              <!--Option Value-->
              <q-field
                :error="$v.form.optionValueId.$error"
                error-label="This field is required"
                class="q-pa-none"
              >
                <div class="input-title">Option Value *</div>
                <treeselect
                  :clearable="false"
                  :options="options.values"
                  value-consists-of="BRANCH_PRIORITY"
                  v-model="form.optionValueId"
                  placeholder=""
                />
              </q-field>
              <!--Parent Option Value -->
              <q-field
                v-if="options.parentValues.length"
                :error="$v.form.parentOptionValueId.$error"
                error-label="This field is required"
              >
                <div class="input-title">Parent Option Value *</div>
                <treeselect
                  :clearable="false"
                  :options="options.parentValues"
                  value-consists-of="BRANCH_PRIORITY"
                  v-model="form.parentOptionValueId"
                  placeholder=""
                />
              </q-field>
              <!--Quantity-->
              <q-field
                :error="$v.form.quantity.$error"
                error-label="This field is required"
              >
                <q-input v-model="form.quantity" type="number" stack-label="Quantity *"/>
              </q-field>
              <!--Subtrack-->
              <q-field
                :error="$v.form.subtract.$error"
                error-label="This field is required"
              >
                <div class="input-title">Subtract</div>
                <treeselect
                  :clearable="false"
                  :options="options.subtract"
                  value-consists-of="BRANCH_PRIORITY"
                  v-model="form.subtract"
                  placeholder="" class="q-mb-md"
                />
              </q-field>
            </div>
            <!--Form right-->
            <div class="col-12 col-md-6">
              <!--Price-->
              <q-field
                :error="$v.form.price.$error"
                error-label="This field is required"
              >
                <div class="content-prefix row">
                  <div class="input-title col-12">Price *</div>
                  <div class="col-2"><!--Prefix-->
                    <treeselect
                      :clearable="false"
                      :options="options.prefix" v-model="form.pricePrefix"
                      placeholder=""
                    />
                  </div>
                  <div class="col-10 q-pl-sm"><!--Input-->
                    <q-input v-model="form.price" style="padding: 0px" type="number"/>
                  </div>
                </div>
              </q-field>
              <!--Points-->
              <q-field
                :error="$v.form.points.$error"
                error-label="This field is required"
              >
                <div class="content-prefix row">
                  <div class="input-title col-12">Points *</div>
                  <div class="col-2"><!--Prefix-->
                    <treeselect
                      :clearable="false"
                      :options="options.prefix" v-model="form.pointsPrefix"
                      placeholder=""
                    />
                  </div>
                  <div class="col-10 q-pl-sm"><!--Input-->
                    <q-input v-model="form.points" style="padding: 0px" type="number"/>
                  </div>
                </div>
              </q-field>
              <!--weight-->
              <q-field
                :error="$v.form.weight.$error"
                error-label="This field is required"
              >
                <div class="content-prefix row">
                  <div class="input-title col-12">Weight *</div>
                  <div class="col-2"><!--Prefix-->
                    <treeselect
                      :clearable="false"
                      :options="options.prefix" v-model="form.weightPrefix"
                      placeholder=""
                    />
                  </div>
                  <div class="col-10 q-pl-sm"><!--Input-->
                    <q-input v-model="form.weight" style="padding: 0px" type="number"/>
                  </div>
                </div>
              </q-field>
            </div>
          </div>
          <!--Loading-->
          <inner-loading :visible="loading"/>
        </div>
      </q-modal-layout>
    </q-modal>

    <!--Loading-->
    <inner-loading :visible="loading"/>
  </div>
</template>
<script>
  //components
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import innerLoading from 'src/components/master/innerLoading'
  //Services
  import commerceServices from '@imagina/qcommerce/_services/index';
  //Plugins
  import {required} from 'vuelidate/lib/validators'
  import _cloneDeep from 'lodash.clonedeep'

  export default {
    props: {
      productOption: {defalt: false},
    },
    components: {Treeselect, innerLoading},
    watch: {
      productOption: {
        deep: true,
        handler: function (newValue) {
          this.initForm()
        },
      },
      'modal.itemId': {
        deep: true,
        handler: function (newValue) {
          if (!newValue) this.resetform()
        },
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.initForm()
      })
    },
    validations() {
      return {
        form: {
          optionValueId: {required},
          parentOptionValueId: (this.options.parentValues && this.options.parentValues.length) ? {required} : false,
          quantity: {required},
          subtract: {required},
          price: {required},
          points: {required},
          weight: {required},
        }
      }
    },
    data() {
      return {
        loading: false,
        success: false,
        table: {
          data: [],
          columns: [
            {name: 'id', label: 'Id', field: 'id'},
            {name: 'optionValue', label: 'Option Value', field: 'optionValue', align: 'left'},
            {name: 'parentOptionValue', label: 'Parent Option Value', field: 'parentOptionValue', align: 'left'},
            {name: 'quantity', label: 'quantity', field: 'quantity'},
            {
              name: 'subtract', label: 'subtract', field: 'substract',
              format: val => parseInt(val) ? 'Yes' : 'No'
            },
            {name: 'price', label: 'price', field: 'price'},
            {name: 'points', label: 'points', field: 'points'},
            {name: 'weight', label: 'weight', field: 'weight'},
            {name: 'actions', label: ''},
          ]
        },
        modal: {
          show: false,
          itemId: false,
        },
        form: {},
        options: {}
      }
    },
    computed: {
      //Data form
      dataForm() {
        return {
          productOptionId: null,
          productId: null,
          optionId: null,
          optionValueId: null,
          parentOptionValueId: null,
          quantity: null,
          subtract: 1,
          price: null,
          pricePrefix: '+',
          points: null,
          pointsPrefix: '+',
          weight: null,
          weightPrefix: '+',
        }
      },
      //Data options
      dataOptions() {
        return {
          values: [],
          parentValues: [],
          subtract: [
            {label: 'Yes', id: 1},
            {label: 'No', id: 0},
          ],
          prefix: [
            {label: '+', id: '+'},
            {label: '-', id: '-'},
          ]
        }
      }
    },
    methods: {
      //Init form
      async initForm() {
        this.loading = true
        this.success = false//Status component
        this.modal.show = false//Close modal
        await this.resetform()//Reset Form
        await this.getData()//Get data
        this.success = true//Status component
        this.loading = false
      },
      //Reset Form
      async resetform() {
        this.$v.form.$reset()//Reset validations
        this.form = _cloneDeep(this.dataForm)//Reset form
        this.options = _cloneDeep(this.dataOptions)//Reset Options
        //Assign data from product option to form
        if (this.productOption) {
          this.form.productOptionId = this.productOption.id
          this.form.productId = this.productOption.productId
          this.form.optionId = this.productOption.optionId
        }
        if (this.productOption.optionId)//Get values from option
          await this.getOptionValues(this.productOption.optionId)
        if (this.productOption.parentOptionId)//Get values from parent option
          await this.getOptionValues(this.productOption.parentOptionId, 'parentValues')
      },
      //Get data
      getData() {
        return new Promise((resolve, reject) => {
          let configName = 'apiRoutes.eCommerce.productOptionValues'
          let params = {
            remember: false,
            params: {include: '', filter: {productOptionId: this.productOption.id}}
          }
          commerceServices.crud.index(configName, params).then(response => {
            this.table.data = response.data
            resolve(true)
          }).catch(error => {
            this.loading = false
            this.$helper.alert.error('Failed: ' + error)
            reject(error)
          })
        })
      },
      //Create Item
      createItem() {
        this.$v.form.$touch()//Validate component locales
        //Check validations
        if (!this.$v.form.$error) {
          this.loading = true
          let configName = 'apiRoutes.eCommerce.productOptionValues'
          commerceServices.crud.create(configName, this.form).then(response => {
            this.$helper.alert.success('Product Option Value created ID: ' + response.data.id)
            this.initForm()
            this.loading = false
          }).catch(error => {
            this.loading = false
            this.$helper.alert.error('Failed: ' + error)
          })
        } else {
          this.$helper.alert.error('Please check required fields', 'bottom')
        }
      },
      //Update Item
      updateItem() {
        this.$v.$touch()//Validate component locales
        //Check validations
        if (!this.$v.$error) {
          this.loading = true
          let configname = 'apiRoutes.eCommerce.productOptionValues'
          commerceServices.crud.update(configname, this.modal.itemId, this.form).then(response => {
            this.$helper.alert.success('Product Option Value updated ID: ' + this.itemId)
            this.initForm()
            this.loading = false
          }).catch(error => {
            this.loading = false
            this.$helper.alert.error('Failed: ' + error)
          })
        } else {
          this.$helper.alert.error('Please check required fields', 'bottom')
        }
      },
      //Delete Item
      deleteItem(itemId) {
        this.loading = true
        let configName = 'apiRoutes.eCommerce.productOptionValues'
        commerceServices.crud.delete(configName, itemId).then(response => {
          this.$helper.alert.success('Product Option Value deleted ID: ' + response.data.id)
          this.initForm()
          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$helper.alert.error('Failed: ' + error)
        })
      },
      //Set data to item update
      setItemUpdate() {
        const itemId = _cloneDeep(this.modal.itemId)
        const item = this.table.data.find(item => item.id == itemId)
        this.form = Object.assign({}, this.form, item)
        this.modal.show = true
      },
      //Get option values
      getOptionValues(optionId, itemName = 'values') {
        return new Promise((resolve, reject) => {
          let configName = 'apiRoutes.eCommerce.optionValues'
          let params = {params: {filter: {optionId: optionId}}}
          commerceServices.crud.index(configName, params).then(response => {
            this.options[itemName] = []
            response.data.forEach(item => {//Order values
              this.options[itemName].push({label: item.description, id: item.id})
            })
            resolve(true)
          }).catch(error => {
            this.loading = false
            this.$helper.alert.error('Failed: ' + error)
            reject(error)
          })
        })
      },
    }
  }
</script>
<style lang="stylus">
  @import "~variables";

  #crudOptionValues
    .input-title
      color #757575
      font-size 14px
      font-weight 500
      line-height 18px
      min-height 48px
      padding 15px 16px

</style>