<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qcommerce.priceLists',
          permission: 'icommercepricelist.pricelists',
          extraFormFields: 'Icommercepricelists.crud-fields.priceList',
          create: {
            title: this.$tr('qcommerce.layout.newPriceList'),
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', align: 'left'},
              {name: 'name', label: this.$tr('ui.form.name'), field: 'name', align: 'left'},
              {name: 'criteria', label: this.$tr('ui.form.type'), field: 'criteria', align: 'left', format: val => this.$tr('qcommerce.layout.options.'+val)},
              {name: 'status', label: this.$tr('qcommerce.layout.form.status'), field: 'status', align: 'left'},
              {name: 'value', label: this.$tr('qcommerce.layout.form.value'), field: 'value', align: 'left', format: val => this.$trn(val)},
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'right'},
            ],
            requestParams: {},
            filters: {},
          },
          update: {
            title: this.$tr('qcommerce.layout.updatePriceList'),
          },
          delete: true,
          formLeft: {
            name: {
              isTranslatable: true,
              value: '',
              type: 'input',
              props : {
                label: `${this.$tr('ui.form.name')}*`,
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }
            },
            criteria:{
              type: 'select',
              props:{
                label: this.$tr('ui.form.type'),
                options:[
                  {label: this.$tr('qcommerce.layout.options.fixed'), value: 'fixed'},
                  {label: this.$tr('qcommerce.layout.options.percentage'), value: 'percentage'},
                ],
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }
            },
            operationPrefix:{
              type: 'select',
              props:{
                label: this.$tr('qcommerce.layout.form.operationPrefix'),
                options:[
                  {label: this.$tr('qcommerce.layout.options.subtract'), value: '-'},
                  {label: this.$tr('qcommerce.layout.options.add'), value: '+'},
                ],
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }
            },
          },
          formRight: {
            status: {
              value: '1',
              type: 'select',
              props: {
                label: `${this.$tr('ui.form.status')}:`,
                clearable: true,
                options: [
                  {label: this.$tr('ui.label.enabled'), value: 1},
                  {label: this.$tr('ui.label.disabled'), value: 0}
                ],
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              },
            },
            value: {
              value: '',
              type: 'input',
              props : {
                label: `${this.$tr('qcommerce.layout.form.value')}*`,
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
                type: 'number',
              }
            },
            relatedId: {
              value: '0',
              type: 'select',
              loadOptions: {
                apiRoute: 'apiRoutes.quser.departments',
                select: {label: 'title', id: 'id'}
              },
              props: {
                label: `${this.$tr('ui.label.department')}:`,
                clearable : true,
                options:[
                  {label: this.$trp('ui.label.all'), value: 0, id: 0}
                ]
              }
            },
            relatedEntity:{
              value: 'Modules\\Iprofile\\Entities\\Department'
            }
          }
        }
      }
    }
  }
</script>
