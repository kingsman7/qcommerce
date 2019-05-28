<template>
  <div id="productFormPage" ref="productFormPage"
       class="q-layout-page layout-padding">

    <!--TITLE-->
    <h1 class="q-headline text-primary">
      <q-icon name="fas fa-box-open" class="q-mr-sm"></q-icon>
      <span v-if="productId">
        Update Product ID:{{productId}}
      </span>
      <span v-else>Create Product</span>
    </h1>

    <!--Content-->
    <div class="relative-position q-mb-lg backend-page">
      <!--Data-->
      <div class="border-top-color shadow-1">
        <div class="row gutter-x-md" v-if="success">
          <!--Language-->
          <div class="col-12">
            <span class="input-title q-mr-sm">Language</span>
            <locales v-model="locale" ref="localeComponent" @validate="$v.$touch()"/>
          </div>
          <!--Form left-->
          <div class="col-12 col-md-8" v-if="locale.success">
            <!--name-->
            <q-field
              :error="$v.locale.formTemplate.name.$error"
              error-label="This field is required"
            >
              <q-input v-model="locale.formTemplate.name" @input="setSlug()"
                       :stack-label="'name ('+locale.language+')*'"/>
            </q-field>
            <!--Slug-->
            <q-field
              :error="$v.locale.formTemplate.slug.$error"
              error-label="This field is required"
            >
              <q-input v-model="locale.formTemplate.slug"
                       :stack-label="'Slug ('+locale.language+')*'"/>
            </q-field>
            <!--Sumario-->
            <q-field
              :error="$v.locale.formTemplate.summary.$error"
              error-label="This field is required"
            >
              <q-input v-model="locale.formTemplate.summary" type="textarea"
                       :stack-label="'Summary ('+locale.language+')*'" rows="3"/>
            </q-field>
            <!--Description-->
            <q-field
              :error="$v.locale.formTemplate.description.$error"
              error-label="This field is required"
            >
              <div class="input-title">Description ({{locale.language}})*</div>
              <q-editor v-model="locale.formTemplate.description"
                        :toolbar="editorText.toolbar"/>
            </q-field>
            <!--Meta Title-->
            <q-input v-model="locale.formTemplate.metaTitle"
                     :stack-label="'Meta Title ('+locale.language+')'"/>
            <!--Meta Description-->
            <q-input v-model="locale.formTemplate.metaDescription" type="textarea"
                     :stack-label="'Meta Description ('+locale.language+')'" rows="3"/>
          </div>
          <!--Form right-->
          <div class="col-12 col-md-4" v-if="locale.success">
            <!--Parent-->
            <div class="input-title">Parent</div>
            <treeselect
              v-model="locale.formTemplate.parentId"
              :async="true"
              :load-options="searchProducts"
              :default-options="optionsTemplate.products"
              placeholder=""
            />
            <!--Status-->
            <div class="input-title">Status</div>
            <treeselect
              :clearable="false"
              :options="optionsTemplate.status"
              value-consists-of="BRANCH_PRIORITY"
              v-model="locale.formTemplate.status"
              placeholder=""
            />
            <!--Category-->
            <div class="input-title">Category</div>
            <treeselect
              :clearable="false"
              :options="optionsTemplate.categories"
              value-consists-of="BRANCH_PRIORITY"
              v-model="locale.formTemplate.categoryId"
              placeholder=""
            />
            <!--Categories-->
            <div class="input-title">Categories</div>
            <recursive-list v-model="locale.formTemplate.categories"
                            :items="optionsTemplate.categories"/>
          </div>
        </div>
      </div>

      <!--Extra Data-->
      <q-tabs align="justify" class="q-mt-lg border-top-color shadow-1" v-model="vTab"
              v-if="locale.success" inverted style="padding: 0px !important;">
        <!-- Tabs titles-->
        <q-tab slot="title" name="data" label="Data"/>
        <q-tab slot="title" name="links" label="Links"/>
        <q-tab slot="title" name="images" label="Images"/>
        <q-tab slot="title" name="options" label="Options"/>
        <!--<q-tab slot="title" name="discounts" label="Discounts"/>
        <q-tab slot="title" name="file" label="File"/>
        <q-tab slot="title" name="relatedProducts" label="Related Products"/>-->

        <!-- Data -->
        <q-tab-pane name="data" keep-alive>
          <div class="row gutter-sm">
            <!--Left-->
            <div class="col-12 col-md-6">
              <!--SKU-->
              <q-input v-model="locale.formTemplate.sku" stack-label="SKU"/>
              <!--Quantity-->
              <q-input v-model="locale.formTemplate.quantity" stack-label="Quantity" type="number"/>
              <!--Status-->
              <div class="input-title">Stock Status</div>
              <treeselect
                :clearable="false"
                :options="optionsTemplate.stockStatus"
                value-consists-of="BRANCH_PRIORITY"
                v-model="locale.formTemplate.stockStatus"
                placeholder=""
              />
              <!--Price-->
              <q-input v-model="locale.formTemplate.price" stack-label="Price" type="number"/>
              <!--availability date-->
              <q-datetime v-model="locale.formTemplate.dateAvailable" stack-label="Availability Date"/>
              <!--weight-->
              <q-input v-model="locale.formTemplate.weight" stack-label="Weight" type="number"/>
              <!--length-->
              <q-input v-model="locale.formTemplate.length" stack-label="Length" type="number"/>
            </div>
            <!--Right-->
            <div class="col-12 col-md-6">
              <!--width-->
              <q-input v-model="locale.formTemplate.width" stack-label="Width" type="number"/>
              <!--height-->
              <q-input v-model="locale.formTemplate.height" stack-label="Height" type="number"/>
              <!--minimum-->
              <q-input v-model="locale.formTemplate.minimum" stack-label="Minimum Order" type="number"/>
              <!--reference-->
              <q-input v-model="locale.formTemplate.reference" stack-label="Reference"/>
              <!--Order Weight-->
              <q-input v-model="locale.formTemplate.orderWeight" stack-label="Order Weight"/>
              <!--Points-->
              <q-input v-model="locale.formTemplate.points" stack-label="Points"/>
              <!--Requires shipping-->
              <q-checkbox v-model="locale.formTemplate.shipping" label="Requires Shipping" class="q-mt-sm"/>
              <!--Free shipping-->
              <br>
              <q-checkbox v-model="locale.formTemplate.freeshipping" label="Free Shipping"/>
              <!--Substrac from Stock-->
              <br>
              <q-checkbox v-model="locale.formTemplate.subtract" label="Subtract From Stock"/>
            </div>
          </div>
        </q-tab-pane>
        <!-- Links -->
        <q-tab-pane name="links" keep-alive>
          <!--Related Products-->
          <div class="input-title">Related Products</div>
          <treeselect
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
          <q-input v-model="locale.formTemplate.options.video" stack-label="Video"/>
          <div class="input-title">Image</div>
          <upload-media
            v-model="locale.formTemplate.mediasSingle"
            entity="Modules\Icommerce\Entities\Product"
            button-label="Choose File"
            :entity-id="productId ? productId : null"
            zone='mainimage'
          />
          <div class="input-title">Gallery</div>
          <upload-media
            multiple
            v-model="locale.formTemplate.mediasMulti"
            entity="Modules\Icommerce\Entities\Product"
            button-label="Choose File"
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
              To add options, you must first create this product ...
            </div>
            <q-btn icon="fas fa-save" label="save and continue editing"
                   @click="buttonActions.value = 4; createItem()" color="positive"/>
          </div>
        </q-tab-pane>
        <!-- discounts -->
        <q-tab-pane name="discounts">Discount</q-tab-pane>
        <!-- file -->
        <q-tab-pane name="file">Files</q-tab-pane>
        <!-- Releted products -->
        <q-tab-pane name="relatedProducts">Related products</q-tab-pane>
      </q-tabs>

      <!--Buttons Actions-->
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <!--Update button-->
        <q-btn
          v-if="productId"
          color="positive" :loading="loading"
          icon="fas fa-edit" label="Update" @click="updateItem()"
        />
        <!--Save button-->
        <q-btn-dropdown :label="buttonActions.label" split v-else :loading="loading"
                        color="positive" icon="fas fa-save" @click="createItem()" rounded >
          <q-list link>
            <q-item @click.native="buttonActions = {label : 'Save and return', value : 1}">
              Save and return
            </q-item>
            <q-item @click.native="buttonActions = {label : 'Save and continue editing', value : 2}">
              Save and continue editing
            </q-item>
            <q-item @click.native="buttonActions = {label : 'Save and create a new', value : 3}">
              Save and create a new
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-page-sticky>

      <!--Loading-->
      <inner-loading :visible="loading"></inner-loading>
    </div>
  </div>
