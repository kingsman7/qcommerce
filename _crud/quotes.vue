<template></template>

<script>
export default {
  data() {
    return {
      crudId: this.$uid()
    }
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        //entityName: config("main.qcommerce.entityNames.productCategory"),
        apiRoute: 'apiRoutes.qcommerce.orders',
        permission: 'icommerce.orders',
        //extraFormFields: 'Icommerce.crud-fields.productCategories',
        create: {
          to: {name: 'qcommerce.admin.quotes.create'}
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('ui.form.id'), field: 'id', align: 'left'},
            {
              name: 'customer', label: this.$tr('ui.form.name'), align: 'left',
              format: (val, row) => `${row.firstName} ${row.lastName}`
            },
            {
              name: 'total',
              label: this.$tr('qcommerce.layout.form.total'),
              field: 'total',
              align: 'left',
              format: val => val ? `$${this.$trn(val)}` : ''
            },
            {name: 'statusName', label: this.$tr('ui.form.status'), field: 'statusName',align: 'left'},
            {
              name: 'created_at', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'right',
              format: val => val ? this.$trd(val) : '-',
            },
            {
              name: 'updated_at', label: this.$tr('ui.form.updatedAt'), field: 'updatedAt', align: 'right',
              format: val => val ? this.$trd(val) : '-',
            }
          ],
          requestParams: {
            filter: {type: 'quote'}
          }
        },
        update: false,
        delete: false
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  }
}
</script>
