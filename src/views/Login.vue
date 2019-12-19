<template>
  <div>
    <vue-headful title="Admin Login | TSG Media"></vue-headful>
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      top
      right
    >
      {{snackbar.message}}
      <v-btn text color="white" @click.native="snackbar.show = false">Close</v-btn>
    </v-snackbar>

    <v-container fluid fill-height class="primary fill">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="4">
          <h1 class="text-center white--text">TSG Media Admin</h1>

          <v-alert :type="alert.type || 'info'" :value="alert.show">
            {{alert.message}}
          </v-alert>

          <v-card class="mt-5 round_top">
            <v-card-text>
              <h2 class="text-center mb-4">Login</h2>

              <v-text-field
                v-model="email"
                name="email"
                label="Email"
                type="email"
                outlined
              ></v-text-field>

              <v-text-field
                v-model="password"
                name="password"
                label="Password"
                type="password"
                outlined
              ></v-text-field>


            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
                
                <v-btn color="red" large
                  dark @click="login"
                  :loading="loading">
                  Login
                </v-btn>

            </v-card-actions>
          </v-card>

        </v-col>
      </v-row>
    </v-container>

  </div>
</template>
<script>
export default {
  data(){
    return {
      email: '',
      password: '',
      adminEmail: 'tsgmedia13@gmail.com',
      snackbar: {},
      loading: false,
      reset_email: '',
      alert: {show: false},
      dialog: false,
    }
  },
  computed: {

  },
  methods: {
    async login(){
      try {

        if(this.email != this.adminEmail){
          return 
        }

        this.loading = true
        let msg = await this.$store
        .dispatch('login', {
          email: this.email, password: this.password
        })
        
        this.loading = false
        this.$router.push('/admin')
        
      } catch (error) {
        // console.log(error)
        this.loading = false

        this.snackbar = {
          show: true,
          message: error.message,
          color:'black'
        }
      }
    },
  },
  components: {
    
  }
}

</script>

<style lang="scss">
  
  // .theme--light.v-text-field--outlined .v-input__slot {
  //   border: 1px solid rgba(115, 114, 114, 0.54) !important;
  // }

  .fill {
    height: 100vh;
  }
</style>
