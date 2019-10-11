<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qcommerce.options',
          permission: 'icommerce.options',
          create: {
            title: this.$tr('qcommerce.layout.newOption'),
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'description', label: this.$tr('ui.form.description'), field: 'description', align: 'rigth'},
              {name: 'type', label: this.$tr('ui.form.type'), field: 'type', align: 'left'},
              {
                name: 'created_at', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
            ],
            requestParams: {include: ''}
          },
          update: {
            title: this.$tr('qcommerce.layout.updateOption'),
            requestParams: {include: ''}
          },
          delete: true,
          formLeft: {
            id: {value: ''},
            userId: {value: this.$store.state.quserAuth.userId},
            description: {
              label: `${this.$tr('ui.form.description')}*`,
              value: '',
              type: 'text',
              isTranslatable: true,
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
            type: {
              label: `${this.$tr('ui.form.type')}*`,
              value: null,
              type: 'select',
              isTranslatable: false,
              options : [
                {label: 'Text', value: 'text'},
                {label: 'Textarea', value: 'textarea'},
                {label: 'Select', value: 'select'},
                {label: 'Radio', value: 'radio'},
                {label: 'Checkbox', value: 'checkbox'},
              ],
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
            sortOrder: {
              label: this.$tr('ui.form.sort'),
              value: 0,
              type: 'number',
              isTranslatable: false,
            },
          },
        }
      }
    },
  }
</script>
