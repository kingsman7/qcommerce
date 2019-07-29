<template>
  <div id="productFormPage" ref="productFormPage"
       class="q-layout-page layout-padding">

    <!--TITLE-->
    <h1 class="q-headline text-primary">
      <q-icon :name="$route.meta.icon"></q-icon>
      {{$tr($route.meta.title)}}
    </h1>

    <!--Content-->
    <div class="relative-position q-mb-lg backend-page">
      <!--Data-->
      <div class="border-top-color shadow-1">
        <div class="row gutter-x-md" v-if="success">
          <!--Language-->
          <div class="col-12">
            <locales v-model="locale" ref="localeComponent" @validate="$v.$touch()"/>
          </div>
          <!--Form left-->
          <div class="col-12 col-md-8" v-if="locale.success">
            <!--name-->
            <q-field
              :error="$v.locale.formTemplate.name.$error"
              :error-label="$tr('ui.message.fieldRequired')"
            >
              <q-input v-model="locale.formTemplate.name" @input="setSlug()"
                       :stack-label="`${$tr('ui.form.name')} (${locale.language})*`"/>
            </q-field>
            <!--Slug-->
            <q-field
              :error="$v.locale.formTemplate.slug.$error"
              :error-label="$tr('ui.message.fieldRequired')"
            >
              <q-input v-model="locale.formTemplate.slug"
                       :stack-label="`${$tr('ui.form.slug')} (${locale.language})*`"/>
            </q-field>
            <!--Sumario-->
            <q-field
              :error="$v.locale.formTemplate.summary.$error"
              :error-label="$tr('ui.message.fieldRequired')"
            >
              <q-input v-model="locale.formTemplate.summary" type="textarea"
                       :stack-label="`${$tr('ui.form.summary')} (${locale.language})*`" rows="3"/>
            </q-field>
            <!--Description-->
            <q-field
              :error="$v.locale.formTemplate.description.$error"
              :error-label="$tr('ui.message.fieldRequired')"
            >
              <div class="input-title">{{`${$tr('ui.form.description')} (${locale.language})*`}}</div>
              <q-editor v-model="locale.formTemplate.description"
                        :toolbar="editorText.toolbar"/>
            </q-field>
            <!--Meta Title-->
            <q-input v-model="locale.formTemplate.metaTitle"
                     :stack-label="`${$tr('ui.form.metaTitle')} (${locale.language})*`"/>
            <!--Meta Description-->
            <q-input v-model="locale.formTemplate.metaDescription" type="textarea"
                     :stack-label="`${$tr('ui.form.metaDescription')} (${locale.language})*`" rows="3"/>
          </div>
          <!--Form right-->
          <div class="col-12 col-md-4" v-if="locale.success">
            <!--Parent-->
            <div class="input-title">{{`${$tr('ui.form.parent')}`}}</div>
            <tree-select
              v-model="locale.formTemplate.parentId"
              :async="true"
              :load-options="searchProducts"
              :default-options="optionsTemplate.products"
              placeholder=""
            />
            <!--Status-->
            <div class="input-title">{{`${$tr('ui.form.status')}`}}</div>
            <tree-select
              :clearable="false"
              :options="options.status"
              value-consists-of="BRANCH_PRIORITY"
              v-model="locale.formTemplate.status"
              placeholder=""
            />
            <!--Category-->
            <div class="input-title">
              {{`${$tr('ui.form.category')}`}}
              <!--Crud category-->
              <crud :crud-data="import('@imagina/qcommerce/_crud/productCategories')"
                    just-create @created="getCategories"/>
            </div>
            <tree-select
              :clearable="false"
              :options="optionsTemplate.categories"
              value-consists-of="BRANCH_PRIORITY"
              v-model="locale.formTemplate.categoryId"
              placeholder=""
            />
            <!--Categories-->
            <div class="input-title">
              {{`${$trp('ui.form.category')}`}}
              <!--Crud category-->
              <crud :crud-data="import('@imagina/qcommerce/_crud/productCategories')"
                    just-create @created="getCategories"/>
            </div>
            <recursive-list v-model="locale.formTemplate.categories"
                            :items="optionsTemplate.categories"/>
          </div>
        </div>
      </div>

      <!--Extra Data-->
      <q-tabs align="justify" class="q-mt-lg border-top-color shadow-1" v-model="vTab"
              v-if="locale.success" inverted style="padding: 0px !important;">
        <!-- Tabs titles-->
        <q-tab slot="title" name="data" :label="$tr('ui.label.data')"/>
        <q-tab slot="title" name="links" :label="$tr('ui.label.link')"/>
        <q-tab slot="title" name="images" :label="$trp('ui.label.image')"/>
        <q-tab slot="title" name="options" :label="$trp('ui.label.option')"/>

        <!-- Data -->
        <q-tab-pane name="data" keep-alive>
          <div class="row gutter-sm">
            <!--Left-->
            <div class="col-12 col-md-6">
              <!--SKU-->
              <q-input v-model="locale.formTemplate.sku" :stack-label="$tr('ui.form.sku')"/>
              <!--Quantity-->
              <q-input v-model="locale.formTemplate.quantity" :stack-label="$tr('ui.form.quantity')" type="number"/>
              <!--Status-->
              <div class="input-title">{{$tr('ui.form.stock')}}</div>
              <tree-select
                :clearable="false"
                :options="options.stockStatus"
                value-consists-of="BRANCH_PRIORITY"
                v-model="locale.formTemplate.stockStatus"
                placeholder=""
              />
              <!--Price-->
              <q-input v-model="locale.formTemplate.price" :stack-label="$tr('ui.form.price')" type="number"/>
              <!--availability date-->
              <q-datetime v-model="locale.formTemplate.dateAvailable" format="DD MMMM, YYYY"
                          :stack-label="$tr('qcommerce.layout.form.availableDate')"/>
              <!--weight-->
              <q-input v-model="locale.formTemplate.weight" :stack-label="$tr('ui.form.weight')" type="number"/>
              <!--length-->
              <q-input v-model="locale.formTemplate.length" :stack-label="$tr('ui.form.length')" type="number"/>
            </div>
            <!--Right-->
            <div class="col-12 col-md-6">
              <!--width-->
              <q-input v-model="locale.formTemplate.width" :stack-label="$tr('ui.form.width')" type="number"/>
              <!--height-->
              <q-input v-model="locale.formTemplate.height" :stack-label="$tr('ui.form.height')" type="number"/>
              <!--minimum-->
              <q-input :stack-label="$tr('qcommerce.layout.form.minimumOrder')"
                       type="number" v-model="locale.formTemplate.minimum"/>
              <!--reference-->
              <q-input v-model="locale.formTemplate.reference" :stack-label="$tr('ui.form.reference')"/>
              <!--Order Weight-->
              <q-input :stack-label="$tr('qcommerce.layout.form.orderWeight')"
                       v-model="locale.formTemplate.orderWeight"/>
              <!--Points-->
              <q-input v-model="locale.formTemplate.points" :stack-label="$trp('ui.form.point')"/>
              <!--Requires shipping-->
              <q-checkbox :label="$tr('qcommerce.layout.form.requriedShipping')"
                          v-model="locale.formTemplate.shipping" class="q-mt-sm"/>
              <!--Free shipping-->
              <br>
              <q-checkbox :label="$tr('qcommerce.layout.form.freeShipping')"
                          v-model="locale.formTemplate.freeshipping"/>
              <!--Substrac from Stock-->
              <br>
              <q-checkbox :label="$tr('qcommerce.layout.form.subtractFromStock')"
                          v-model="locale.formTemplate.subtract"/>
            </div>
          </div>
        </q-tab-pane>
        <!-- Links -->
        <q-tab-pane name="links" keep-alive>
          <!--Related Products-->
          <div class="input-title">{{$tr('qcommerce.layout.form.relatedProducts')}}</div>
          <tree-select
            v-model="locale.formTemplate.relatedProducts"
            :async="true"
            :multiple="true"
            :load-options="searchProducts"
            :default-options="optionsTemplate.relatedProducts"
            placeholder=""
          />
        </q-tab-pane>
        <!-- images -->
        <q-tab-pane name="images" keep-alive>
          <!--Video-->
          <q-input v-model="locale.formTemplate.options.video" :stack-label="$tr('ui.form.video')"/>
          <div class="input-title">{{$tr('ui.form.image')}}</div>
          <upload-media
            v-model="locale.formTemplate.mediasSingle"
            entity="Modules\Icommerce\Entities\Product"
            :entity-id="productId ? productId : null"
            zone='mainimage'
          />
          <div class="input-title">{{$tr('ui.form.gallery')}}</div>
          <upload-media
            multiple
            v-model="locale.formTemplate.mediasMulti"
            entity="Modules\Icommerce\Entities\Product"
            :entity-id="productId ? productId : null"
            zone='gallery'
          />
        </q-tab-pane>
        <!-- options -->
        <q-tab-pane name="options" keep-alive>
          <crud-options :productId="productId" v-if="productId"/>
          <div v-else class="text-center">
            <div class="q-my-md">
              <q-icon name="fas fa-exclamation-triangle" color="warning"></q-icon>
              {{`${$tr('qcommerce.layout.message.warnAddOpt')}...`}}
            </div>
            <q-btn icon="fas fa-save" :label="options.btn.saveAndEdit"
                   @click="buttonActions.value = 4; createItem()" color="positive"/>
          </div>
        </q-tab-pane>
      </q-tabs>

      <!--Buttons Actions-->
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <!--Update button-->
        <q-btn
          v-if="productId"
          color="positive" :loading="loading"
          icon="fas fa-edit" :label="$tr('ui.label.update')" @click="updateItem()"
        />
        <!--Save button-->
        <q-btn-dropdown :label="buttonActions.label" split v-else :loading="loading"
                        content-style="min-width: 250px !important"
                        color="positive" icon="fas fa-save" @click="createItem()" rounded align="right">
          <q-list link>
            <q-item @click.native="buttonActions = {label : options.btn.saveAndReturn, value : 1}"
                    v-close-overlay>
              {{options.btn.saveAndReturn}}
            </q-item>
            <q-item @click.native="buttonActions = {label : options.btn.saveAndEdit, value : 2}"
                    v-close-overlay>
              {{options.btn.saveAndEdit}}
            </q-item>
            <q-item @click.native="buttonActions = {label : options.btn.saveAndCreate, value : 3}"
                    v-close-overlay>
              {{options.btn.saveAndCreate}}
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-page-sticky>

      <!--Loading-->
      <inner-loading :visible="loading"/>
    </div>
  </div>
