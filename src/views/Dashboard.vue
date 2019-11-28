<template>
  <div >

  <!-- <transition name="fade" mode="out-in"> -->
    <template>
      <!-- <loading-bar height="65vh"></loading-bar> -->
      <v-overlay :value="!showUi">
        <v-progress-circular indeterminate size="64" :opacity="0.7"></v-progress-circular>
      </v-overlay>
    </template>

    <template v-if="showUi">

      <v-app-bar color="primary" flat dark dense app fixed>
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
        
        <router-view/>

        <v-footer class="grey darken-3">
          <v-row justify="center">
            
            <v-col cols="12" text-center class="white--text">
              &copy; {{new Date().getFullYear()}} —
              <strong>TSG Media</strong>
            </v-col>
          </v-row>
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

  <!-- <v-snackbar
    top right :timeout="9999999999"
    v-model="appUpdateAvailable"
  >
    New Update available.
    <v-btn color="purple" dark  @click.native="updateApp">Refresh</v-btn>
  </v-snackbar> -->


</div>
</template>

<script>
  export default {
    data: () => ({
      showUi: false,
      snackbar: {},
      appUpdateAvailable: window.appUpdateAvailable
    }),
    watch: {
      
    },
    computed: {
      ...mapGetters([
        
      ]),
      ...mapState([
        'auth',
      ]),
      
    },
    methods: {
      initialize(){
      
        this.showUi = true
      },
      updateApp(e){
        
        window.location.reload(true)
      }
    },
    components: {
      
    },
    mounted(){
      this.$firebase.auth().onAuthStateChanged(user =>{
        if(user){
          this.$store.dispatch('setUser', user)
          
        }
      })

      this.initialize()

      this.$eventBus.$on('Snackbar', data => {
        this.snackbar = data
      })

    },
  }

  // window.appUpdateAvailable = true
  import { mapState, mapGetters } from 'vuex'
</script>

<style>

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
