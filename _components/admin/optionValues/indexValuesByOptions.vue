<template>
  <div class="row gutter-y-sm relative-position">
    <div class="col-md-12 ">
      <div class="float-right">
        <q-btn :to="{name: 'qcommerce.admin.options'}" icon="fas fa-arrow-alt-circle-left"
               color="primary" class="q-ml-xs"/>
        <q-btn :to="{name: 'qcommerce.admin.optionValues.create', params: {optionId: $route.params.id}}" icon="fas fa-edit"
               :label="$tr('qcommerce.layout.newOptionValue')" color="positive" class="q-ml-xs"/>
        <q-btn @click="getItems(true)" icon="fas fa-sync-alt" color="info" class="q-ml-xs">
          <q-tooltip :delay="300">
            {{$tr('ui.label.refresh')}}
          </q-tooltip>
        </q-btn>
      </div>
    </div>

    <div class="col-12 q-mt-sm">
      <nestedoptionValues :optionValues="optionValues" @updated="getItems(true)"/>
    </div>

    <div class="col-12 text-right q-mt-sm">
      <q-btn v-if="optionValues.length" @click="updateOrder" icon="fas fa-save" :label="$tr('ui.label.save')"
             color="positive" class="q-ml-xs"/>
    </div>

    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
  import nestedoptionValues from '@imagina/qcommerce/_components/admin/optionValues/nested'

  export default {
    components: {
      nestedoptionValues,
    },
    data() {
      return {
        loading: false,
        optionValues: [],
        modalNewItem: false,
        modalUpdateItem: false,
        itemUpdate: {},
        itemDelete: {},
      }
    },
    created() {
      this.$nextTick(() => {
        this.getItems()
        this.$root.$on('updateoptionValues', this.handlerUpdateoptionValues)
      })
    },
    methods: {
      getItems(refresh = false) {
        this.loading = true
        let optionId = this.$route.params.id
        let params = {
          refresh: refresh,
          params: {include: 'optionValues'},
        }

        this.$crud.show('apiRoutes.qcommerce.options', optionId, params).then(response => {
          this.optionValues = response.data.optionValues
          this.loading = false
        }).catch(error => {
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          this.loading = false
        })
      },
      updateOrder() {
        let newdata = []
        this.treeToArray(this.optionValues, newdata)
        this.loading = true
        this.$crud.create('apiRoutes.qcommerce.optionValuesOrdener', {optionValues: newdata})
          .then(response => {
            this.loading = false
            this.$alert.success({message: `${this.$tr('ui.message.recordUpdated')}`})
          })
          .catch(error => {
            this.loading = false
            this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          })
      },
      arrayToTree(elements, parentId = 0) {
        return elements.filter(element => {
          if (element.parentId == parentId) {
            return element['children'] = this.arrayToTree(elements, element.id)
          }
        })
      },
      treeToArray(items, response, parentId = null) {
        let elements = [...items]
        elements.forEach((element, index) => {
          element.position = index
          element.parentId = parentId
          response.push(element)
          if (element.children.length) this.treeToArray(element.children, response, element.id)
        })
      },
      handlerUpdateoptionValues(event) {
        this.getItems()
      }
    }
  }
</script>
