<template></template>
<script>
    export default {
        computed: {
            crudData() {
                return {
                    apiRoute: 'apiRoutes.qcommerce.products',
                    permission: 'icommerce.products',
                    create: {
                        title: this.$tr('qcommerce.layout.newProduct'),
                        to: {name: 'qcommerce.admin.products.create'},
                    },
                    read: {
                        columns: [
                            {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
                            {
                                name: 'image',
                                label: this.$tr('ui.form.image'),
                                field: 'mainImage',
                                style: 'width: 50px',
                            },
                            {
                                name: 'name',
                                label: this.$tr('ui.form.title'),
                                field: 'name',
                                style: 'width: 50px',
                                align: 'rigth'
                            },
                            {name: 'sku', label: this.$tr('ui.form.sku'), field: 'sku', align: 'left'},
                            {
                                name: 'category', label: this.$tr('ui.form.category'), field: 'category', align: 'left',
                                format: val => (val && val.title) ? val.title : ''
                            },
                            {
                                name: 'status', label: this.$tr('ui.form.status'), field: 'status', align: 'left',
                                format: val => val ? this.$tr('ui.label.enabled') : this.$tr('ui.label.disabled')
                            },
                            {
                                name: 'Stock', label: this.$tr('ui.form.stock'), field: 'stockStatus', align: 'left',
                                format: val => val ? this.$tr('ui.label.available') : this.$tr('ui.label.soldOut')
                            },
                            {name: 'slug', label: this.$tr('ui.form.slug'), field: 'slug', align: 'left'},
                            {
                                name: 'price', label: this.$tr('ui.form.price'), field: 'price', align: 'left',
                                format: val => this.$trc(val)
                            },
                            {
                                name: 'createdAt',
                                label: this.$tr('ui.form.createdAt'),
                                field: 'createdAt',
                                align: 'left',
                                format: val => val ? this.$trd(val) : '-',
                            },
                            {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
                        ],
                        requestParams: {
                            include: 'category',
                            filter: {
                                order: {
                                    field: 'id',
                                    way: 'desc',
                                },
                            },
                        },
                        filters: {
                            categoryId: {
                                label: `${this.$tr('ui.form.category')}:`,
                                value: null,
                                type: 'select',
                                isRequired: true,
                                isTranslatable: false,
                                props: {
                                    label: `${this.$tr('ui.form.category')}:`,
                                    clearable:true

                                },
                                loadOptions: {
                                    apiRoute: 'apiRoutes.qcommerce.categories'
                                }
                            },
                            status: {
                                label: `${this.$tr('ui.form.status')}:`,
                                value: null,
                                type: 'select',
                                isRequired: true,
                                isTranslatable: false,
                                props: {
                                    label: `${this.$tr('ui.form.status')}:`,
                                    options: [
                                        {label: this.$tr('ui.label.enabled'), id: 1, value: 1},
                                        {label: this.$tr('ui.label.disabled'), id: 0, value: 0}
                                    ],
                                    clearable:true

                                }

                            },
                            stockStatus: {
                                label: `${this.$tr('ui.form.stock')}:`,
                                value: null,
                                type: 'select',
                                isRequired: true,
                                isTranslatable: false,
                                props: {
                                    label: `${this.$tr('ui.form.stock')}:`,
                                    options: [
                                        {label: this.$tr('ui.label.available'), id: 1, value: 1},
                                        {label: this.$tr('ui.label.soldOut'), id: 0, value: 0}
                                    ],
                                    clearable:true
                                },
                            },
                        },
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
