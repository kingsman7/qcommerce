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
      
      </div>
    </div>
  </div>
</template>

<script>
  // COMPONENTS
  
  
  export default {
    props:{
      title:{
        type:String,
        default:'Customer Information'
      }
    },
    components:{
    
    }
  }
</script>

<style scoped>
  .q-list {
    border: 0px solid #e0e0e0;
    border-top: 1px solid #e0e0e0;
  }
</style>
