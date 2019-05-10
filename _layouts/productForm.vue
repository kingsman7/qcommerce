<template>
  <div id="productCreatePage" class="q-layout-page layout-padding">

    <!--TITLE-->
    <h1 class="q-headline text-primary">
      <q-icon name="fas fa-box-open"></q-icon>
      Create Product
    </h1>

    <!--Content-->
    <div class="relative-position">
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
            <!--Title-->
            <q-field
              :error="$v.locale.formTemplate.title.$error"
              error-label="This field is required"
            >
              <q-input v-model="locale.formTemplate.title"
                       :stack-label="'Title ('+locale.language+')*'"/>
            </q-field>
            <!--Slug-->
            <q-input v-model="locale.formTemplate.slug"
                     :stack-label="'Slug ('+locale.language+')*'"/>
            <!--Sumario-->
            <q-input v-model="locale.formTemplate.summary" type="textarea"
                     :stack-label="'Summary ('+locale.language+')*'" rows="3"/>
            <!--Description-->
            <q-field
              :error="$v.locale.formTemplate.description.$error"
              error-label="This field is required"
            >
              <div class="input-title">Description ({{locale.language}})*</div>
              <q-editor v-model="locale.formTemplate.description"
                        :toolbar="editorText.toolbar"/>
            </q-field>
          </div>
          <!--Form right-->
          <div class="col-12 col-md-4" v-if="locale.success">
            <!--Status-->
            <div class="input-title">Status</div>
            <treeselect
              :clearable="false"
              :append-to-body="true"
              :options="options.status"
              value-consists-of="BRANCH_PRIORITY"
              v-model="locale.formTemplate.status"
              placeholder=""
            />
            <!--Category-->
            <div class="input-title">Category</div>
            <treeselect
              :clearable="false"
              :append-to-body="true"
              :options="options.categories"
              value-consists-of="BRANCH_PRIORITY"
              v-model="locale.formTemplate.categoryId"
              placeholder=""
            />
            <!--Categories-->
            <div class="input-title">Categories</div>
            <recursive-list v-model="locale.formTemplate.categoriesId"
                            :items="options.categories"/>
          </div>
        </div>
      </div>

      <!--Extra Data-->
      <q-tabs align="justify" class="q-mt-lg shadow-1">
        <!-- Tabs titles-->
        <q-tab default slot="title" name="data" label="Data"/>
        <q-tab slot="title" name="links" label="Links"/>
        <q-tab slot="title" name="images" label="Images"/>
        <q-tab slot="title" name="options" label="Options"/>
        <q-tab slot="title" name="discounts" label="Discounts"/>
        <q-tab slot="title" name="file" label="File"/>
        <q-tab slot="title" name="relatedProducts" label="Related Products"/>
        <q-tab slot="title" name="aditional" label="Aditional"/>

        <!-- Data -->
        <q-tab-pane name="data">
          <div class="row gutter-sm">
            <!--Left-->
            <div class="col-12 col-md-6">
              <!--SKU-->
              <q-input v-model="locale.formTemplate.sku" stack-label="SKU"/>
              <!--Quantity-->
              <q-input v-model="locale.formTemplate.quantity" stack-label="Quantity" type="number" />
              <!--Status-->
              <div class="input-title">Stock Status</div>
              <treeselect
                :clearable="false"
                :append-to-body="true"
                :options="options.stockStatus"
                value-consists-of="BRANCH_PRIORITY"
                v-model="locale.formTemplate.stockStatus"
                placeholder=""
              />
              <!--Price-->
              <q-input v-model="locale.formTemplate.price" stack-label="Price"/>
              <!--availability date-->
              <q-datetime v-model="locale.formTemplate.dateAvailable" stack-label="Availability Date"/>
            </div>
            <!--Right-->
            <div class="col-12 col-md-6"></div>
          </div>
        </q-tab-pane>
        <!-- Links -->
        <q-tab-pane name="links">Tab Two</q-tab-pane>
        <!-- images -->
        <q-tab-pane name="images">Tab Two</q-tab-pane>
        <!-- options -->
        <q-tab-pane name="options">Tab Two</q-tab-pane>
        <!-- discounts -->
        <q-tab-pane name="discounts">Tab Two</q-tab-pane>
        <!-- file -->
        <q-tab-pane name="file">Tab Two</q-tab-pane>
        <!-- Releted products -->
        <q-tab-pane name="relatedProducts">Tab Two</q-tab-pane>
        <!-- aditionals -->
        <q-tab-pane name="aditional">Tab Two</q-tab-pane>
      </q-tabs>

      <!--Loading-->
      <q-inner-loading :visible="loading">
        <div class="q-box-inner-loading">
          <q-spinner-hourglass size="50px" color="primary"/>
          <h6 class="q-ma-none text-primary q-title">Loading...</h6>
        </div>
      </q-inner-loading>
    </div>
  </div>
