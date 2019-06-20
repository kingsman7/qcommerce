<template>
  <div class="q-container">
    <div class="backend-page q-mb-xl relative-position">
      <div class="row gutter-x-sm">
        <div class="col-12 col-md-12">
          <div v-if="cart.products && cart.products.length">
            <q-list>
              <q-list-header>Products</q-list-header>
              <q-item v-for="(product, index) in cart.products" :key="index">
                <q-item-side :image="product.mainImage.path"/>
                <q-item-main>
                  <q-item-tile label>{{product.name}}</q-item-tile>
                  <q-item-tile label-lines>${{$n(product.total)}}</q-item-tile>
                  <q-item-tile sublabel>
                    <div
                      :key="key"
                      v-for="(option, key) in product.productOptionValues">
                      <div class="option-title">
                        {{option.option}}
                      </div>
                      <div class="value-title">
                        <q-icon name="fas fa-caret-right"/>
                        {{option.optionValue}}
                      </div>
                    </div>
                  </q-item-tile>
                  <q-item-tile sublabel-lines	>
  
                    <div class="row">
                      <div class="col-md-12">
                        <select-quantity
                          v-model="product.quantity"
                          @enter="update(product)"
                            @btn="update(product)"/>
                      </div>
                    </div>
                  </q-item-tile>
                  <q-item-side right>
                    <q-btn
                      size="sm"
                      rounded
                      color="negative"
                      flat
                     @click="deleteItem(product, false)"
                      icon="fas fa-trash">
                      <q-tooltip class="q-subheading">
                        Remove: {{product.name}}
                      </q-tooltip>
                    </q-btn>
                  </q-item-side>
                </q-item-main>
              </q-item>
            </q-list>
          </div>
          <div v-else class="border-top-color shadow-1">
            Your cart is empty...
          </div>
        </div>
      </div>
      <inner-loading :visible="loading"/>
    </div>
  </div>
</template>

<script>
  //Components
  import selectQuantity from '@imagina/qcommerce/_components/selectQuantity'
  //Services
  import icommerceService from '@imagina/qcommerce/_services/index';
  import innerLoading from 'src/components/master/innerLoading'

  export default {
    props: {
      simple: {
        type: Boolean,
        default: false
      },
    },
    components: {selectQuantity,innerLoading},
    data() {
      return {
        test: 1,
        loading: true,
        cart: false,
        products: false,
        columns: [
          {name: 'img-prodct', align: 'center'},
          {name: 'description', align: 'left'},
          {name: 'actions', align: 'right'}
        ],
        tmpQuantity : 0
      }
    },
    mounted() {
      this.getCart()
    },
    methods: {
      async getCart() {
        this.loading = true
        await this.$store.dispatch('shoppingCart/GET_CART', true)
        this.cart = this.$store.state.shoppingCart.cart
        this.$root.$emit('updateCart')
        this.loading = false
      },
      async deleteItem(item) {
        this.$q.dialog({
          title: item.name,
          message: 'Do you want delete this Product?',
          color: 'negative',
          ok: 'Delete',
          cancel: true
        }).then(async data => {
          this.loading = true
          await this.$store.dispatch('shoppingCart/DEL_PRODUCT_FROM_CART', item.id)
          await this.getCart()
          this.loading = false
        }).catch(() => {})
      },
      async update(item) {
        setTimeout(() => {
          //If quantity was change, update it
          if (item.quantity) {
            //Update product quantity
            this.loading = true
            let formData = {
              "productId": item.productId,
              "productOptionValues" : item.productOptionValues,
              "quantity": item.quantity,
              "cartId": this.cart.id,
              "id": item.id
            }
            //Request
            this.$store.dispatch('shoppingCart/UPDATE_PRODUCT_INTO_CART', formData).then(async response => {
              await this.getCart()
              this.loading = false
            }).catch(error => {
              this.$helper.alert.error('Failed edit product')
              this.loading = false
            })
          }
        },100)
      },
    }
  }
</script>
