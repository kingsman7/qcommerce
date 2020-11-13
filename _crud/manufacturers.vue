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
          apiRoute: 'apiRoutes.qcommerce.manufacturers',
          permission: 'icommerce.manufacturers',
          extraFormFields: 'crud-fields.Icommerce.manufacturers',
          create: {
            title: this.$tr('qcommerce.layout.newManufacturer'),
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'name', label: this.$tr('ui.form.name'), field: 'name', align: 'left'},
              {
                name: 'status', label: this.$tr('ui.form.status'), field: 'status'
              },
              {
                name: 'created_at', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
            ],
            //requestParams: {include: 'parent'}
          },
          update: {
            title: this.$tr('qcommerce.layout.updateManufacturer'),
            //requestParams: {include: 'parent'}
          },
          delete: true,
          formLeft: {
            id: {value: ''},
            storeId: {value: 1},
            name: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props : {
                label: `${this.$tr('ui.form.name')}*`,
              }
            },
            slug: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props: {
                label: `${this.$tr('ui.form.slug')}*`,
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }
            },
            description: {
              value: '',
              type: 'html',
              isTranslatable: true,
              props: {
                label: `${this.$tr('ui.form.description')}*`,
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }
            },
            metaTitle: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props: {
                label: this.$tr('ui.form.metaTitle'),
              }
            },
            metaDescription: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props: {
                label: this.$tr('ui.form.metaDescription'),
              }
            },
          },
          formRight : {
            status: {
              value: '1',
              type: 'select',
              isTranslatable: false,
              props : {
                label: `${this.$tr('ui.form.status')}*`,
                options : [
                  {label: this.$tr('ui.label.enabled'), value: '1'},
                  {label: this.$tr('ui.label.disabled'), value: '0'}
                ],
                rules: [
                  val => !!val || this.$tr('ui.message.fieldRequired')
                ],
              }
            },
            sortOrder: {
              value: '0',
              type: 'input',
              props: {
                label: this.$tr('qcommerce.layout.form.sortOrder'),
                type: 'number'
              }
            },
            mediasSingle: {
              name: 'mediasSingle',
              testId: 'mediasSingle',
              value: {},
              type: 'media',
              props: {
                label: this.$tr('ui.form.firstImage'),
                zone: 'mainimage',
                entity: "Modules\\Icommerce\\Entities\\Manufacturer",
                enitityId: null
              }
            },
            mediasSingle2: {
              name: 'mediasSingle',
              testId: 'mediasSingle2',
              value: {},
              type: 'media',
              props: {
                label: this.$tr('ui.form.secondaryImage'),
                zone: 'secondaryimage',
                entity: "Modules\\Icommerce\\Entities\\Manufacturer",
                enitityId: null
              }
            },
          }
        }
      },
      //Crud info
      crudInfo() {
        return this.$store.state.qcrudComponent.component[this.crudId] || {}
      }
    }
  }
</script>
