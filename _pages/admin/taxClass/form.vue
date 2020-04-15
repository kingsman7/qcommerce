<template>
  <div id="pageId" class="q-layout-page layout-padding">

    <div class="relative-position q-mb-lg backend-page" v-if="success">
      <div class="box">

        <div class="col-12">
          <locales v-model="locale" ref="localeComponent" :form="$refs.formContent"/>
        </div>

        <!--Form-->
        <q-form autocorrect="off" autocomplete="off" ref="formContent" class="full-width q-my-sm" v-if="locale.success"
                @submit="$route.params.id?updateItem():createItem()" @validation-error="$alert.error($tr('ui.message.formInvalid'))">
          <q-input outlined dense v-model="locale.formTemplate.name"
                   :label="`${$tr('ui.form.name')} (${locale.language})*`"
                   :rules="[val => !!val || this.$tr('ui.message.fieldRequired')]"/>
          <q-input outlined dense v-model="locale.formTemplate.description"
                   :label="`${$tr('ui.form.description')} (${locale.language})*`"
                   :rules="[val => !!val || this.$tr('ui.message.fieldRequired')]"/>
          <div class="row">
            <div class="col-12 text-right q-py-sm">
              <q-btn color="positive" :loading="loading" @click="locale.formTemplate.rates.push(defaultRate)"
                     icon="fas fa-plus" />
            </div>
            <div v-if="locale.formTemplate.rates" v-for="(rate,i) in locale.formTemplate.rates" :key="i" class="col-12 q-py-xs">
              <div class="row q-col-gutter-sm">
                <div class="col-8 col-sm-10">
                  <q-select outlined dense bg-color="white" v-model="rate.taxRateId"
                            :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
                            :label="`${$tr('qcommerce.layout.form.taxRate')}*`" style="width: 100%;"
                            emit-value map-options :options="optionsRate"
                  />
                </div>
                <div class="col-4 col-sm-2 text-right">
                  <q-btn color="negative" :loading="loading" @click="deleteRateItem(i)"
                         icon="fas fa-trash" />
                </div>
              </div>
            </div>
          </div>
        </q-form>
        <inner-loading :visible="loading"/>
      </div>
      <q-page-sticky
              position="bottom-right"
              :offset="[18, 18]">
        <!--Update button-->
        <q-btn v-if="$route.params.id" color="positive" :loading="loading"
               icon="fas fa-edit" :label="$tr('ui.label.update')" type="submit"/>
        <!--Save button-->
        <q-btn v-else color="positive" :loading="loading" icon="fas fa-edit"
               :label="$tr('ui.label.create')" type="submit"/>
      </q-page-sticky>
    </div>
  </div>
</template>

<script>

  export default {
    components: {
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
    data() {
      return {
        locale: {},
        loading: false,
        success: false,
        itemId: false,
        optionsRate: [],
      }
    },
    computed: {
      dataLocale() {
        return {
          fields: {
            rates: []
          },
          fieldsTranslatable: {
            description: '',
          }
        }
      },
      defaultRate(){
        return {
          taxRateId: '',
          priority: this.locale.formTemplate.rates.length+1
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
        await this.getTaxRates()
        this.success = true
        this.loading = false
      },
      getData() {
        return new Promise((resolve, reject) => {
          const itemId = this.$clone(this.itemId)
          if (itemId) {
            let configName = 'apiRoutes.qcommerce.taxClasses'
            //Params
            let params = {
              refresh: true,
              params: {
                include: 'rates',
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
      getTaxRates() {
        return new Promise((resolve, reject) => {
            let configName = 'apiRoutes.qcommerce.taxRates'
            //Params
            let params = {
              refresh: true,
              params: {
                filter: {allTranslations: true}
              }
            }
            //Request
            this.$crud.index(configName, params).then(response => {
              this.optionsRate =  response.data.map(item => {
                return {
                  value: item.id,
                  label: item.name,
                }
              })
              resolve(true)
            }).catch(error => {
              this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
              this.loading = false
              reject(false)//Resolve
            })
        })
      },
      deleteRateItem(i){
        this.locale.formTemplate.rates.splice(i,1)
        let rates = this.$clone(this.locale.formTemplate.rates);
        this.locale.formTemplate.rates = rates.map((item, index) =>{
          return {
            taxRateId: item.taxRateId,
            priority: index+1,
          }
        })
      },
      orderDataItemToLocale(data) {
        let orderData = this.$clone(data)
        this.locale.form = this.$clone(orderData)
      },
      async updateItem() {
        if (await this.$refs.localeComponent.validateForm()) {
          this.loading = true
          let configName = 'apiRoutes.qcommerce.taxClasses'
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
      async createItem() {
        if (await this.$refs.localeComponent.validateForm()) {
          this.loading = true
          let configName = 'apiRoutes.qcommerce.taxClasses'
          this.$crud.create(configName, this.getDataForm()).then(response => {
            this.$alert.success({message: `${this.$tr('ui.message.recordCreated')}`})
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
    }
  }
</script>

<style scoped>

</style>
