<template>
  <div class="row gutter-x-sm relative-position q-layout-page layout-padding  q-mb-lg backend-page"
       v-if="success">
    <div class="col-12 box">
      <div class="row">
        <div class="col-12 q-mb-md">
          <locales v-model="locale" ref="localeComponent" :form="$refs.formContent"/>
        </div>
        <q-form @submit="itemId ? updateItem() : createItem()"
                ref="formContent" class="row q-col-gutter-x-sm full-width" autocomplete="off"
                @validation-error="$alert.error($tr('ui.message.formInvalid'))">
          <!--Form left-->
          <div class="col-12" v-if="locale.success">
            <q-input outlined dense v-model="locale.formTemplate.description"
                     :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                     :label="`${$tr('ui.form.description')} (${locale.language})*`"/>
            <div class="input-title">{{$tr('ui.form.image')}}</div>
            <upload-media
                    v-model="locale.formTemplate.mediasSingle"
                    entity="Modules\Icommerce\Entities\OptionValue"
                    :entity-id="itemId ? itemId : null"
                    zone='mainimage'
            />
          </div>
          <!--Button Actions-->
          <div class="col-12 text-right">
            <q-btn v-if="itemId" color="positive" :loading="loading" icon="fas fa-edit"
                   :label="$tr('ui.label.update')" type="submit" rounded/>
            <q-btn v-else color="positive" :loading="loading" icon="fas fa-edit"
                   :label="$tr('ui.label.create')" type="submit" rounded/>
          </div>
        </q-form>
      </div>
    </div>

    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
  import {required} from 'vuelidate/lib/validators'
  import uploadMedia from '@imagina/qmedia/_components/form'

  export default {
    components: {
      uploadMedia
    },
    watch: {
      $route(to, from) {
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
        locale: {},
        loading: false,
        success: false,
        users: [],
        itemId: false,
        optionValues: [],
        pages: [],
      }
    },
    computed: {
      dataLocale() {
        return {
          fields: {
            optionId: this.$route.params.optionId,
            sortOrder: 1,
          },
          fieldsTranslatable: {
            description: '',
          }
        }
      }
    },
    methods: {
      async initForm() {
        this.loading = true
        this.success = false
        this.locale = this.$clone(this.dataLocale)
        this.itemId = this.$route.params.id
        if (this.locale.success) this.$refs.localeComponent.vReset()
        await this.getData()
        this.getoptionValues()
        this.success = true
        this.loading = false
      },
      getData() {
        return new Promise((resolve, reject) => {
          const itemId = this.$clone(this.itemId)
          if (itemId) {
            let configName = 'apiRoutes.qcommerce.optionValues'
            //Params
            let params = {
              refresh: true,
              params: {
                filter: {allTranslations: true}
              }
            }
            //Request
            this.$crud.show(configName, itemId, params).then(response => {
              this.orderDataItemToLocale(response.data)
              resolve(true)//Resolve
            }).catch(error => {
              this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
              this.loading = false
              reject(false)//Resolve
            })
          } else {
            resolve(true)//Resolve
          }
        })
      },
      orderDataItemToLocale(data) {
        let orderData = this.$clone(data)
        this.locale.form = this.$clone(orderData)
      },
      async createItem() {
        if (await this.$refs.localeComponent.validateForm()) {
          this.loading = true
          let configName = 'apiRoutes.qcommerce.optionValues'
          this.$crud.create(configName, this.getDataForm()).then(response => {
            this.$alert.success({message: `${this.$tr('ui.message.recordCreated')} ID: ${response.data.id}`})
            this.$router.push({name: 'qcommerce.admin.options.edit', params: {id: this.$route.params.optionId}})
          }).catch(error => {
            this.loading = false
            this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
          })
        }
      },
      async updateItem() {
        if (await this.$refs.localeComponent.validateForm()) {
          this.loading = true
          let configName = 'apiRoutes.qcommerce.optionValues'
          this.$crud.update(configName, this.itemId, this.getDataForm()).then(response => {
            this.$alert.success({message: `${this.$tr('ui.message.recordUpdated')}`})
            //this.initForm()
            this.loading = false
          }).catch(error => {
            this.loading = false
            this.$alert.error({message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom'})
          })
        }
      },
      getDataForm() {
        let response = this.locale.form
        for (var item in response) {
          let valueItem = response[item]
          if (valueItem == null || valueItem == undefined)
            delete response[item]
        }
        response.selectable = JSON.stringify(response.selectable)
        return response
      },
      getoptionValues() {
        return new Promise((resolve, reject) => {
          let configName = 'apiRoutes.qcommerce.optionValues'
          let params = {//Params to request
            refresh: true,
            params: {
              filter: {
                allTranslations: true,
                optionId : this.$route.params.optionId
              }
            },
          }
          //Request
          this.$crud.index(configName, params).then(response => {
            this.optionValues = this.$array.tree(response.data)
            resolve(true)
          }).catch(error => {
            this.$alert.error('Failed: ' + error, 'bottom')
            reject(true)
          })
        })
      },
      arrayUnique(arrayWithRepeats) {
        return arrayWithRepeats.filter((currentValue, currentIndex, newArray) => {
          return newArray.findIndex(
            valueOfArray => JSON.stringify(valueOfArray) === JSON.stringify(currentValue)
          ) === currentIndex
        });
      },
    }
  }
</script>
