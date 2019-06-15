<template>
	<q-btn flat dense v-if="show"
		   class="text-white"
		   icon="shopping_cart" :to="{name:'shopping.cart.index'}">
		<q-tooltip :delay="100">
			Carrito de Compras
		</q-tooltip>
		<q-btn size="xs" dense rounded color="secondary" class="absolute-top-right" :to="{name:'shopping.cart.index'}" :label="Object.keys(cart).length?cart.products.length:0" />
	</q-btn>
</template>

<script>
	export default {
		name: 'cartButtonWidget',
		data(){
			return {
				cart: {},
				show: false
			}
		},
		created(){
			this.$root.$on("updateCart", this.getCart);
		},
		mounted(){
			this.$nextTick(()=>{
				this.getCart()
			})
		},
		methods:{
			getCart(){
				this.cart = this.$store.state.shoppingCart.cart;
				this.show = true
			}
		}
	}
</script>
