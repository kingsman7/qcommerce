<template>
  <div id="crudOptions" class="relative-position">
    <!--Form-->
    <div class="row gutter-sm">
      <div class="col-12 col-md-4">
        <div class="border q-pa-sm">
          <!--Header-->
          <div style="height: 36px" class="q-mb-sm">
            <!--Title-->
            <div class="float-left q-py-sm">Product Options</div>
            <!--Button add Option-->
            <q-btn icon="fas fa-pen" label="New Option" color="positive"
                   class="float-right" @click="addOption()"/>
          </div>
          <!--Message not option selected-->
          <div v-if="!productOptions.length" class="text-grey-8">
            There is no options selected...
          </div>
          <!--Options-->
          <recursive-options v-model="template.currentOption" :list-items="productOptions"
                             ref="optionList" @input="setDataOption()" v-else
                             @add="addOption(template.currentOption)"
                             @delete="deleteOption(template.currentOption)"/>
        </div>
      </div>
      <div class="col-12 col-md-8">
        <!--Message to select a option-->
        <div v-if="template.currentOption == null" class="q-pa-lg">
          <q-icon name="fas fa-exclamation-triangle" color="warning"></q-icon>
          Select a product option...
        </div>
        <!--Form Right-->
        <div v-else>
          <!--Option Name-->
          <div class="inline-block">
            <div class="input-title">Option</div>
            <q-icon color="primary" name="fas fa-caret-right"></q-icon>
            {{findOption(template.form.id).description}}
          </div>
          <!--Type-->
          <div class="inline-block q-ml-lg">
            <div class="input-title">Type</div>
            <q-icon color="primary" name="fas fa-caret-right"></q-icon>
            {{findOption(template.form.id).type}}
          </div>
          <!--Parent-->
          <div class="inline-block q-ml-lg" v-if="parseInt(template.form.parentId)">
            <div class="input-title">Parent</div>
            <q-icon color="primary" name="fas fa-caret-right"></q-icon>
            {{findOption(template.form.parentId).description}}
          </div>
          <!--Required-->
          <div class="inline-block q-ml-lg">
            <div class="input-title">Required</div>
            <q-toggle v-model="template.form.required" @input="updateProductOption()"/>
          </div>
          <!--Form-->
          <div class="row gutter-sm q-mt-sm">
            <!--Option value parent-->
            <div class="col-12 col-md-4"
                 v-if="showFieldForm && parseInt(template.form.parentId) && template.parentValues.length">
              <div class="input-title">Parent Option Value *</div>
              <treeselect
                v-model="template.form.parentOptionValueId"
                :clearable="false"
                :options="template.parentValues"
                placeholder="Select opion value..."
                :append-to-body="true"
                @input="updateProductOption()"
              />
            </div>
            <!--Option Value-->
            <div class="col-12 col-md-4" v-if="showFieldForm">
              <q-input v-model="template.form.value" stack-label="Option Value *"
                       @blur="updateProductOption()"/>
            </div>
            <!--Option Values-->
            <div class="col-12 q-mt-md" v-if="!showFieldForm">
              <crud-option-values :product-option="template.form"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Modal-->
    <q-modal v-model="modal.show" class="backend-page">
      <q-modal-layout style="max-width: 500px">
        <!--Header-->
        <q-toolbar slot="header">
          <q-toolbar-title>New Option Product</q-toolbar-title>
          <q-btn flat v-close-overlay icon="fas fa-times"/>
        </q-toolbar>

        <!--Content-->
        <div class="layout-padding relative-position">
          <!--Parent-->
          <div v-if="modal.parentOption" class="q-mb-md">
            <div class="input-title">Parent</div>
            <q-icon color="primary" name="fas fa-caret-right"></q-icon>
            {{modal.parentOption.description}}
          </div>
          <!--Options-->
          <div class="input-title">Option *</div>
          <treeselect
            v-model="modal.optionSelected"
            :options="template.options"
            placeholder=""
            :append-to-body="true"
            :disabled="template.options.length ? false : true"
            @input="createProductOption()"
          />
          <q-progress v-if="loadingOptions" indeterminate height="2px"/>
          <!--Loading-->
          <inner-loading :visible="modal.loading"/>
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
  import recursiveOptions from '@imagina/qcommerce/_components/admin/products/recursiveOptionsList'
  import crudOptionValues from '@imagina/qcommerce/_components/admin/products/crudOptionValues'
  import innerLoading from 'src/components/master/innerLoading'
  //Services
  import commerceServices from '@imagina/qcommerce/_services/index';
  //Plugins
  import _cloneDeep from 'lodash.clonedeep'

  export default {
    props: {
      productId: {default: false}
    },
    components: {recursiveOptions, Treeselect, crudOptionValues, innerLoading},
    watch: {},
    mounted() {
      this.$nextTick(function () {
        this.init()
      })
    },
    data() {
      return {
        loading: false,
        loadingOptions: false,
        modal: {
          show: false,
          optionData: false,
          parentOption : 0,
          optionSelected: null,
          loading: false
        },
        productOptions: [],//Options
        productOptionValues: [],//Option values
        template: {
          optionSelected: null,
          parentOptions: [],
          currentOption: null,
          options: [],
          form: {},
          values: [],
          parentValues: []
        }
      }
    },
    computed: {
      showFieldForm() {
        let types = ['text', 'textarea']
        let response = types.indexOf(this.template.form.type)
        return (response == -1) ? false : true
      }
    },
    methods: {
      //Init template
      async init() {
        this.loading = true
        await this.getData()//Get data product
        this.getOptions()//Get options avaliable
        this.loading = false
      },
      //Get Data from product
      getData() {
        return new Promise((resolve, reject) => {
          this.loading = true
          let configName = 'apiRoutes.eCommerce.products'
          let params = {remember: false, params: {include: 'productOptions', fields: 'id'}}
          commerceServices.crud.show(configName, this.productId, params).then(response => {
            this.productOptions = _cloneDeep(response.data.productOptions)//Set product Options
            this.productOptionValues = _cloneDeep(response.data.optionValues)//Set product options values
            this.loading = false
            resolve(true)
          }).catch(error => {
            this.loading = false
            this.$helper.alert.error('Failed: ' + error)
            reject(false)
          })
        })
      },
      //Get option values
      getOptionValues(optionId, itemName = 'values') {
        this.loading = true
        let configName = 'apiRoutes.eCommerce.optionValues'
        let params = {params: {filter: {optionId: optionId}}}
        commerceServices.crud.index(configName, params).then(response => {
          this.template[itemName] = []//Reset options of template
          response.data.forEach(item => {//Order response as select
            this.template[itemName].push({label: item.description, id: item.id})
          })
          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$helper.alert.error('Failed: ' + error)
        })
      },
      //Add to list option no added
      addOption(optionId = false) {
        if(optionId) this.modal.parentOption = this.findOption(optionId)
        else this.modal.parentOption = 0
        this.modal.show = true
      },
      //Create Product option just with product and option ID
      createProductOption() {
        if (this.modal.optionSelected) {
          this.modal.loading = true
          let configName = 'apiRoutes.eCommerce.productOptions'
          let dataOption = {//Data to create option
            productId: this.productId,
            optionId: this.modal.optionSelected.toString(),
            parentId: this.modal.parentOption.id
          }
          //Request
          commerceServices.crud.create(configName, dataOption).then(async response => {
            await this.getData()//Get data again
            this.modal.optionSelected = null//Reset option of select options
            //Get last option create
            for (var item of this.productOptions) {
              let currentOption = _cloneDeep(this.template.currentOption)
              if (item.id >= currentOption) this.template.currentOption = item.id
            }
            this.setDataOption()//Set data option
            this.$refs.optionList.vRefresh()//Refresh List options
            this.modal.loading = false
            this.modal.show = false
          }).catch(error => {
            this.$helper.alert.error('Failed: ' + error, 'bottom')
            this.modal.loading = false
          })
        }
      },
      //Update Product Option
      updateProductOption() {
        this.loading = true
        let configName = 'apiRoutes.eCommerce.productOptions'//Config Name
        let form = _cloneDeep(this.template.form)//Get form
        if (!form.parentId) form.parentId = null//Set null as default parent
        if (!form.parentOptionValueId) form.parentOptionValueId = null//Set null as default parent option

        //Request
        commerceServices.crud.update(configName, form.id, form).then(response => {
          this.setDataOption()
          this.loading = false
        }).catch(error => {
          this.$helper.alert.error('Failed: ' + error, 'bottom')
          this.loading = false
        })
      },
      //Delete option
      deleteOption(optionId) {
        if (this.checkToDeleteOption(optionId)) {
          const option = this.findOption(optionId)
          //Dialog to comfirm delete
          this.$q.dialog({
            title: option.keyDescription,
            message: 'Do you want delete this option?',
            color: 'negative',
            preventClose: true,
            ok: true,
            cancel: true
          }).then(response => {//If comfirn delete action
            this.loading = true
            let configName = 'apiRoutes.eCommerce.productOptions'
            //Request
            commerceServices.crud.delete(configName, optionId, {params: {}}).then(async response => {
              this.template.currentOption = null//Set null current option
              await this.getData()//Get data
              this.$refs.optionList.vRefresh()//Refresh List options
              this.loading = false
            }).catch(error => {
              this.$helper.alert.error('Failed: ' + error, 'bottom')
              this.loading = false
            })
          }).catch(response => {
          })
        }
      },
      //Check if option is not parent of other option
      checkToDeleteOption(optionId) {
        const currentOption = _cloneDeep(this.template.currentOption)//Get current option
        this.template.currentOption = optionId//Set as current this option
        if (currentOption != optionId) this.setDataOption()//Set data from this option
        const option = this.findOption(optionId, 'parentId')//Find option to check
        if (option)//If exist option, show message to fedbak
          this.$q.dialog({
            title: 'Warning',
            message: 'You cannot delete this option, is parent of "' + option.keyDescription,
            color: 'negative',
          }).then(data => {
            return false//Response
          }).catch(data => {

          })
        else return true//Response
      },
      //Set data and values from product option seleected
      setDataOption() {
        const selectedOption = _cloneDeep(this.template.currentOption)
        const option = _cloneDeep(this.template.form)
        //Update product options
        if (option.id) {
          for (var key in this.productOptions) {
            if (this.productOptions[key].id == option.id)
              this.productOptions[key] = option
          }
        }
        //Set new option
        if (selectedOption) {
          this.setParentOptions()//Order select to parent
          const newOption = this.findOption(selectedOption)//Find new option
          this.template.form = _cloneDeep(newOption)//Update form template
          this.getOptionValues(newOption.optionId)//Get Values from option
          this.setParentValues()//Get parent values
        }
        this.$refs.optionList.vRefresh()//Refresh List options
      },
      //Order in select options to parent
      setParentOptions() {
        this.template.parentOptions = []//Reset parent Options
        const currentOption = _cloneDeep(this.template.currentOption)
        this.productOptions.forEach((item, key) => {
          if (item.id != currentOption)
            this.template.parentOptions.push({
              label: item.description, id: item.id
            })
        })
      },
      //set Parent Values
      setParentValues() {
        const parentId = _cloneDeep(this.template.form.parentId)
        if (parentId) {
          const option = this.findOption(parentId)//Find option
          this.template.form.parentOptionId = option.optionId//Set parent option ID
          this.getOptionValues(option.optionId, 'parentValues')//Get Values from parent option
        } else {//Set null parent option value
          this.template.form.parentOptionId = null
          this.template.parentValues = []
          this.template.form.parentOptionValueId = null
        }
      },
      //Search options to select
      getOptions() {
        this.loadingOptions = true
        let configName = 'apiRoutes.eCommerce.options'
        let params = {refresh: true, params: {}}//Params
        //Request
        commerceServices.crud.index(configName, params).then(response => {
          let options = []
          response.data.forEach(item => {//Order options to tree select
            options.push({label: item.description, id: item.id})
          })
          this.template.options = _cloneDeep(options)
          this.loadingOptions = false
        }).catch(error => {
          this.$helper.alert.error('Failed: ' + error, 'bottom')
          this.loadingOptions = false
        })
      },
      //Find option by parameter
      findOption(value, field = 'id') {
        const options = _cloneDeep(this.productOptions)//Get all options
        let response = false //Default response
        let index = options.findIndex(item => item[field] == value)//Find if this option is parent
        if (index >= 0) {
          response = options[index]//Assign data to response
          //Create keyDescription
          response.keyDescription = (index + 1) + '.' + options[index].description
        }
        return response
      }
    }
  }
</script>

<style lang="stylus">
  @import "~variables";
  #crudOptions
    .border
      border 1px solid $grey-4
</style>