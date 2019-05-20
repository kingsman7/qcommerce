<template>
  <!--Modal with form to category-->
  <q-modal id="formOption" v-model="show" v-if="show" no-esc-dismiss no-backdrop-dismiss>
    <q-modal-layout style="max-width: 1245px">
      <!--Header-->
      <q-toolbar slot="header">
        <q-toolbar-title v-if="!itemId">New Option</q-toolbar-title>
        <q-toolbar-title v-else>Update Option ID: {{itemId}}</q-toolbar-title>
        <q-btn flat v-close-overlay icon="fas fa-times"/>
      </q-toolbar>

      <!--Footer-->
      <q-toolbar slot="footer" color="white">
        <q-toolbar-title></q-toolbar-title>
        <!--Button Save-->
        <q-btn icon="fas fa-save" color="primary"
               v-if="!itemId" label="Save"
               :loading="loading" @click="createItem()"/>
        <!--Button Update-->
        <q-btn label="Update" icon="fas fa-pen" color="primary"
               :loading="loading" @click="updateItem()" v-else/>
      </q-toolbar>

      <!--Content-->
      <div class="layout-padding relative-position">
        <div class="row gutter-x-md">
          <!--Language-->
          <div class="col-12">
            <span class="input-title q-mr-sm">Language</span>
            <locales v-model="locale" ref="localeComponent" @validate="$v.$touch()"/>
          </div>
          <!--Form-->
          <div class="col-12" v-if="locale.success">
            <!--Description-->
            <q-field
              :error="$v.locale.formTemplate.description.$error"
              error-label="This field is required"
            >
              <q-input v-model="locale.formTemplate.description"
                       :stack-label="'Description ('+locale.language+')*'"/>
            </q-field>
            <!--Type-->
            <q-field
              :error="$v.locale.formTemplate.type.$error"
              error-label="This field is required"
            >
              <q-select
                v-model="locale.formTemplate.type"
                :stack-label="'Type *'"
                :options="types"
              />
            </q-field>
            <!--Sort Order-->
            <q-input v-model="locale.formTemplate.sortOrder" type="number"
                     stack-label="Sort Order" inputmode="numeric"/>
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
    </q-modal-layout>
  </q-modal>
</template>
<script>
  //Services
  import commerceServices from '@imagina/qcommerce/_services/index';
  //Components
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import uploadImg from '@imagina/qmedia/_components/form'
  import locales from '@imagina/qsite/_components/locales'
  //Plugins
  import {required} from 'vuelidate/lib/validators'
  import _cloneDeep from 'lodash.clonedeep'

  export default {
    props: {
      value: {default: false},
      itemId: {default: false}
    },
    components: {uploadImg, Treeselect, locales},
    watch: {
      value(newValue) {
        this.show = this.value
      },
      show(newValue) {
        this.$emit('input', this.show)
        this.initForm()
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.initForm()
      })
    },
    validations() {
      return this.getObjectValidation()
    },
    data() {
      return {
        show: false,
        locale: _cloneDeep(this.dataLocale),
        editorText: {
          toolbar: [
            ['bold', 'italic', 'strike', 'underline', 'removeFormat'],
            ['link'],
            [
              {
                label: 'Font Size',
                icon: 'format_size',
                fixedLabel: true,
                fixedIcon: true,
                list: 'no-icons',
                options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
              }
            ],
            ['quote', 'unordered', 'ordered'],
            ['fullscreen']
          ]
        },
        loading: false,
        types: [
          {label: 'Text', value: 'text'},
          {label: 'Textarea', value: 'textarea'},
          {label: 'Select', value: 'select'},
          {label: 'Radio', value: 'radio'},
          {label: 'Checkbox', value: 'checkbox'},
        ],
      }
    },
    computed: {
      //Data locale component
      dataLocale() {
        return {
          fields: {
            sortOrder: 0,
            type: 'text',
          },
          fieldsTranslatable: {
            description: null,
          },
          validations: {
            description: {required},
            type: {required}
          }
        }
      }
    },
    methods: {
      //Init form
      async initForm() {
        this.loading = true
        //If ther is category Id, request data, else set default data
        if (this.itemId) await this.getDataItem()
        else this.locale = _cloneDeep(this.dataLocale)
        this.$v.$reset()//Reset validations
        this.show = this.value//Assign props value to show modal
        this.loading = false
      },
      //Get data category to update
      getDataItem() {
        return new Promise((resolve, reject) => {
          let configName = 'apiRoutes.eCommerce.options'
          let params = {//Params to request
            refresh: true,
            params: {filter: {allTranslations: true}}
          }
          //Request
          commerceServices.crud.show(configName, this.itemId, params).then(response => {
            this.locale.form = _cloneDeep(response.data)
            resolve(true)
          }).catch(error => {
            this.$helper.alert.error('Failed: ' + error, 'bottom')
            reject(false)
          })
        })
      },
      //Create Category
      createItem() {
        this.$refs.localeComponent.vTouch()//Validate component locales
        //Check validations
        if (!this.$v.$error) {
          this.loading = true
          let configName = 'apiRoutes.eCommerce.options'
          commerceServices.crud.create(configName, this.locale.form).then(response => {
            this.$helper.alert.success('Option created ID: ' + response.data.id)
            this.initForm()
            this.loading = false
            this.show = false
            this.$emit('created', response.data)
          }).catch(error => {
            this.loading = false
            this.$helper.alert.error('Failed: ' + error)
          })
        }
      },
      //Update Category
      updateItem() {
        this.$refs.localeComponent.vTouch()//Validate component locales
        //Check validations
        if (!this.$v.$error) {
          this.loading = true
          let configname = 'apiRoutes.eCommerce.options'
          commerceServices.crud.update(configname, this.itemId, this.locale.form).then(response => {
            this.$helper.alert.success('Option updated ID: ' + this.itemId)
            this.initForm()
            this.loading = false
            this.show = false
            this.$emit('updated', response.data)
          }).catch(error => {
            this.loading = false
            this.$helper.alert.error('Failed: ' + error)
          })
        }
      },
      //Return object to validations
      getObjectValidation() {
        let response = {}
        if (this.locale && this.locale.formValidations)
          response = {locale: this.locale.formValidations}
        return response
      }
    }
  }
</script>
<style lang="stylus">
  @import "~variables";
  #formOption
    .category-image
      height 230px
      width 100%
      background-position center
      background-repeat no-repeat
      background-size cover
      padding 10px

    .q-modal-layout
      .q-layout-header, .q-layout-footer
        box-shadow none !important

      .layout-padding
        padding 15px

    .q-input, .q-select
      padding-bottom 0px

      &:before
        border 1px solid transparent

      .q-if-inner
        border 1px solid $grey-4
        padding 5px 3px

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

    .q-field
      .q-field-bottom
        padding-top 3px
        margin 0px
        border none

    .vue-treeselect
      border 1px solid $grey-4

      .vue-treeselect__control
        border 0px !important

      .vue-treeselect__single-value
        font-size 15px
        height 36px
        padding 5px 3px
        line-height 1.8

    .q-btn
      box-shadow none

    .input-title
      color $grey-8
      font-size 12px
      margin-left 4px
      padding 6px 0

</style>