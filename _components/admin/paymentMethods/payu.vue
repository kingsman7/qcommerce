<template>
  <q-modal id="formCategory" v-model="show" v-if="show"
           no-esc-dismiss no-backdrop-dismiss class="backend-page">
    <q-modal-layout style="max-width: 1245px">
      <!--Header-->
      <q-toolbar slot="header">
        <q-toolbar-title>Update Payment Method: {{item.title}}</q-toolbar-title>
        <q-btn flat v-close-overlay icon="fas fa-times"/>
      </q-toolbar>
      
      <!--Footer-->
      <q-toolbar slot="footer" color="white">
        <q-toolbar-title></q-toolbar-title>
        <!--Button Update-->
        <q-btn label="Update" icon="fas fa-pen" color="positive"
               :loading="loading" @click="updateItem" />
      </q-toolbar>
      
      <!--Content-->
      <div class="layout-padding relative-position">
        <div class="row gutter-x-md">
          <!--Language-->
          <div class="col-12">
            <span class="input-title q-mr-sm">Language</span>
            <locales v-model="locale" ref="localeComponent" @validate="$v.$touch()"/>
          </div>
          <!--Form left-->
          <div class="col-12 col-md-8" v-if="locale.success">
            <!--Title-->
            <q-field
              :error="$v.locale.formTemplate.title.$error"
              error-label="This field is required"
            >
              <q-input v-model="locale.formTemplate.title"
                       :stack-label="'Title ('+locale.language+')*'"/>
            </q-field>
            
            <!--Description-->
            <q-field
              :error="$v.locale.formTemplate.description.$error"
              error-label="This field is required"
            >
              <div class="input-title">Description ({{locale.language}})*</div>
              <q-input v-model="locale.formTemplate.description"
                        type="textarea" rows="3"/>
            </q-field>
            
            
            <!--Merchant ID-->
            <q-field
            
            >
              <q-input v-model="locale.formTemplate.merchantid"
                       stack-label="Merchant Id"/>
            </q-field>
            
            <!--API login-->
            <q-field
            
            >
              <q-input v-model="locale.formTemplate.apilogin"
                       stack-label="API Login"/>
            </q-field>
  
            <!--API Key-->
            <q-field
  
            >
              <q-input v-model="locale.formTemplate.apikey"
                       stack-label="API Key"/>
            </q-field>
  
            <!--Account ID-->
            <q-field
  
            >
              <q-input v-model="locale.formTemplate.accountid"
                       stack-label="Account Id"/>
            </q-field>
            
            <!--Mode-->
            <q-field
            
            >
              <q-select v-model="locale.formTemplate.mode"
                        :options="[
                        {label:'SANDBOX',value:'sandbox'},
                        {label:'LIVE',value:'live'}
                        ]"
                        stack-label="Mode"/>
            </q-field>
            
              <!--Allow use of Test Credit Cards-->
            <q-field
            
            >
              <q-select v-model="locale.formTemplate.test"
                        :options="[
                        {label:'YES',value:1},
                        {label:'NO',value:0}
                        ]"
                        stack-label="Allow use of Test Credit Cards"/>
            </q-field>
            
            <!--Status-->
            <q-field
            
            >
              <q-toggle v-model="locale.formTemplate.status"
                        label="Active" color="positive"/>
            </q-field>
          
          
          </div>
          <!--Form right-->
          <div class="col-12 col-md-4" v-if="locale.success">
            <!--Main Image-->
            <upload-img
              v-model="locale.formTemplate.mediasSingle"
              entity="Modules\Icommerce\Entities\PaymentMethod"
              button-label="Choose File"
              :entity-id="itemId ? itemId : null"
              zone='mainimage'
            />
          </div>
        </div>
        <!--Loading-->
        <inner-loading :visible="loading"/>
      </div>
    </q-modal-layout>
  </q-modal>
</template>
<script>
  //Services
  import commerceServices from '@imagina/qcommerce/_services/index';
  
  //Components
  import uploadImg from '@imagina/qmedia/_components/form'
  import locales from '@imagina/qsite/_components/locales'
  import innerLoading from 'src/components/master/innerLoading'
  
  //Plugins
  import {required} from 'vuelidate/lib/validators'
  import _cloneDeep from 'lodash.clonedeep'
  import {alert} from '@imagina/qhelper/_plugins/alert'
  
  export default {
    props: {
      value: {default: false},
      itemId: {default: false},
      item: {
        default: () => {
          return {}
        },
      },
    },
    components: {
      uploadImg,
      locales,
      innerLoading
    },
    watch: {
      value(newValue) {
        this.show = this.value
      },
      show(newValue) {
        this.$emit('input', this.show)
        this.initForm()
      },
      item: {
        handler: function (val, oldVal) {
          console.warn("item ",this.item)
          
        },
        deep: true
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.show = this.value//Assign props value to show modal
        
      })
    },
    data() {
      return {
        show: false,
        locale: _cloneDeep(this.dataLocale),
        loading: false
      }
    },
    validations() {
      return this.getObjectValidation()
    },
    computed: {
      //Data locale component
      dataLocale() {
        return {
          fields: {
            merchantid: '',
            apilogin: '',
            apikey: '',
            init: '',
            mode: 'sandbox',
            test: '',
            status: false,
            accountid: '',
            mediasSingle: {}
          },
          fieldsTranslatable: {
            title: null,
            description: '',
          },
          validations: {
            title: {required},
            description: {required}
          }
        }
      }
    },
    methods: {
      //Init form
      async initForm() {
        this.loading = true
        //If ther is category Id, request data, else set default data
        this.locale = _cloneDeep(this.dataLocale)
        
        //initialize item data
        if(this.item)
          this.locale.form = _cloneDeep(this.item)
        this.$v.$reset()//Reset validations
        this.show = this.value//Assign props value to show modal
        this.loading = false
      },
  
      //Return object to validations
      getObjectValidation() {
        let response = {}
        if (this.locale && this.locale.formValidations)
          response = {locale: this.locale.formValidations}
        return response
      },
      
      //update item
      updateItem(){
        this.$refs.localeComponent.vTouch()//Validate component locales
        //Check validations
        if (!this.$v.$error) {
          this.loading = true
          let data = _cloneDeep(this.locale.form);
          data["options"] = {
            merchantid: data.merchantid,
            apilogin: data.apilogin,
            apikey: data.apikey,
            init: data["init"],
            mode: data.mode,
            test: data["test"],
            accountid: data.accountid
          }
          //Request
          commerceServices.crud.update('apiRoutes.eCommerce.paymentMethods', this.item.id, data).then(response => {
    
            this.$alert.success('Payment method updated', 'top')
            this.loading = false
            this.show = false
          }).catch(error => {
            this.loading = false
            this.$helper.alert.error('Failed: ' + error, 'bottom')
          })
        }else{
          this.$helper.alert.error('Please check required fields','bottom')
        }
      }
    }
    
  }
</script>
<style lang="stylus">
  @import "~variables";
</style>
