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
        entityName: config("main.qcommerce.entityNames.product"),
        apiRoute: 'apiRoutes.qcommerce.products',
        permission: 'icommerce.products',
        extraFormFields: 'Icommerce.crud-fields.products',
        create: {
          title: this.$tr('icommerce.cms.newProduct'),
          to: {name: 'qcommerce.admin.products.create'}
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
            {
              name: 'name',
              label: this.$tr('isite.cms.form.title'),
              field: 'name',
              style: 'width: 50px',
              align: 'rigth',
              sortable: true
            },
            {name: 'sku', label: this.$tr('isite.cms.form.sku'), field: 'sku', align: 'left'},
            {
              name: 'category', label: this.$tr('isite.cms.form.category'), field: 'category', align: 'left',
              format: val => (val && val.title) ? val.title : ''
            },
            {
              name: 'status', label: this.$tr('isite.cms.form.status'), field: 'status', align: 'left'
            },
            {
              name: 'quantity', label: this.$tr('isite.cms.form.stock'), field: 'quantity', align: 'left',
              format: val => !val ? this.$tr('isite.cms.label.soldOut') :
                  `${this.$tr('isite.cms.label.available')} (${(val <= 100) ? val : '100+'})`
            },
            {name: 'slug', label: this.$tr('isite.cms.form.slug'), field: 'slug', align: 'left'},
            {
              name: 'price', label: this.$tr('isite.cms.form.price'), field: 'price', align: 'left',
              format: val => this.$trc(val || 0)
            },
            {
              name: 'createdAt', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
          ],
          requestParams: {include: 'category', filter: {order: {field: 'id', way: 'desc'}}},
          filters: {
            categories: {
              value: null,
              type: 'treeSelect',
              props: {
                label: `${this.$tr('isite.cms.form.category')}:`,
                clearable: true,
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qcommerce.categories'
              }
            },
            manufacturers: {
              value: null,
              type: 'select',
              props: {
                label: `${this.$tr('icommerce.cms.form.manufacturer')}:`,
                clearable: true,
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qcommerce.manufacturers',
                select: {label: 'name', id: 'id'}
              }
            },
            status: {
              value: null,
              type: 'select',
              props: {
                label: `${this.$tr('isite.cms.form.status')}:`,
                clearable: true,
                options: [
                  {label: this.$tr('isite.cms.label.enabled'), value: 1},
                  {label: this.$tr('isite.cms.label.disabled'), value: 0}
                ],
              },
            },
            stockStatus: {
              value: null,
              type: 'select',
              props: {
                label: `${this.$tr('isite.cms.form.stock')}:`,
                clearable: true,
                options: [
                  {label: this.$tr('isite.cms.label.available'), value: 1},
                  {label: this.$tr('isite.cms.label.soldOut'), value: 0}
                ],
              },
            },
            soonToSoldOut: {
              value: false,
              type: 'checkbox',
              props: {
                label: `${this.$tr('icommerce.cms.form.soonToSoldOut')}`
              },
            },
            withDiscount: {
              value: false,
              type: 'checkbox',
              props: {
                label: `${this.$tr('icommerce.cms.form.withDiscount')}`
              },
            },
          },
          actions: [
            {
              icon: 'fas fa-eye',
              color: 'info',
              tooltip: this.$tr('icommerce.cms.message.viewProduct'),
              action: (row) => {
                this.$helper.openExternalURL(row.url)
              }
            }
          ]
        },
        update: {
          to: 'qcommerce.admin.products.edit'
        },
        delete: true
      }
    }
  }
}
</script>