</template>

<script>
  //Components
  import locales from '@imagina/qsite/_components/locales'
  import recursiveList from 'src/components/master/recursiveListSelect'
  import uploadMedia from '@imagina/qmedia/_components/form'
  import crudOptions from '@imagina/qcommerce/_components/admin/products/crudOptions'
  //Plugins
  import _cloneDeep from 'lodash.clonedeep'
  import {required} from 'vuelidate/lib/validators'
  import {scroll} from 'quasar'

  const {getScrollTarget, setScrollPosition} = scroll

  export default {
    components: {
      crudOptions,
      locales,
      recursiveList,
      uploadMedia,
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
        vTab: 'data',
        loading: false,
        loadingCategory: false,
        success: false,
        productId: false,
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
        optionsTemplate: {
          categories: [],
          products: [],
          relatedProducts: []
        },
        buttonActions: {label: '', value: 1},
        modalShow: {
          category: false
        }
      }
    },
    computed: {
      //Data locale component
      dataLocale() {
        return {
          fields: {
            parentId: null,
            status: 1,
            categoryId: null,
            categories: [],
            addedById: this.$store.state.quserAuth.userId,
            sku: 0,
            quantity: 0,
            stockStatus: 1,
            price: 0,
            dateAvailable: this.$moment().format('YYYY-MM-DD'),
            weight: 0,
            length: 0,
            width: 0,
            height: 0,
            minimum: 1,
            reference: null,
            shipping: false,
            subtract: false,
            freeshipping: false,
            orderWeight: 0,
            rating: 3,
            points: 0,
            relatedProducts: [],
            productOptions: [],
            mediasSingle: {},
            mediasMulti: {},
            options: {video: null},
            //taxClassId: null,
            //manufacturerId: null,
          },
          fieldsTranslatable: {
            name: '',
            slug: '',
            summary: '',
            description: '',
            metaTitle: '',
            metaDescription: '',
          },
          validations: {
            name: {required},
            description: {required},
            slug: {required},
            summary: {required},
          }
        }
      },
      //Check if update options
      updateOptions() {
        if (this.$route.params.editOptions)
          setTimeout(() => {
            this.vTab = 'options'
            let target = getScrollTarget(this.$refs.productFormPage)
            let offset = this.$refs.productFormPage.scrollHeight
            setScrollPosition(target, offset, 1000)
          }, 500)
      },
      //Options translatables
      options() {
        return {
          status: [
            {label: this.$tr('ui.label.enabled'), id: 1},
            {label: this.$tr('ui.label.disabled'), id: 0}
          ],
          stockStatus: [
            {label: this.$tr('ui.label.available'), id: 1},
            {label: this.$tr('ui.label.soldOut'), id: 0}
          ],
          btn: {
            saveAndReturn: this.$tr('ui.message.saveAndReturn'),
            saveAndEdit: this.$tr('ui.message.saveAndEdit'),
            saveAndCreate: this.$tr('ui.message.saveAndCreate'),
          }
        }
      },
    },
    methods: {
      //Init Form
      async initForm() {
        this.loading = true
        this.success = false//Disable status of page
        this.vTab = 'data'
        this.buttonActions = {label: this.options.btn.saveAndReturn, value: 1}
        this.locale = _cloneDeep(this.dataLocale)//Add fields
        this.productId = this.$route.params.id//Update param from route
        if (this.locale.success) this.$refs.localeComponent.vReset()//Reset locale
        await this.getData()//Get Data Item
        await this.getCategories()//Get categories
        this.$v.$reset()//Reset validations
        this.success = true//Activate status of page
        this.updateOptions
        this.loading = false
      },
      //Get product categories
      getCategories() {
        return new Promise((resolve, reject) => {
          this.loadingCategory = true
          let configName = 'apiRoutes.qcommerce.categories'
          let params = {//Params to request
            refresh: true,
            params: {include: 'parent'},
          }

          //Request
          this.$crud.index(configName, params).then(response => {
            this.optionsTemplate.categories = this.$helper.array.tree(response.data)
            this.locale.fields.categoryId = response.data.length ? response.data[0].id : null
            this.loadingCategory = false
            resolve(true)
          }).catch(error => {
            this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
            this.loadingCategory = false
            reject(true)
          })
        })
      },
      //Get product if is edit
      getData() {
        return new Promise((resolve, reject) => {
          const productId = _cloneDeep(this.productId)
          if (productId) {
            let configName = 'apiRoutes.qcommerce.products'
            //Params
            let params = {
              refresh : true,
              params: {
                include: 'relatedProducts,categories,parent',
                filter: {allTranslations: true}
              }
            }
            //Request
            this.$crud.show(configName, productId, params).then(response => {
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
      //order data item to locale component
      orderDataItemToLocale(data) {
        let orderData = _cloneDeep(data)
        //Set default Parent options
        if (data.parent) this.optionsTemplate.products = this.$helper.array.tree([data.parent])
        //Order categories
        orderData.categories.forEach((item, key) => {
          orderData.categories[key] = item.id
        })
        //Order related products
        orderData.relatedProducts.forEach((item, key) => {
          orderData.relatedProducts[key] = item.id
        })
        //Set default related products options
        if (data.relatedProducts && data.relatedProducts.length)
          this.optionsTemplate.relatedProducts = this.$helper.array.tree(data.relatedProducts)

        this.locale.form = _cloneDeep(orderData)
      },
      //Create Product
      createItem() {
        this.$refs.localeComponent.vTouch()//Validate component locales
        //Check validations
        if (!this.$v.$error) {
          this.loading = true
          let configName = 'apiRoutes.qcommerce.products'
          this.$crud.create(configName, this.getDataForm()).then(response => {
            this.$alert.success({message: `${this.$tr('ui.message.recordCreated')} ID: ${response.data.id}`})
            this.actionAfterCreated(response.data.id)
          }).catch(error => {
            this.loading = false
            this.$alert.error({message: this.$tr('ui.message.recordNoCreatde'), pos: 'bottom'})
          })
        } else {
          this.$alert.error({message: this.$tr('ui.message.formInvalid'), pos: 'bottom'})
        }
      },
      //Update Product
      updateItem() {
        this.$refs.localeComponent.vTouch()//Validate component locales
        //Check validations
        if (!this.$v.$error) {
          this.loading = true
          let configName = 'apiRoutes.qcommerce.products'
          this.$crud.update(configName, this.productId, this.getDataForm()).then(response => {
            this.$alert.success({message: `${this.$tr('ui.message.recordUpdated')}`})
            this.initForm()
          }).catch(error => {
            this.loading = false
            this.$alert.error({message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom'})
          })
        } else {
          this.$alert.error({message: this.$tr('ui.message.formInvalid'), pos: 'bottom'})
        }
      },
      //Get just values not null from form
      getDataForm() {
        let response = this.locale.form
        for (var item in response) {
          let valueItem = response[item]
          if (valueItem == null || valueItem == undefined)
            delete response[item]
        }
        return response
      },
      //Action after created
      actionAfterCreated(id) {
        setTimeout(() => {
          let action = this.buttonActions.value
          switch (action) {
            case 1://redirect to index products
              this.$router.push({name: 'ecommerce.products.index'})
              break;
            case 2://Redirect to update this product
              this.$router.push({name: 'ecommerce.products.edit', params: {id: id}})
              this.loading = false
              break;
            case 3://Reset and init form
              this.$refs.localeComponent.vReset()
              this.loading = false
              break;
            case 4://Redirect to update this product and options
              this.$router.push({
                name: 'ecommerce.products.edit',
                params: {id: id, editOptions: 1},
              })
              this.loading = false
              break;
          }
        }, 2000)
      },
      //Search products
      searchProducts({action, searchQuery, callback}) {
        if (action === 'ASYNC_SEARCH') {
          let configName = 'apiRoutes.qcommerce.products'
          let params = {//Params to request
            params: {filter: {search: searchQuery}},
          }
          //Request
          this.$crud.index(configName, params).then(response => {
            callback(null, this.$helper.array.tree(response.data))
          }).catch(error => {
            this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          })
        }
      },
      //Return object to validations
      getObjectValidation() {
        let response = {}
        if (this.locale && this.locale.formValidations)
          response = {locale: this.locale.formValidations}
        return response
      },
      //Complete slug Only when is creation
      setSlug() {
        if (!this.productId) {
          let title = this.$clone(this.locale.formTemplate.name)
          title = title.split(' ').join('-').toLowerCase()
          this.locale.formTemplate.slug = this.$clone(title.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import "~variables";
</style>
