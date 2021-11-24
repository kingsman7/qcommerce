<template>
  <div id="showOrderPage">
    <!--page actions-->
    <div class="box box-auto-height q-mb-md">
      <page-actions @refresh="init" :exclude-actions="['export']"
                    :title="`${$tr($route.meta.title)} #${ orderId.toString().padStart(5, '0')}`"/>
    </div>

    <!--Dynamic blocks-->
    <div id="dynamicBlocksContent" class="row q-col-gutter-md">
      <div v-for="(col, keyCol) in informationBlocks" :key="keyCol" class="col-12 col-md-6">
        <div v-for="(block, keyBlock) in col" :key="keyBlock" class="box box-auto-height q-mb-md">
          <!--Title-->
          <div class="box-title">
            <q-icon v-if="block.icon" :name="block.icon"/>
            {{ block.title }}
          </div>
          <q-separator class="q-my-sm"/>
          <!--Values-->
          <q-list>
            <q-item v-for="(item, index) in block.values" :key="index" class="q-px-none">
              <q-item-section>
                <q-item-label>{{ item.label }}</q-item-label>
                <q-item-label caption v-html="item.value"/>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>

    <!--Products List-->
    <div class="box q-mb-md">
      <div class="box-title">
        {{ $trp('ui.label.product') }}
      </div>
      <q-separator class="q-mt-sm q-mb-md"/>
      <!--Products Table-->
      <orderItems :items="order.items"/>
    </div>

    <!--Actions-->
    <div class="row q-col-gutter-md q-mb-md">
      <!--Status info-->
      <div class="col-12 col-md-6">
        <!--Tracking info-->
        <div id="trackingOrderStatusContent" class="box box-auto-height">
          <div class="box-title">
            {{ $tr('qcommerce.layout.orderHistory') }}
          </div>
          <q-separator class="q-mt-sm q-mb-md"/>
          <!--timeline-->
          <q-timeline color="info" class="q-mb-none">
            <q-timeline-entry v-for="(item, keyItem) in timeLine" :key="keyItem" :title="item.title"
                              :subtitle="item.subtitle" :body="item.body"/>
          </q-timeline>
        </div>
        <!--Form status-->
        <div class="box q-mt-md" v-if="canEditOrder">
          <div class="box-title">
            {{ $tr('qcommerce.layout.newStatus') }}
          </div>
          <q-separator class="q-mt-sm q-mb-md"/>
          <dynamic-form v-bind="formStatus" @sent="init()"/>
        </div>
      </div>
      <!--Chat-->
      <div class="col-12 col-md-6" v-if="conversation">
        <div class="box">
          <div class="box-title">{{ $trp('ui.label.message') }}</div>
          <q-separator class="q-mt-sm q-mb-md"/>
          <advance-chat :room-id="conversation.id"/>
        </div>
      </div>
    </div>

    <!--inner-loading-->
    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
import orderStatusHistory from '@imagina/qcommerce/_components/admin/orders/orderStatusHistory';
import orderItems from '@imagina/qcommerce/_components/frontend/orders/orderItems';
import addStatusOrder from '@imagina/qcommerce/_components/admin/orders/addStatusOrder'
import advanceChat from '@imagina/qchat/_components/advancedChat'

export default {
  components: {
    orderItems,
    orderStatusHistory,
    addStatusOrder,
    advanceChat
  },
  beforeDestroy() {
    this.$root.$off('page.data.refresh')
  },
  data() {
    return {
      loading: false,
      order: {
        customer: {
          fullName: ''
        },
        items: [],
      },
      conversation: false
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    //Return orderID
    orderId() {
      return this.$clone(this.$route.params.id)
    },
    //return information block by columns
    informationBlocks() {
      //instance cols number
      let formColNumber = 2
      //instance response with cols number
      let response = Array(formColNumber).fill(0).map((_, i) => []);
      //Instance informationBlocks from order and add last block with totals data
      let informationBlocks = [...this.$clone(this.order.informationBlocks || []), {
        title: 'Total',
        values: [
          {
            label: this.$tr('qcommerce.layout.subtotal'),
            value: `$${this.$n(this.order.total - this.order.shippingAmount)}`
          },
          {
            label: this.$tr('qcommerce.layout.shipping'),
            value: `$${this.$n(this.order.shippingAmount)}`
          },
          {
            label: this.$tr('qcommerce.layout.form.total'),
            value: `$${this.$n(this.order.total)}`
          }
        ]
      }]

      //split blocks in cols
      let posColumn = 0
      informationBlocks.forEach(block => {
        response[posColumn].push(block)
        posColumn = (posColumn >= (formColNumber - 1)) ? 0 : (posColumn + 1)
      })

      //response
      return response
    },
    //validate if can edit order
    canEditOrder() {
      return ((config('app.mode') == 'iadmin') && this.$auth.hasAccess('icommerce.orders.edit')) ? true : false
    },
    //Edit order status form
    formStatus() {
      return {
        formType: 'grid',
        sendTo: {
          apiRoute: 'apiRoutes.qcommerce.orderStatusHistory',
          extraData: {orderId: this.orderId}
        },
        blocks: [{
          fields: {
            status: {
              value: null,
              type: 'select',
              required: true,
              props: {
                label: `${this.$tr('ui.form.status')}*`
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qcommerce.orderStatus'
              }
            },
            notify: {
              value: '0',
              type: 'select',
              required: true,
              props: {
                label: 'Notificar al Cliente*',
                options: [
                  {label: this.$tr('ui.label.yes'), value: 1},
                  {label: this.$tr('ui.label.no'), value: 0},
                ]
              }
            },
            comment: {
              value: null,
              type: 'input',
              colClass: 'col-12',
              props: {
                label: this.$tr('ui.form.comment'),
                type: 'textarea',
                rows: "3"
              }
            }
          }
        }]
      }
    },
    //Return order status history
    timeLine() {
      return !this.order.histories ? [] : this.order.histories.reverse().map(item => {
        return {
          title: item.status.title,
          subtitle: this.$trd(item.created_at, {type: 'long'}),
          body: item.comment || null
        }
      })
    }
  },
  methods: {
    init() {
      this.getData()
      //Listen refresh event
      this.$root.$on('page.data.refresh', () => this.getOrder())
    },
    //get data
    getData() {
      return new Promise(async (resolve, reject) => {
        this.loading = true
        await Promise.all([
          this.getOrder(),
          this.getChatConversation()
        ])
        this.loading = false
      })
    },
    //Get order data
    getOrder() {
      return new Promise((resolve, reject) => {
        //Request params
        let requestParams = {
          refresh: true,
          params: {include: 'shippingDepartment,shippingCountry,customer.addresses,customer.fields'}
        }
        //Request
        this.$crud.show('apiRoutes.qcommerce.orders', this.orderId, requestParams).then(response => {
          this.order = response.data
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //get chateable
    getChatConversation() {
      return new Promise((resolve, reject) => {
        //Request Params
        let requestParams = {
          params: {
            filter: {field: 'entity_id', entity_type: 'Modules\\Icommerce\\Entities\\Order'}
          }
        }
        //request
        this.$crud.show('apiRoutes.qchat.conversations', this.orderId, requestParams).then(response => {
          this.conversation = this.$clone(response.data)
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
</script>

<style lang="stylus">
#trackingOrderStatusContent
  .q-timeline__entry
    .q-timeline__subtitle
      text-transform none
      margin 0px

    .q-timeline__content
      font-size 12px
      color $grey-7

      .q-timeline__title
        font-size 13px
        margin 0px
        font-weight bold
        color $grey-8
</style>
