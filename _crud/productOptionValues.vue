<template></template>
<script>
  export default {
    computed: {
      crudData () {
        return {
          apiRoute: 'apiRoutes.qcommerce.optionValues',
          permission: 'icommerce.optionvalues',
          create: {
            title: this.$tr('qcommerce.layout.newOptionValue'),
          },
          read: {
            columns: [
              { name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px' },
              {
                name: 'description', label: this.$tr('ui.form.description'),
                field: 'description', align: 'rigth'
              },
              {
                name: 'option', label: this.$tr('ui.form.option'), field: 'option',
                format: val => val && val.description || '-', align: 'left'
              },
              {
                name: 'created_at', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-'
              },
              { name: 'actions', label: this.$tr('ui.form.actions'), align: 'left' },
            ],
            requestParams: { include: 'option' },
            filters: {
              optionId: {
                label: `${this.$tr('ui.form.option')}:`,
                value: '0',
                type: 'select',
                options: [
                  { label: this.$tr('ui.label.all'), value: '0' }
                ],
                loadOptions: {
                  apiRoute: 'apiRoutes.qcommerce.options',
                  select: { label: 'description', id: 'id' }
                }
              },
            }
          },
          update: {
            title: this.$tr('qcommerce.layout.updateOptionValue'),
            requestParams: { include: '' }
          },
          delete: true,
          formLeft: {
            id: { value: '' },
            userId: { value: this.$store.state.quserAuth.userId },
            description: {
              label: `${this.$tr('ui.form.description')}*`,
              value: '',
              type: 'text',
              isTranslatable: true,
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
            optionId: {
              label: `${this.$tr('ui.form.option')}*`,
              value: null,
              type: 'select',
              isTranslatable: false,
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
              loadOptions: {
                apiRoute: 'apiRoutes.qcommerce.options',
                select: { label: 'description', id: 'id' }
              }
            },
            sortOrder: {
              label: this.$tr('ui.form.sort'),
              value: 0,
              type: 'number',
              isTranslatable: false
            },
            mediasSingle: {
              name: 'mediasSingle',
              label: this.$tr('ui.form.firstImage'),
              value: {},
              type: 'media',
              zone: 'mainimage',
              entity: 'Modules\\Icommerce\\Entities\\OptionValue',
              enitityId: null
            },
          },
        }
      }
    }
  }
</script>
