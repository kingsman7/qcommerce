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
        entityName: config("main.qcommerce.entityNames.paymentMethod"),
        apiRoute: 'apiRoutes.qcommerce.paymentMethods',
        permission: 'icommerce.payment-methods',
        extraFormFields: 'Icommerce.crud-fields.paymentMethods',
        create: {
          title: this.$tr('qcommerce.layout.newPaymentMethod')
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
            {name: 'title', label: this.$tr('ui.form.title'), field: 'title', align: 'rigth'},
            {
              name: 'status', label: this.$tr('ui.form.status'), field: 'status'
            },
            {
              name: 'created_at', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {
              name: 'updated_at', label: this.$tr('ui.form.updatedAt'), field: 'updatedAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
          ]
        },
        update: {
          title: this.$tr('qcommerce.layout.updatePaymentMethod')
        },
        delete: false,
        formLeft: {
          id: {value: ''},
          parentName: {value: 'icommercecheckmo'},
          init: {
            value: 'Modules\\Icommercecheckmo\\Http\\Controllers\\Api\\IcommerceCheckmoApiController',
            isFakeField: true
          },
          title: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('ui.form.title')}*`,
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
          },
          description: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('ui.form.description')}*`,
              type: 'textarea',
              rows: "3",
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
          },
          status: {
            value: '1',
            type: 'select',
            props: {
              label: this.$tr('ui.form.status'),
              options: [
                {label: this.$tr('ui.label.enabled'), value: '1'},
                {label: this.$tr('ui.label.disabled'), value: '0'}
              ]
            },
          },
          mediasSingle: {
            value: {},
            type: 'media',
            props: {
              label: this.$tr('ui.form.image'),
              zone: 'mainimage',
              entity: "Modules\\Icommerce\\Entities\\PaymentMethod",
              entityId: null
            }
          }
        },
        formRight: {},
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  }
}
</script>
