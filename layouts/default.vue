<template>
  <v-app>
    <template v-if="showUi">

      <v-app-bar color="primary" flat dark dense app fixed>
        <img src="/tsg-logo.jpg" contain width="40px" height="40px"/>
        <span class="title ml-3 mr-5 linkify" @click="$router.push('/')">TSG Media</span>
        <v-spacer></v-spacer>
        
        <template v-if="auth.loggedIn">

          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn text v-on="on">
                <v-avatar
                  size="30"
                  color="white"
                  
                >
                  <span class="black--text text-capitalize">A</span>
                </v-avatar>
                <v-icon>$vuetify.icons.expand</v-icon>
              </v-btn>
            </template>

            <v-list dense>
              <v-list-item to="/admin">
                <v-list-item-title class="text-capitalize">Admin portal</v-list-item-title>
              </v-list-item>
              <v-list-item @click="$store.dispatch('logout')">
                <v-list-item-title class="text-capitalize">Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          
        </template>
      </v-app-bar>

      <v-content>
        
        <nuxt/>

        <v-footer class="grey darken-4 grey--text" >
          <router-link to="/admin" id="hide-action">
            <span class="mr-1">&copy;</span>
          </router-link>

          <span>{{new Date().getFullYear()}} —</span>

          <span class="ml-3">TSG Media</span>
          <small class="ml-5 grey--text">
            The Saints Gathering Church,  FBA Hall1, Unec 
            Enugu.
          </small>
          
        </v-footer>
      </v-content>
    </template>
  
  <v-snackbar
    top right :color="snackbar.color"
    v-model="snackbar.show"
  >
    {{snackbar.message}}
    <v-btn text dark  @click.native="snackbar.show = false">Close</v-btn>
  </v-snackbar>

  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import { firebase } from '@/plugins/firebase'

  export default {
    data: () => ({
      showUi: false,
      snackbar: {}
    }),
    computed: {
      ...mapState([
        'auth',
      ]),
      
    },
    methods: {
      initialize(){
      
        this.showUi = true
      }
    },
    mounted(){
      // firebase.auth().onAuthStateChanged(user =>{
      //   if(user){
      //     this.$store.dispatch('setUser', user)
          
      //   }
      // })

      this.initialize()

      // this.$eventBus.$on('Snackbar', data => {
      //   data.show = true
      //   this.snackbar = data
      // })

    },
  }

</script>

<style>
  html {
    overflow: auto;
  }
  #hide-action {
    color: #fff;
    text-decoration: none;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .linkify {
    cursor: pointer;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  
</style>
