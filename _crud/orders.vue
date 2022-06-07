<template>
  <config-crud ref="configCrud" />
</template>
<script>
import configCrud from "@imagina/qcrud/_config/CrudConfig"
import Json from "@imagina/qcommerce/_crud/orders.json"
export default {
  components:{
    configCrud
  },
  computed: {
    crudData() {
      return {
        ...this.$refs.configCrud.getData(Json),
        /*entityName: config("main.qcommerce.entityNames.order"),
        apiRoute: 'apiRoutes.qcommerce.orders',
        permission: 'icommerce.orders',
        extraFormFields: 'Icommerce.crud-fields.orders',
        create: false,
        read: {
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id'},
            {
              name: 'customer',
              label: this.$tr('isite.cms.form.name'),
              field: 'customer',
              format: val => val ? val.fullName : '-',
              align: 'left'
            },
            {
              name: 'total',
              label: this.$tr('icommerce.cms.form.total'),
              field: 'total',
              format: val => val ? `$${this.$trn(val)}` : ''
            },
            {name: 'statusName', label: this.$tr('isite.cms.form.status'), field: 'statusName'},
            //{name: 'paymentCity', label: this.$tr('icommerce.cms.form.city'), field: 'paymentCity'},
            //{name: 'paymentCountry', label: this.$tr('icommerce.cms.form.country'), field: 'paymentCountry'},
            {name: 'shippingMethod', label: this.$tr('icommerce.cms.form.shippingMethod'), field: 'shippingMethod'},
            {
              name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'right',
              format: val => val ? this.$trd(val) : '-',
            },
            {
              name: 'updated_at', label: this.$tr('isite.cms.form.updatedAt'), field: 'updatedAt', align: 'right',
              format: val => val ? this.$trd(val) : '-',
            },
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'right'},
          ],
          requestParams: {
            filter: {
              order: {
                field: 'id',
                way: 'desc',
              },
            },
          },
          filters: {
            status: {
              label: `${this.$tr('isite.cms.form.status')}:`,
              value: null,
              type: 'select',
              isRequired: true,
              isTranslatable: false,
              props: {
                label: `${this.$tr('isite.cms.form.status')}:`,
                clearable: true
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qcommerce.orderStatus'
              }
            },
          }
        },
        update: {
          to: 'qcommerce.shipping.orders.show'
        },
        delete: false,*/
        formLeft: {},
      }
    }
  }
}
</script>
