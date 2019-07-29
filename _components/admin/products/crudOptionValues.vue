<template>
  <div id="crudOptionValues" class="relative-position backend-page">
    <!--Table-->
    <q-table
      :data="table.data"
      :columns="columns"
      row-key="name"
    >
      <!--Header-->
      <div slot="top-left">
        <span class="input-title">{{$tr('qcommerce.layout.form.productOptionValues')}}</span>
      </div>
      <div slot="top-right">
        <!--Button new record-->
        <q-btn icon="fas fa-edit" color="positive" :label="$tr('qcommerce.layout.newOptionValue')"
               @click="modal.itemId = false; modal.show = true"/>
      </div>

      <!--= Custom Columns =-->
      <q-td slot="body-cell-actions" slot-scope="props" :props="props">
        <!--Edit button-->
        <q-btn color="positive" icon="fas fa-pen" size="sm"
               @click="modal.itemId = props.row.id; setItemUpdate()">
          <q-tooltip :delay="300">{{$tr('ui.label.edit')}}</q-tooltip>
        </q-btn>
        <!--Delete button-->
        <q-btn color="negative" icon="fas fa-trash-alt" size="sm" class="q-ml-xs"
               @click="deleteItem(props.row.id)">
          <q-tooltip :delay="300">{{$tr('ui.label.delete')}}</q-tooltip>
        </q-btn>
      </q-td>
    </q-table>

    <!--Modal with form-->
    <q-modal id="formCategory" class="modal-form backend-page" v-model="modal.show"
             no-esc-dismiss no-backdrop-dismiss v-if="success">
      <q-modal-layout style="max-width: 1245px">
        <!--Header-->
        <q-toolbar slot="header">
          <q-toolbar-title v-if="!modal.itemId">
            {{$tr('qcommerce.layout.newProductOptionValue')}}
          </q-toolbar-title>
          <q-toolbar-title v-else>
            {{`${$tr('qcommerce.layout.updatedProductOptionValue')} ID: ${modal.itemId}`}}
          </q-toolbar-title>
          <q-btn flat v-close-overlay icon="fas fa-times"/>
        </q-toolbar>

        <!--Footer-->
        <q-toolbar slot="footer" color="white">
          <q-toolbar-title></q-toolbar-title>
          <!--Button Save-->
          <q-btn icon="fas fa-save" color="positive"
                 v-if="!modal.itemId" :label="$tr('ui.label.save')"
                 :loading="loading" @click="createItem()"/>
          <!--Button Update-->
          <q-btn :label="$tr('ui.label.update')" icon="fas fa-pen" color="positive"
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
                :error-label="$tr('ui.message.fieldRequired')"
                class="q-pa-none"
              >
                <div class="input-title">
                  {{`${$tr('qcommerce.layout.form.optionValue')} *`}}
                  <!--Crud Option Value-->
                  <crud :crud-data="import('@imagina/qcommerce/_crud/productOptionValues')"
                        just-create @created="getOptionValues"/>
                </div>
                <treeselect
                  :clearable="false"
                  :options="options.values"
                  :append-to-body="true"
                  value-consists-of="BRANCH_PRIORITY"
                  v-model="form.optionValueId"
                  placeholder=""
                />
              </q-field>
              <!--Parent Option Value -->
              <q-field
                v-if="options.parentValues.length"
                :error="$v.form.parentOptionValueId.$error"
                :error-label="$tr('ui.message.fieldRequired')"
              >
                <div class="input-title">
                  {{`${$tr('qcommerce.layout.form.parentOptionValue')} *`}}
                  <!--Crud Option Value-->
                  <crud :crud-data="import('@imagina/qcommerce/_crud/productOptionValues')"
                        just-create @created="getOptionValues"/>
                </div>
                <treeselect
                  :clearable="false"
                  :append-to-body="true"
                  :options="options.parentValues"
                  value-consists-of="BRANCH_PRIORITY"
                  v-model="form.parentOptionValueId"
                  placeholder=""
                />
              </q-field>
              <!--Quantity-->
              <q-field
                :error="$v.form.quantity.$error"
                :error-label="$tr('ui.message.fieldRequired')"
              >
                <q-input v-model="form.quantity" type="number"
                         :stack-label="`${$tr('ui.form.quantity')} *`"/>
              </q-field>
              <!--Subtrack-->
              <q-field
                :error="$v.form.subtract.$error"
                :error-label="$tr('ui.message.fieldRequired')"
              >
                <div class="input-title">
                  {{`${$tr('qcommerce.layout.form.subtractFromStock')}`}}
                </div>
                <treeselect
                  :clearable="false"
                  :append-to-body="true"
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
                :error-label="$tr('ui.message.fieldRequired')"
              >
                <div class="content-prefix row">
                  <div class="input-title col-12">{{`${$tr('ui.form.price')} *`}}</div>
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
                :error-label="$tr('ui.message.fieldRequired')"
              >
                <div class="content-prefix row">
                  <div class="input-title col-12">{{`${$trp('ui.form.point')} *`}}</div>
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
                :error-label="$tr('ui.message.fieldRequired')"
              >
                <div class="content-prefix row">
                  <div class="input-title col-12">{{`${$tr('ui.form.weight')} *`}}</div>
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
        optionId: null,
        table: {
          data: [],
        },
        modal: {
          show: false,
          itemId: false,
          formOptionValue: false
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
            {label: this.$tr('ui.label.yes'), id: 1},
            {label: this.$tr('ui.label.no'), id: 0},
          ],
          prefix: [
            {label: '+', id: '+'},
            {label: '-', id: '-'},
          ]
        }
      },
      //Columns translatables
      columns() {
        return [
          {name: 'id', label: this.$tr('ui.form.id'), field: 'id'},
          {
            name: 'optionValue', label: this.$tr('qcommerce.layout.form.optionValue'),
            field: 'optionValue', align: 'left'
          },
          {
            name: 'parentOptionValue', label: this.$tr('qcommerce.layout.form.parentOptionValue'),
            field: 'parentOptionValue', align: 'left'
          },
          {name: 'quantity', label: this.$tr('ui.form.quantity'), field: 'quantity'},
          {name: 'price', label: this.$tr('ui.form.price'), field: 'price'},
          {name: 'points', label: this.$trp('ui.form.point'), field: 'points'},
          {name: 'weight', label: this.$trp('ui.form.weight'), field: 'weight'},
          {name: 'actions', label: this.$trp('ui.form.actions')},
        ]
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
        this.getOptionValues()//Get options values
      },
      //Get data
      getData() {
        return new Promise((resolve, reject) => {
          let configName = 'apiRoutes.qcommerce.productOptionValues'
          let params = {
            remember: false,
            params: {include: '', filter: {productOptionId: this.productOption.id}}
          }
          this.$crud.index(configName, params).then(response => {
            this.table.data = response.data
            resolve(true)
          }).catch(error => {
            this.loading = false
            this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
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
          let configName = 'apiRoutes.qcommerce.productOptionValues'
          this.$crud.create(configName, this.form).then(response => {
            this.$alert.success({message: this.$tr('ui.message.recordCreated'), pos: 'bottom'})
            this.initForm()
            this.loading = false
          }).catch(error => {
            this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
            this.loading = false
          })
        } else {
          this.$alert.error({message: this.$tr('ui.message.formInvalid'), pos: 'bottom'})
        }
      },
      //Update Item
      updateItem() {
        this.$v.$touch()//Validate component locales
        //Check validations
        if (!this.$v.$error) {
          this.loading = true
          let configname = 'apiRoutes.qcommerce.productOptionValues'
          this.$crud.update(configname, this.modal.itemId, this.form).then(response => {
            this.$alert.success({message: this.$tr('ui.message.recordUpdated'), pos: 'bottom'})
            this.initForm()
            this.loading = false
          }).catch(error => {
            this.$alert.error({message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom'})
            this.loading = false
          })
        } else {
          this.$alert.error({message: this.$tr('ui.message.formInvalid'), pos: 'bottom'})
        }
      },
      //Delete Item
      deleteItem(itemId) {
        this.loading = true
        let configName = 'apiRoutes.qcommerce.productOptionValues'
        this.$crud.delete(configName, itemId).then(response => {
          this.$alert.success({message: this.$tr('ui.message.recordDeleted'), pos: 'bottom'})
          this.initForm()
          this.loading = false
        }).catch(error => {
          this.$alert.error({message: this.$tr('ui.message.recordNoDeleted'), pos: 'bottom'})
          this.loading = false
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
      async getOptionValues() {
        this.loading = true
        //Sub funtion to get options
        let getOptions = (optionId, itemName = 'values') =>{
          return new Promise((resolve, reject) => {
            let configName = 'apiRoutes.qcommerce.optionValues'
            let params = {refresh: true, params: {filter: {optionId: optionId}}}
            this.$crud.index(configName, params).then(response => {
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
        }

        if (this.productOption.optionId)//Get values from option
          await getOptions(this.productOption.optionId)
        if (this.productOption.parentOptionId)//Get values from parent option
          await getOptions(this.productOption.parentOptionId, 'parentValues')
        this.loading = false
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
