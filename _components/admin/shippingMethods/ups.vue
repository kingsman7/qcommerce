<template>
  <q-modal id="formCategory" v-model="show" v-if="show"
           no-esc-dismiss no-backdrop-dismiss class="backend-page">
    <q-modal-layout style="max-width: 1245px">
      <!--Header-->
      <q-toolbar slot="header">
        <q-toolbar-title>Update Shipping Method: {{item.title}}</q-toolbar-title>
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
  
      
            
            <!--Access Key-->
            <q-field
            
            >
              <q-input v-model="locale.formTemplate.accesskey"
                       stack-label="Access Key"/>
            </q-field>
            
            <!--User ID-->
            <q-field
            
            >
              <q-input v-model="locale.formTemplate.userid"
                       stack-label="User ID"/>
            </q-field>
  
            <!--password-->
            <q-field
  
            >
              <q-input type="password" v-model="locale.formTemplate.password"
                       stack-label="Password"/>
            </q-field>
  
            <!--shipper postal code-->
            <q-field
  
            >
              <q-input v-model="locale.formTemplate.shipperpostalcode"
                       stack-label="Shipper Postal Code"/>
            </q-field>
  
            <!--Shipper State Code-->
            <q-field
  
            >
              <q-input v-model="locale.formTemplate.shipperstatecode"
                       stack-label="Shipper State Code"/>
            </q-field>
  
            <!--Shipper Country Code-->
            <q-field
  
            >
              <q-input v-model="locale.formTemplate.shippercountrycode"
                       stack-label="Shipper Country Code"/>
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
              entity="Modules\Icommerce\Entities\ShippingMethod"
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
            accesskey: '',
            userid: '',
            password: '',
            mode: "sandbox",
            shipperpostalcode: '',
            shipperstatecode: '',
            shippercountrycode: '',
            init: '',
            status: false,
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
        this.loading = true
        let data = _cloneDeep(this.locale.form);
        data["options"] = {
          accesskey: data.accesskey,
          userid: data.userid,
          password: data.password,
          mode: data.mode,
          shipperpostalcode: data.shipperpostalcode,
          shipperstatecode: data.shipperstatecode,
          shippercountrycode: data.shippercountrycode,
          init: data["init"]
        }
        //Request
        commerceServices.crud.update('apiRoutes.eCommerce.shippingMethods', this.item.id,data).then(response => {
    
          this.$alert.success('Shipping method updated', 'top')
          this.loading = false
          this.show = false
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
</style>
