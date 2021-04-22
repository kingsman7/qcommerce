<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          entityName: config("main.qcommerce.entityNames.itemTypes"),
          apiRoute: 'apiRoutes.qcommerce.itemTypes',
          permission: 'icommerce.itemtypes',
          extraFormFields: 'Icommerce.crud-fields.itemTypes',
          create: {
            title: this.$tr('qcommerce.layout.newItemType'),
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', align: 'left'},
              {name: 'title', label: this.$tr('ui.form.title'), field: 'title', align: 'left'},
              {
                name: 'createdAt', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'right'},
            ],
            requestParams: {},
            filters: {},
          },
          update: {
            title: this.$tr('qcommerce.layout.updateItemType'),
          },
          delete: true,
          formLeft: {
            title: {
              isTranslatable: true,
              value: '',
              type: 'input',
              props : {
                label: `${this.$tr('ui.form.title')}*`,
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }
            },
          },
        }
      }
    }
  }
</script>
