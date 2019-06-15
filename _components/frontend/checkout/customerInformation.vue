<template>
  <div>
    <div class="row shadow-1">
      <div class="col-md-12 flex flex-center">
        <h1 class="q-headline text-primary">
          <q-chip color="primary">1</q-chip>
          Customer Information
        </h1>
      </div>
      <div class="col-md-12">
        <q-list separator class="no-shadow">
          <q-collapsible group="user" icon="fas fa-user-plus" label="New client ">
            <div>
              <q-collapsible group="user-new" indent icon="fas fa-user-edit" label=" Register account">
                Register account (Component)
              </q-collapsible>
            </div>
          </q-collapsible>
          <q-collapsible group="user" icon="fas fa-user-check" label="I'm a customer">
            <div>
              I'm a customer (Component)
            </div>
          </q-collapsible>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
  
  }
</script>

<style scoped>
  .q-list {
    border: 0px solid #e0e0e0;
    border-top: 1px solid #e0e0e0;
  }
</style>
