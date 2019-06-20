<template>
  <div class="q-container">
    <div class="backend-page q-mb-xl relative-position">
      <div class="row gutter-x-sm">
        <div class="col-xs-12 col-md-12 q-my-sm q-pr-md q-ml-sm ">
          <q-item-separator />
          <div v-if="cart.products && cart.products.length">
            <q-item
              separator
              dense
              v-for="(product, index) in cart.products"
              :key="index">
              <q-item-side>
                <img :src="product.mainImage.path" class="img">
              </q-item-side>
              <q-item-main>
                <q-item-tile label>
                  {{product.name}}
                </q-item-tile>
                <q-item-tile sublabel>
                  <div
                    class="option-content q-mx-xs"
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
                <q-item-tile label>
                  <select-quantity
                    v-model="product.quantity"
                    @enter="update(product)"
                    @btn="update(product)"/>
                </q-item-tile>
              </q-item-main>
              <q-item-side>
                <q-btn
                  size="sm"
                  round
                  class="q-ml-xl"
                  color="negative"
                  flat
                  @click="deleteItem(product, false)"
                  icon="fas fa-trash">
                  <q-tooltip class="q-subheading">
                    Remove: {{product.name}}
                  </q-tooltip>
                </q-btn>
              </q-item-side>
            </q-item>
          </div>
          <div v-else class="border-top-color shadow-1">
            Your cart is empty...
          </div>
          <q-item-separator />
          <!-- Summary -->
          <div class="col-12 flex flex-center">
              <q-list no-border class="q-pa-none">
                <q-item class="q-pa-none">
                  <q-item-side >
                    <p class="q-ma-none text-primary q-headline">
                      TOTAL $ {{ cart.total || '0'}}
                    </p>
                  </q-item-side>
                </q-item>
              </q-list>
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

<style scoped>
  .img {
    width: 50px;
    height: 50px;
    /* border-radius: 50%; */
  }
</style>
