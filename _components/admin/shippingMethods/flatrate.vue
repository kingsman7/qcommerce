<template>
  <q-modal id="formCategory" v-model="show" v-if="show"
           no-esc-dismiss no-backdrop-dismiss class="backend-page">
    <q-modal-layout style="max-width: 1245px">
      <!--Header-->
      <q-toolbar slot="header">
        <q-toolbar-title>
          {{`${$tr('qcommerce.layout.updateShippingMethod')}: ${item.title}`}}
        </q-toolbar-title>
        <q-btn flat v-close-overlay icon="fas fa-times"/>
      </q-toolbar>

      <!--Footer-->
      <q-toolbar slot="footer" color="white">
        <q-toolbar-title></q-toolbar-title>
        <!--Button Update-->
        <q-btn :label="$tr('ui.label.update')" icon="fas fa-pen" color="positive"
               :loading="loading" @click="updateItem"/>
      </q-toolbar>

      <!--Content-->
      <div class="layout-padding relative-position">
        <div class="row gutter-x-md">
          <!--Language-->
          <div class="col-12">
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
                       :stack-label="`${$tr('ui.form.title')} (${locale.language})*`"/>
            </q-field>

            <!--Description-->
            <q-field
              :error="$v.locale.formTemplate.description.$error"
              error-label="This field is required"
            >
              <div class="input-title">
                {{`${$tr('ui.form.description')} (${locale.language})*`}}
              </div>
              <q-input v-model="locale.formTemplate.description"
                       type="textarea" rows="3"/>
            </q-field>

            <!--Cost-->
            <q-input type="number" v-model="locale.formTemplate.cost"
                     :stack-label="$tr('qcommerce.layout.form.cost')"/>
          </div>
          <!--Form right-->
          <div class="col-12 col-md-4" v-if="locale.success">
            <!--Status-->
            <q-select v-model="locale.formTemplate.status"
                      :options="[
                        {label:$tr('ui.label.enabled'),value:true},
                        {label:$tr('ui.label.disabled'),value:false}
                      ]"
                      :stack-label="$tr('ui.form.status')"/>
            <!--Main Image-->
            <div class="input-title">
              {{$tr('ui.form.image')}}
            </div>
            <upload-img
              v-model="locale.formTemplate.mediasSingle"
              entity="Modules\Icommerce\Entities\ShippingMethod"
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
            cost: 0,
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
        if (this.item)
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
      updateItem() {
        this.$refs.localeComponent.vTouch()//Validate component locales
        //Check validations
        if (!this.$v.$error) {
          this.loading = true
          let data = _cloneDeep(this.locale.form);
          data["options"] = {
            cost: data.cost,
            init: data["init"]
          }
          //Request
          this.$crud.update('apiRoutes.qcommerce.shippingMethods', this.item.id, data).then(response => {
            this.$alert.success({message: this.$tr('ui.message.recordUpdated')})
            this.$emit('updated')
            this.loading = false
            this.show = false

          }).catch(error => {
            this.$alert.error({message: this.$tr('ui.message.recordNoUpdated')})
            this.loading = false
          })
        } else {
          this.$alert.error({message: this.$tr('ui.message.formInvalid'), pos: 'bottom'})
        }
      }
    }

  }
</script>
<style lang="stylus">
  @import "~variables";
</style>
