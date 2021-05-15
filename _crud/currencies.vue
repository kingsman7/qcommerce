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
        entityName: config("main.qcommerce.entityNames.currencies"),
        apiRoute: 'apiRoutes.qcommerce.currencies',
        permission: 'icommerce.currencies',
        extraFormFields: 'Icommerce.crud-fields.currencies',
        create: {
          title: this.$tr('qcommerce.sidebar.newCurrencies'),
        },
        computed: {
          isValid() {
            return this.model.length <= 1
          }
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
            {name: 'name', label: this.$tr('ui.form.name'), field: 'name', align: 'left'},
            {
              name: 'code', label: this.$tr('qcommerce.sidebar.code'), field: 'code', style: 'width: 50px',
              align: 'left',
            },
            {
              name: 'symbol_left', label: this.$tr('qcommerce.sidebar.symbol_left'), field: 'symbolLeft',
              align: 'left', maxLength: 1
            },
            {
              name: 'symbol_right', label: this.$tr('qcommerce.sidebar.symbol_right'), field: 'symbolRight',
              align: 'left', maxLength: 1
            },
            {name: 'status', label: this.$tr('qcommerce.sidebar.status'), field: 'status', align: 'left'},
            {
              name: 'decimal_place', label: this.$tr('qcommerce.sidebar.decimal_place'), field: 'decimalPlace',
              align: 'right'
            },
            {name: 'value', label: this.$tr('qcommerce.sidebar.value'), field: 'value', align: 'right'},
            {
              name: 'default_currency', label: this.$tr('qcommerce.sidebar.default_currency'),
              field: 'defaultCurrency', align: 'right',
              format: val => (val == 1) ? this.$tr('ui.label.yes') : this.$tr('ui.label.no')
            },
            //Action
            {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
          ],
          requestParams: {},
          filters: {},
          actions: []
        },
        update: {
          title: this.$tr('qcommerce.sidebar.updateCurrency'),
          requestParams: {}
        },
        delete: true,
        //Form
        formLeft: {
          id: {value: ''},
          userId: {value: this.$store.state.quserAuth.userId},
          name: {
            value: '',
            type: 'input',
            props: {
              label: `${this.$tr('ui.form.name')}*`,
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired'),
              ],
            },
          },
          code: {
            value: '',
            type: 'input',
            props: {
              label: `${this.$tr('qcommerce.sidebar.code')}*`,
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired'),
                val => !val || val.length >= 3 || this.$tr('ui.message.fieldMinLeng', {num: 3})
              ],
            },
          },
          symbolLeft: {
            value: '',
            type: 'input',
            props: {
              label: `${this.$tr('qcommerce.sidebar.symbol_left')}*`,
              rules: [
                val => !val || val.length == 1 || this.$tr('ui.message.fieldMaxLeng', {num: 1})
              ],
            },
          },
          symbolRight: {
            value: '',
            type: 'input',
            props: {
              label: `${this.$tr('qcommerce.sidebar.symbol_right')}*`,
              rules: [
                val => !val || val.length == 1 || this.$tr('ui.message.fieldMaxLeng', {num: 1})
              ],
            },
          },
          decimalPlace: {
            value: '',
            type: 'input',
            props: {
              type: 'number',
              label: `${this.$tr('qcommerce.sidebar.decimal_place')}*`,
              rules: [
                val => !val || val.length == 1 || this.$tr('ui.message.fieldMaxLeng', {num: 1})
              ],
            },
          },
          value: {
            value: '',
            type: 'input',
            props: {
              type: 'number',
              label: `${this.$tr('qcommerce.sidebar.value')}*`,
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
          },
          status: {
            value: '1',
            type: 'select',
            isTranslatable: false,
            props: {
              label: `${this.$tr('ui.form.status')}*`,
              options: [
                {label: this.$tr('ui.label.enabled'), value: '1'},
                {label: this.$tr('ui.label.disabled'), value: '0'}
              ],
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            }
          },
          defaultCurrency: {
            value: 0,
            type: 'select',
            isTranslatable: false,
            props: {
              label: `${this.$tr('ui.form.default')}*`,
              options: [
                {label: this.$tr('ui.label.yes'), value: 1},
                {label: this.$tr('ui.label.no'), value: 0}
              ],
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            }
          },
        }
      }
    }
  }
}
</script>
