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
          entityName: config("main.qcommerce.entityNames.productOption"),
          apiRoute: 'apiRoutes.qcommerce.options',
          permission: 'icommerce.options',
          extraFormFields: 'Icommerce.crud-fields.productOptions',
          create: {
            title: this.$tr('icommerce.cms.newOption'),
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'description', label: this.$tr('isite.cms.form.description'), field: 'description', align: 'rigth'},
              {name: 'type', label: this.$tr('isite.cms.form.type'), field: 'type', align: 'left'},
              {
                name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
            ],
            requestParams: {include: ''}
          },
          update: {
            title: this.$tr('icommerce.cms.updateOption'),
            requestParams: {include: ''},
            to : 'qcommerce.admin.options.edit',
          },
          delete: true,
          formLeft: {
            id: {value: ''},
            userId: {value: this.$store.state.quserAuth.userId},
            description: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props : {
                label: `${this.$tr('isite.cms.form.description')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              }
            },
            type: {
              value: null,
              type: 'select',
              isTranslatable: false,
              props : {
                label: `${this.$tr('isite.cms.form.type')}*`,
                options : [
                    {label: 'Text', value: 'text'},
                    {label: 'Textarea', value: 'textarea'},
                    {label: 'Select', value: 'select'},
                    {label: 'Radio', value: 'radio'},
                    {label: 'Checkbox', value: 'checkbox'},
                    {label: 'Image', value: 'image'},
                    {label: 'Color', value: 'color'},
                ],
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              }
            },
            sortOrder: {
              value: 0,
              type: 'input',
              isTranslatable: false,
              props : {
                type : 'number',
                label: this.$tr('isite.cms.form.sort'),
              }
            },
          },
        }
      },
      //Crud info
      crudInfo() {
        return this.$store.state.qcrudComponent.component[this.crudId] || {}
      }
    },
  }
</script>
