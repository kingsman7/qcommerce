<template>
  <q-list no-border separator link id="listOptionsCommerce" class="q-pa-none" v-if="!loading">
    <!-- Dropdwon Item -->
    <q-collapsible v-for="(item,key) in productOptions"
                   :key="key" opened icon-toggle>
      <template slot="header">
        <q-radio v-model="optionSelected" :val="item.id" @input="vEmit()"/>
        <q-item-main>{{item.description}}</q-item-main>
        <q-item-side right>
          <q-btn icon="fas fa-plus" color="positive"
                 v-if="permitChildren(item)"
                 size="xs" @click="vEmitAddOption(item.id)">
            <q-tooltip>Add option to: {{item.description}}</q-tooltip>
          </q-btn>
          <q-btn icon="far fa-trash-alt" color="negative"
                 class="q-ml-xs"
                 size="xs" @click="vEmitDelete(item.id)">
            <q-tooltip>Delete option: {{item.description}}</q-tooltip>
          </q-btn>
        </q-item-side>
      </template>
      <recursive-options-list v-if="item.children" :list-items="item.children"
                              :parent-id="item.id" v-model="optionSelected" @add="vEmitAddOption(optionSelected)"
                              @delete="vEmitDelete(optionSelected)" @input="vEmit"/>
    </q-collapsible>
  </q-list>
</template>
<script>
  //Plugins
  import auth from '@imagina/quser/_plugins/auth'
  import _cloneDeep from 'lodash.clonedeep'
  //Services
  import commerceServices from '@imagina/qcommerce/_services/index';

  export default {
    name: 'recursiveOptionsList',
    components: {},
    props: {
      listItems: {default: false},
      parentId: {default: 0},
      value: {default: null}
    },
    watch: {
      listItems() {
        this.init()
      },
      value() {
        this.optionSelected = this.value
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.init()
      })
    },
    data() {
      return {
        loading : false,
        productOptions: [],
        optionSelected: null
      }
    },
    methods: {
      //Init Form
      init() {
        this.loading = true
        this.productOptions = _cloneDeep(this.$helper.array.builTree(this.listItems, this.parentId))
        this.loading = false
      },
      permitChildren(item) {
        let types = ['select', 'radio']
        let response = types.indexOf(item.type)
        return (response == -1) ? false : true
      },
      vEmit() {
        this.$emit('input', this.optionSelected)
      },
      vEmitAddOption(optionId) {
        this.optionSelected = optionId
        this.vEmit()
        this.$emit('add')
      },
      vEmitDelete(optionId) {
        this.optionSelected = optionId
        this.vEmit()
        this.$emit('delete')
      },
      vRefresh() {
        this.init()
      }
    }
  }
</script>
<style lang="stylus">
  @import "~variables";
  #listOptionsCommerce
    .q-item
      padding 0px

      .q-item-side
        &.relative-position
          display: none

    .q-collapsible-inner
      .q-collapsible-sub-item
        padding 0px 0px 0px 15px
</style>


