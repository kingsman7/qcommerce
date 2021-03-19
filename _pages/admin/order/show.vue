<template>
  <div id="pageId" class="q-pa-md">
    <!--TITLE-->
    <div class="box q-mb-md" style="min-height: auto">
      <div class="box-title">
        <q-icon v-if="$route.meta.icon" :name="$route.meta.icon"/>
        {{ $tr($route.meta.title) }} #{{ $route.params.id.toString().padStart(5, '0') }}
      </div>
    </div>

    <!--Dynamic blocks-->
    <div id="dynamicBlocksContent" class="row q-col-gutter-md">
      <!--Block content-->
      <div v-for="(block, key) in order.informationBlocks" :key="key" class="col-12 col-md-6">
        <div class="box">
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

    <!--Products-->
    <div class="box q-mt-md">
      <div class="box-title">
        {{ $trp('ui.label.product') }}
      </div>
      <q-separator class="q-mt-sm q-mb-md"/>
      <!--Products Table-->
      <orderItems :items="order.items"/>
    </div>

    <!--Actions-->
    <div class="row q-mt-md q-col-gutter-md">
      <div class="col-12 col-md-6">
        <div class="row gutter-x-sm">
          <div class="box col-md-12">
            <div class="box-title">
              {{ $tr('qcommerce.layout.orderHistory') }}
            </div>
            <q-separator class="q-mt-sm q-mb-md"/>
            <div>
              <order-status-history :items="order.histories"/>
              <addStatusOrder v-if="$auth.hasAccess('icommerce.orders.edit')" @orderHistoryCreated="getOrder()"/>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-6 backend-page">
        <div class="row gutter-x-sm">
          <div class="col-12">
            <div class="box">
              <div class="box-title">
                Total
              </div>
              <q-separator class="q-mt-sm q-mb-md"/>
              <div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="row q-mb-sm full-width">
                        <div class="col-6 secondary-font">
                          {{ $tr('qcommerce.layout.subtotal') }}
                        </div>
                        <div class="col-6 text-right secondary-font">

                          $ {{ $n(order.total - order.shippingAmount) }}
                        </div>
                      </div>
                      <div class="row q-mb-sm full-width">
                        <div class="col-6 secondary-font">
                          {{ $tr('qcommerce.layout.shipping') }}
                        </div>
                        <div class="col-6 text-right secondary-font">
                          $ {{ $n(order.shippingAmount) }}
                        </div>
                      </div>
                      <div class="row q-mb-sm q-title text-weight-bold full-width">
                        <div class="col-6  secondary-font">
                          {{ $tr('qcommerce.layout.form.total') }}
                        </div>
                        <div class="col-6 text-right secondary-font">
                          $ {{ $n(order.total) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
import orderStatusHistory from '@imagina/qcommerce/_components/admin/orders/orderStatusHistory';
import orderItems from '@imagina/qcommerce/_components/frontend/orders/orderItems';
import addStatusOrder from '@imagina/qcommerce/_components/admin/orders/addStatusOrder'

export default {
  components: {
    orderItems,
    orderStatusHistory,
    addStatusOrder
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
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getOrder()
      //Listen refresh event
      this.$root.$on('page.data.refresh', () => this.getOrder())
    },
    //Get order data
    getOrder() {
      this.loading = true
      let params = {
        refresh: true,
        params: {
          include: 'shippingDepartment,shippingCountry,customer.addresses,customer.fields'
        }
      }
      let criteria = this.$route.params.id
      this.$crud.show('apiRoutes.qcommerce.orders', criteria, params)
        .then(response => {

          this.order = response.data
          this.loading = false
        })
        .catch(error => {
          this.loading = false
        })
    }
  }
}
</script>
