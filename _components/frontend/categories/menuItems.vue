<template>
	<q-list
		:bordered="bordered"
		class="bg-grey-2">
		<div
			v-for="(item, indexItem) in items"
			:key="indexItem">
			<q-item
				@click="goToCategory(item)"
				v-if="!item.children"
				clickable
				v-ripple>
				<q-item-section>
					{{item.title}}
				</q-item-section>
			</q-item>
			<q-expansion-item
				:content-inset-level="0.0"
				expand-separator
				:label="item.title"
				v-else >
				<menuItems
					:bordered="false"
					:items="item.children"/>
			</q-expansion-item>
		</div>
	</q-list>
</template>

<script>
	export default {
		name: 'menuItems',
	  props:{
	    items:{
				type: Array,
				default: () => []
			},
			bordered:{
	    	type: Boolean,
				default: false
			}
		},
		methods:{
			goToCategory(category){
				this.$router.push({
					name: 'products.index.by.category',
					params: {
						slugCategory: category.slug
					}
				})
			}
		}
	}
</script>

<style>
	.q-item{
		border-bottom: #e1e1e1 1px solid;
	}
	.border-l{
		border-left: 1px solid #e1e1e1;
	}
	.border-r{
		border-right: 1px solid #e1e1e1
	}
</style>