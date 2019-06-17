<template>
  <div>
    <div class="row shadow-1">
      <div class="col-md-12 flex flex-center">
        <h1 class="q-headline text-primary ">
          <q-chip color="primary">2</q-chip>
          Shipping Address
        </h1>
      </div>
      <div class="col-md-12 q-px-md">
  
        <div class="row gutter-x-sm">
          <div class="col md-12">
            ASD
          </div>
        </div>
        
        
        <div class="row gutter-x-sm">
          <div class="col md-6">
            <q-field
              :error="false"
              error-label="We need a valid email">
              <q-input  v-model="formData.firstName" float-label="First Name"/>
            </q-field>
          </div>
          <div class="col md-6">
            <q-field
              :error="false"
              error-label="We need a valid email">
              <q-input v-model="formData.lastName" float-label="Last Name"/>
            </q-field>
          </div>
        </div>
        
        <div class="row gutter-x-sm">
          <div class="col md-12">
            <q-field
              :error="false"
              error-label="We need a valid email">
              <q-input v-model="formData.companyName" float-label=" Company name"/>
            </q-field>
          </div>
        </div>
        
        <div class="row gutter-x-sm">
          <div class="col md-12">
            <q-field
              :error="false"
              error-label="We need a valid email">
              <q-input v-model="formData.address1" float-label=" Address 1"/>
            </q-field>
          </div>
        </div>
        
        <div class="row gutter-x-sm">
          <div class="col md-12">
            <q-field
              :error="false"
              error-label="We need a valid email">
              <q-input v-model="formData.address2" float-label=" Address 2"/>
            </q-field>
          </div>
        </div>
        
        <div class="row gutter-x-sm">
          <div class="col md-6">
            <q-field
              :error="false"
              error-label="We need a valid email">
              <q-input v-model="formData.city" float-label="City"/>
            </q-field>
          </div>
          <div class="col md-6">
            <q-field
              :error="false"
              error-label="We need a valid email">
              <q-input v-model="formData.zipCode" float-label="Zip/Postal code"/>
            </q-field>
          </div>
        </div>
        
        <div class="row gutter-x-sm">
          <div class="col md-12">
            <q-field
              :error="false"
              error-label="We need a valid email">
              <q-input v-model="formData.country" float-label="Country"/>
            </q-field>
          </div>
        </div>
        
        <div class="row gutter-x-sm">
          <div class="col md-12">
            <q-field
              :error="false"
              error-label="We need a valid email">
              <q-input v-model="formData.province" float-label="State/Province"/>
            </q-field>
          </div>
        </div>
      
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        formData:{
          firstName:'',
          lastName:'',
          companyName:'',
          address1:'',
          address2:'',
          city:'',
          zipCode:'',
          country:'',
          province:'',
        }
      }
    }
  }
</script>

<style scoped>
</style>
