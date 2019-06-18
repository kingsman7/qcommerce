<template>
  <div>
    <div class="row shadow-1">
      <div class="col-md-12 flex flex-center">
        <h1 class="q-headline text-primary">
          <q-chip color="primary">1</q-chip>
          {{title}}
        </h1>
      </div>
      <div class="col-md-12">
        <userLoginRegister />
      </div>
    </div>
  </div>
</template>

<script>
  // COMPONENTS
  import userLoginRegister from '@imagina/quser/_components/auth/form'
  
  export default {
    props:{
      title:{
        type:String,
        default:'Customer Information'
      }
    },
    components:{
      userLoginRegister,
    }
  }
</script>

<style scoped>

</style>