</template>

<script>
  //Components
  import locales from '@imagina/qsite/_components/locales'
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import recursiveList from 'src/components/master/recursiveListSelect'
  //Services
  import commerceServices from '@imagina/qcommerce/_services/index';
  //Plugins
  import _cloneDeep from 'lodash.clonedeep'
  import {required} from 'vuelidate/lib/validators'

  export default {
    components: {
      locales, Treeselect, recursiveList
    },
    validations() {
      return this.getObjectValidation()
    },
    data() {
      return {
        locale: {},
        loading: false,
        success: false,
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
        options: {
          categories: [],
          status: [
            {label: 'Enabled', id: 1},
            {label: 'Disable', id: 0}
          ],
          stockStatus: [
            {label: 'In Stock', id: 1},
            {label: 'Out Stock', id: 0}
          ]
        }
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.intitForm()
      })
    },
    computed: {
      //Data locale component
      dataLocale() {
        return {
          fields: {
            addedById: 0,
            options: {},
            status: 1,
            userId: 0,
            categoryId: 0,
            categoriesId: [],
            parentId: 0,
            taxClassId: 0,
            sku: 0,
            quantity: 0,
            stockStatus: 0,
            manufacturerId: 0,
            shipping: 0,
            price: 0,
            points: 0,
            dateAvailable: new Date(),
            weight: null,
            length: null,
            width: null,
            height: null,
            subtract: 0,
            minimum: 1,
            reference: null,
            rating: 3,
            orderWeight: null,
            freeshipping: 0
          },
          fieldsTranslatable: {
            name: null,
            slug: '',
            summary: '',
            description: '',
          },
          validations: {
            title: {required},
            description: {required},
          }
        }
      }
    },
    methods: {
      //Init Form
      async intitForm() {
        this.loading = true
        this.locale = _cloneDeep(this.dataLocale)//Add fields
        await this.getCategories()//Get categories
        this.$v.$reset()//Reset validations
        this.success = true//Activate status of page
        this.loading = false
      },
      //Return object to validations
      getObjectValidation() {
        let response = {}
        if (this.locale && this.locale.formValidations)
          response = {locale: this.locale.formValidations}
        return response
      },
      //Get product categories
      getCategories() {
        return new Promise((resolve, reject) => {
          let configName = 'apiRoutes.ecommerce.productCategories'
          let params = {//Params to request
            refresh: true,
            params: {include: 'parent'},
          }
          //Request
          commerceServices.crud.index(configName, params).then(response => {
            this.options.categories = this.$helper.array.tree(response.data)
            this.locale.fields.categoryId = response.data[0].id
            resolve(true)
          }).catch(error => {
            this.$helper.alert.error('Failed: ' + error, 'bottom')
            reject(true)
          })
        })
      },
    }
  }
</script>

<style lang="stylus">
  @import "~variables";
  #productCreatePage
    .border-top-color
      border-top 3px solid $primary
      padding 15px
      min-height 160px

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