</template>

<script>
  //Components
  import locales from '@imagina/qsite/_components/locales'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import recursiveList from 'src/components/master/recursiveListSelect'
  import uploadMedia from '@imagina/qmedia/_components/form'
  import crudOptions from '@imagina/qcommerce/_components/admin/products/crudOptions'
  import innerLoading from 'src/components/master/innerLoading'
  //Services
  import commerceServices from '@imagina/qcommerce/_services/index';
  //Plugins
  import _cloneDeep from 'lodash.clonedeep'
  import {required} from 'vuelidate/lib/validators'
  import {scroll} from 'quasar'

  const {getScrollTarget, setScrollPosition} = scroll

  export default {
    components: {
      locales,
      Treeselect,
      recursiveList,
      uploadMedia,
      crudOptions,
      innerLoading
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
          status: [
            {label: 'Enabled', id: 1},
            {label: 'Disable', id: 0}
          ],
          stockStatus: [
            {label: 'In Stock', id: 1},
            {label: 'Out Stock', id: 0}
          ],
          products: [],
          relatedProducts: []
        },
        buttonActions: {label: 'Save and return', value: 1}
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
            addedById: this.$store.state.auth.userId,
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
            options: {video:null},
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
      }
    },
    methods: {
      //Init Form
      async initForm() {
        this.loading = true
        this.success = false//Disable status of page
        this.vTab = 'data'
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
          let configName = 'apiRoutes.eCommerce.categories'
          let params = {//Params to request
            refresh: true,
            params: {include: 'parent'},
          }
          //Request
          commerceServices.crud.index(configName, params).then(response => {
            this.optionsTemplate.categories = this.$helper.array.tree(response.data)
            this.locale.fields.categoryId = response.data[0].id
            resolve(true)
          }).catch(error => {
            this.$helper.alert.error('Failed: ' + error, 'bottom')
            reject(true)
          })
        })
      },
      //Get product if is edit
      getData() {
        return new Promise((resolve, reject) => {
          const productId = _cloneDeep(this.productId)
          if (productId) {
            let configName = 'apiRoutes.eCommerce.products'
            //Params
            let params = {
              params: {
                include: 'relatedProducts,categories,parent',
                filter: {allTranslations: true}
              }
            }
            //Request
            commerceServices.crud.show(configName, productId, params).then(response => {
              this.orderDataItemToLocale(response.data)
              resolve(true)//Resolve
            }).catch(error => {
              this.$helper.alert.error('Failed: ' + error)
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
          let configName = 'apiRoutes.eCommerce.products'
          commerceServices.crud.create(configName, this.getDataForm()).then(response => {
            this.$helper.alert.success('Product created ID: ' + response.data.id)
            this.actionAfterCreated(response.data.id)
          }).catch(error => {
            this.loading = false
            this.$helper.alert.error('Failed: ' + error)
          })
        }else{
          this.$helper.alert.error('Please check required fields','bottom')
        }
      },
      //Update Product
      updateItem() {
        this.$refs.localeComponent.vTouch()//Validate component locales
        //Check validations
        if (!this.$v.$error) {
          this.loading = true
          let configName = 'apiRoutes.eCommerce.products'
          commerceServices.crud.update(configName, this.productId, this.getDataForm()).then(response => {
            this.$helper.alert.success('Product updated ID: ' + response.data)
            this.initForm()
          }).catch(error => {
            this.loading = false
            this.$helper.alert.error('Failed: You can not delete this product')
          })
        }else{
          this.$helper.alert.error('Please check required fields','bottom')
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
          let configName = 'apiRoutes.eCommerce.products'
          let params = {//Params to request
            params: {filter: {search: searchQuery}},
          }
          //Request
          commerceServices.crud.index(configName, params).then(response => {
            callback(null, this.$helper.array.tree(response.data))
          }).catch(error => {
            this.$helper.alert.error('Failed: ' + error, 'bottom')
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
      setSlug(){
        if(!this.productId){
          let title = _cloneDeep(this.locale.formTemplate.name)
          title = title.split(' ').join('-').toLowerCase()
          this.locale.formTemplate.slug = _cloneDeep(title)
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import "~variables";
</style>