<template>
  <div id="crudOptions" class="relative-position">
    <!--Form-->
    <div class="row gutter-md">
      <div class="col-12 col-md-4">
        <!--Options-->
        <div class="input-title">Options</div>
        <treeselect
          v-model="template.optionSelected"
          :async="true"
          :append-to-body="true"
          :load-options="searchOptions"
          placeholder=""
          @input="createProductOption()"
        />
        <!--List Product Options-->
        <q-list class="q-mt-sm">
          <q-list-header>Product Options</q-list-header>
          <q-item v-for="(item,key) in productOptions" :key="key">
            <!--Radio-->
            <q-item-side>
              <q-radio v-model="template.currentOption" :val="item.id" @input="setDataOption()"/>
            </q-item-side>
            <!--Label-->
            <q-item-main :label="(key+1) +'. '+item.description"/>
            <!--Button Remove option from response-->
            <q-item-side right>
              <q-btn icon="far fa-trash-alt" color="negative"
                     size="sm" @click="deleteOption(item.id)"></q-btn>
            </q-item-side>
          </q-item>
        </q-list>
      </div>
      <div class="col-12 col-md-8">
        <!--Message to select a option-->
        <div v-if="template.currentOption == null" class="q-pa-lg">
          <q-icon name="fas fa-exclamation-triangle" color="warning"></q-icon>
          Select a product option...
        </div>
        <!--Form Right-->
        <div v-else>
          <!--Form-->
          <div class="row gutter-sm">
            <!--Parent-->
            <div class="col-12 col-md-4">
              <div class="input-title">Parent</div>
              <treeselect
                v-model="template.form.parentId"
                :append-to-body="true"
                :options="template.parentOptions"
                placeholder=""
                @input="setParentValues(); checkToUpdateOption(true);"
              />
            </div>
            <!--Option value parent-->
            <div class="col-12 col-md-4" v-if="showFieldForm && template.parentValues.length">
              <div class="input-title">Parent Option Value</div>
              <treeselect
                v-model="template.form.parentOptionValueId"
                :append-to-body="true"
                :options="template.parentValues"
                placeholder=""
                @input="checkToUpdateOption()"
              />
            </div>
            <!--Option Value-->
            <div class="col-12 col-md-4" v-if="showFieldForm">
              <q-input v-model="template.form.value" stack-label="Option Value" @blur="checkToUpdateOption()"/>
            </div>
            <!--Required-->
            <div class="col-12 col-md-4 self-center">
              <q-checkbox v-model="template.form.required" label="Is Required" @input="checkToUpdateOption()"/>
            </div>
            <!--Option Values-->
            <div class="col-12" v-if="!showFieldForm">
              <crud-option-values :product-option="template.form"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Loading-->
    <q-inner-loading :visible="loading">
      <div class="q-box-inner-loading">
        <q-spinner-hourglass size="50px" color="primary"/>
        <h6 class="q-ma-none text-primary q-title">Loading...</h6>
      </div>
    </q-inner-loading>
  </div>
</template>

<script>
  //components
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import crudOptionValues from '@imagina/qcommerce/_components/admin/products/crudOptionValues'
  //Services
  import commerceServices from '@imagina/qcommerce/_services/index';
  //Plugins
  import _cloneDeep from 'lodash.clonedeep'

  export default {
    props: {
      productId: {default: false}
    },
    components: {Treeselect, crudOptionValues},
    watch: {},
    mounted() {
      this.$nextTick(function () {
        this.init()
      })
    },
    data() {
      return {
        loading: false,
        productOptions: [],//Options
        productOptionValues: [],//Option values
        template: {
          optionSelected: null,
          parentOptions: [],
          currentOption: null,
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
      init() {
        this.loading = true
        this.getData()//Get data product
        this.loading = false
      },
      //Get Data from product
      getData() {
        this.loading = true
        let configName = 'apiRoutes.eCommerce.products'
        let params = {remember: false, params: {include: 'productOptions', fields: 'id'}}
        commerceServices.crud.show(configName, this.productId, params).then(response => {
          this.productOptions = _cloneDeep(response.data.productOptions)//Set product Options
          this.productOptionValues = _cloneDeep(response.data.optionValues)//Set product options values
          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$helper.alert.error('Failed: ' + error)
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
      //Create Product option just with product and option ID
      createProductOption() {
        if (this.template.optionSelected) {
          this.loading = true
          let configName = 'apiRoutes.eCommerce.productOptions'
          let dataOption = {//Data to create option
            productId: this.productId,
            optionId: this.template.optionSelected.toString()
          }
          //Request
          commerceServices.crud.create(configName, dataOption).then(response => {
            this.getData()//Get data again
            this.template.optionSelected = null//Reset option of sleect options
            this.loading = false
          }).catch(error => {
            this.$helper.alert.error('Failed: ' + error, 'bottom')
            this.loading = false
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
            commerceServices.crud.delete(configName, optionId, {params: {}}).then(response => {
              this.template.currentOption = null//Set null current option
              this.getData()//Get data
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
      //Check if parent Change and show confirm
      checkToUpdateOption(changedParent = false) {
        const option = this.findOption(this.template.form.id)//Find option
        const parentId = option.parentId ? option.parentId : undefined
        if (parentId == this.template.form.parentId) return false // Return false
        if (changedParent)
          this.$q.dialog({
            title: 'Warning',
            message: 'If you change "Parent", all "Parent Option Values" will be delete from "Product Option Values"',
            color: 'negative',
            ok: 'Change',
            cancel: true
          }).then(data => {
            this.updateProductOption()
          }).catch(data => {
            this.template.form.parentId = parentId
          })
        else this.updateProductOption()
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
      },
      //Order in select options to parent
      setParentOptions() {
        this.template.parentOptions = []//Reset parent Options
        const currentOption = _cloneDeep(this.template.currentOption)
        this.productOptions.forEach((item, key) => {
          if (item.id != currentOption)
            this.template.parentOptions.push({
              label: (key + 1) + '. ' + item.description, id: item.id
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
      searchOptions({action, searchQuery, callback}) {
        if (action === 'ASYNC_SEARCH') {
          let configName = 'apiRoutes.eCommerce.options'
          let params = {params: {filter: {search: searchQuery}}}//Params
          //Request
          commerceServices.crud.index(configName, params).then(response => {
            let options = []
            response.data.forEach(item => {//Order options to tree select
              options.push({label: item.description, id: item.id})
            })
            callback(null, options)//Return options
          }).catch(error => {
            this.$helper.alert.error('Failed: ' + error, 'bottom')
          })
        }
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
</style>