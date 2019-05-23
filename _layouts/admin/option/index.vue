<template>
	<div id="productOptionsIndexPage" class="q-layout-page layout-padding">
		<!--TITLE-->
		<h1 class="q-headline text-primary">
			<q-icon name="fas fa-cogs"></q-icon>
			Product Options List
		</h1>

		<!--Content-->
		<div class="relative-position backend-page">
			<!--Table-->
			<div class="col-12">
				<q-table
					:data="table.data"
					:columns="table.columns"
					:pagination.sync="table.pagination"
					@request="getData"
					:filter="table.filter"
					class="shadow-1 border-top-color"
				>
					<!--Table slot left-->
					<template slot="top-left" slot-scope="props">
						<!--Search-->
						<q-search hide-underline clearable v-model="table.filter.search" @input="getDataTable"/>
					</template>
					<!--Table slot right-->
					<template slot="top-right" slot-scope="props">
						<!--Button new record-->
						<q-btn icon="fas fa-edit" color="positive" label="New Option"
									 v-if="$auth.hasAccess('icommerce.options.create')"
									 @click="formItemShow = true; itemIdToEdit = false"/>
						<!--Button refresh data-->
						<q-btn icon="fas fa-sync-alt" color="info" class="q-ml-xs"
									 @click="getDataTable(true)">
							<q-tooltip :delay="300">Refresh Data</q-tooltip>
						</q-btn>
					</template>

					<!--= Custom Columns =-->
					<q-td slot="body-cell-actions" slot-scope="props" :props="props">
						<!--Edit button-->
						<q-btn color="positive" icon="fas fa-pen" size="sm"
									 v-if="$auth.hasAccess('icommerce.options.edit')"
									 @click="itemIdToEdit = props.row.id; formItemShow = true">
							<q-tooltip :delay="300">Edit</q-tooltip>
						</q-btn>
						<!--Delete button-->
						<q-btn color="negative" icon="fas fa-trash-alt" size="sm" class="q-ml-xs"
									 v-if="$auth.hasAccess('icommerce.options.destroy')"
									 @click="deleteItem(props.row)">
							<q-tooltip :delay="300">Delete</q-tooltip>
						</q-btn>
					</q-td>
				</q-table>
			</div>

			<!--Loading-->
			<inner-loading :visible="loading" />
		</div>

		<!--Form category (create and/or update)-->
		<form-option v-model="formItemShow" @created="getDataTable(true)"
									 @updated="getDataTable(true)" :item-id="itemIdToEdit">
		</form-option>
	</div>
</template>

<script>
	//Services
	import commerceServices from '@imagina/qcommerce/_services/index';
	//Component
	import formOption from '@imagina/qcommerce/_components/admin/option/form'
	import innerLoading from 'src/components/master/innerLoading'

	export default {
		components: {
			formOption,
			innerLoading
		},
		mounted() {
			this.$nextTick(function () {
				this.getDataTable()
			})
		},
		data() {
			return {
				loading: false,
				table: {
					data: [],
					columns: [
						{name: 'id', label: 'ID', field: 'id', style: 'width: 50px'},
						{name: 'description', label: 'Description', field: 'description', align: 'rigth'},
						{name: 'type', label: 'Type', field: 'type', align: 'left'},
						{
							name: 'created_at', label: 'Creation Date', field: 'createdAt', align: 'left',
							format: val => val ? this.$d(this.$moment(val, 'YYYY-MM-DD HH:mm').toDate(), 'short', this.$q.i18n.lang) : '-',
						},
						{name: 'actions', label: 'Actions', align: 'left'},
					],
					pagination: {
						page: 1,
						rowsNumber: '',
						rowsPerPage: 10
					},
					filter: {
						search: null
					}
				},
				formItemShow: false,
				dialogDeleteItem: false,
				itemIdToEdit: false,
				itemIdToDelete: false,
			}
		},
		methods: {
			//Request products with params from server table
			getDataTable(refresh = false) {
				this.getData({pagination: this.table.pagination}, refresh)
			},
			//Get products
			getData({pagination, filter}, refresh = false) {
				this.loading = true

				//Params to request
				let params = {
					refresh: refresh,
					params: {
						filter: this.table.filter,
						page: pagination.page,
						take: pagination.rowsPerPage
					}
				}

				//Request
				commerceServices.crud.index('apiRoutes.eCommerce.options', params).then(response => {
					this.table.data = response.data
					this.table.pagination.page = response.meta.page.currentPage
					this.table.pagination.rowsNumber = response.meta.page.total
					this.table.pagination.rowsPerPage = pagination.rowsPerPage
					this.loading = false
				}).catch(error => {
					this.loading = false
					this.$helper.alert.error('Failed: ' + error, 'bottom')
				})
			},
			//Delete category
			deleteItem(item) {
				this.$q.dialog({
					title: item.id+' - '+item.description,
					message: 'Do you want delete this Option?',
					color: 'negative',
					ok: 'Delete',
					cancel: true
				}).then(data => {
					this.loading = true
					commerceServices.crud.delete('apiRoutes.eCommerce.options', item.id).then(response => {
						this.getDataTable(true)
						this.$helper.alert.success('Option deleted')
						this.dialogDeleteItem = false
						this.loading = false
					}).catch(error => {
						this.loading = false
						this.$helper.alert.error('Failed: ' + error, 'bottom')
					})
				}).catch(data => {})
			}
		}
	}
</script>

<style lang="stylus">
	@import "~variables";
</style>