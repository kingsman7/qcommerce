<template>
  <config-crud ref="configCrud" />
</template>
<script>
import configCrud from "@imagina/qcrud/_config/CrudConfig"
import Json from "@imagina/qcommerce/_crud/productOptionValues.json"
  export default {
    components:{
      configCrud
    },
    data() {
      return {
        crudId: this.$uid()
      }
    },
    computed: {
      crudData () {
        return {
          ...this.$refs.configCrud.getData(Json),
          /*crudId: this.crudId,
          entityName: config("main.qcommerce.entityNames.productOptionValue"),
          apiRoute: 'apiRoutes.qcommerce.optionValues',
          permission: 'icommerce.optionvalues',
          extraFormFields: 'Icommerce.crud-fields.productOptionsValues',
          create: {
            title: this.$tr('icommerce.cms.newOptionValue'),
          },
          read: {
            columns: [
              { name: 'id', label: this.$tr('isite.cms.form.id'), 
              field: 'id', style: 'width: 50px' },
              {
                name: 'description', label: this.$tr('isite.cms.form.description'),
                field: 'description', align: 'rigth'
              },
              {
                name: 'option', label: this.$tr('isite.cms.form.option'), 
                field: 'option',
                format: val => val && val.description || '-', align: 'left'
              },
              {
                name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), 
                field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-'
              },
              { name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left' },
            ],
            requestParams: { include: 'option' },
            filters: {
              optionId: {
                value: '0',
                type: 'select',
                props : {
                  label: `${this.$tr('isite.cms.form.option')}:`,
                  options: [
                    { label: this.$tr('isite.cms.label.all'), value: '0' }
                  ],
                },
                loadOptions: {
                  apiRoute: 'apiRoutes.qcommerce.options',
                  select: { label: 'description', id: 'id' }
                }
              },
            }
          },
          update: {
            title: this.$tr('icommerce.cms.updateOptionValue'),
            requestParams: { include: '' }
          },
          delete: true,*/
          formLeft: {
            id: { value: '' },
            userId: { value: this.$store.state.quserAuth.userId },
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
            sortOrder: {
              value: 0,
              type: 'input',
              isTranslatable: false,
              props : {
                type : 'number',
                label: this.$tr('isite.cms.form.sort'),
              }
            },
            mediasSingle: {
              name: 'mediasSingle',
              value: {},
              type: 'media',
              props : {
                label: this.$tr('isite.cms.form.firstImage'),
                zone: 'mainimage',
                entity: 'Modules\\Icommerce\\Entities\\OptionValue',
                enitityId: null
              }
            },
          },
        }
      },
      //Crud info
      crudInfo() {
        return this.$store.state.qcrudComponent.component[this.crudId] || {}
      }
    }
  }
</script>
