<template>
  <div>
    <div class="row shadow-1">
      <div class="col-xs-12 col-sm-12 flex flex-center">
        <h1 class="q-headline text-primary">
          <q-chip color="primary">1</q-chip>
          {{title}}
        </h1>
      </div>
      <div class="col-xs-12 col-md-12 q-px-sm">
  
        <q-item-separator />
        
        <div v-if="$store.state.auth.userData || false">
          
          <q-card class="no-shadow flex flex-center">
            <q-card-media>
              <img
                :src="getImageUrl($store.state.auth.userData.mainImage)"
                 alt="avatar"
                 style="width: 200px;height: 200px; border-radius: 50%">
            </q-card-media>
            <q-card-title>
              {{$store.state.auth.userData.fullName}}
            </q-card-title>
            <q-card-main>
              <p>{{$store.state.auth.userData.email}}</p>
            </q-card-main>
            <q-card-separator />
            <q-card-actions v-if="false">
              <q-btn flat color="primary" icon="person" label="Profile" />
              <q-btn flat color="primary" icon="exit_to_app" label="LogOut" />
            </q-card-actions>
          </q-card>
          
        </div>
        <div v-else>
          <userLoginRegister @logged="handleOnLoggedUser"/>
        </div>
        
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
    },
    methods:{
      handleOnLoggedUser(){
        console.warn('logged')
      },
      getImageUrl(url){
        let image;
        if (!url) {
          image = this.fields.mainImage.value;
          if (this.fields.mainImage.value.indexOf('data:image') < 0)
            image = config('apiRoutes.api.base_url') + '/' + this.fields.mainImage.value;
        } else
          image = config('apiRoutes.api.base_url') + '/' + url;

        return image;
      }
    }
  }
</script>

<style scoped>

</style>
