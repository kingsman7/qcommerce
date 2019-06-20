<template>
  <div>
    <div class="row shadow-1">
      <div class="col-12 flex flex-center">
        <h1 class="q-headline text-primary ">
          <q-chip color="primary">6</q-chip>
          Order Summary
        </h1>
      </div>
      <div class="col-12">
        <cart/>
      </div>
    </div>
  </div>
</template>

<script>
  import cart from '@imagina/qcommerce/_components/frontend/cart/widgetCart'
  export default {
    components:{
      cart
    }
  }
</script>

<style scoped>
</style>
