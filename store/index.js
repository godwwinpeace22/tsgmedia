import Vue from 'vue'
import Vuex from 'vuex'
import {firebase} from '@/plugins/firebase'

Vue.use(Vuex)

export const state = () => ({
  auth: {}
})

export const mutations = {
  setUser( state, data ) {
    Object.assign(state.auth, {
      loggedIn: true,
      user: data
    })
  },
  async logout(state) {
    await firebase.auth().signOut()
    state.auth = {}
    window.location.reload()
  },
}

export const actions = {
  login(context, data) {
    return new Promise((resolve, reject) =>{

      firebase.auth().signInWithEmailAndPassword(data.email, data.password)
      .then(()=>{
        
        firebase.auth().onAuthStateChanged((user)=>{
          if (user) {
            context.commit('setUser', user)
            resolve({message: `Welcome back ${user.displayName}!`})
          } else {
            // No user is signed in.
          }
        });
        
      }).catch(error=> {
        this.loading = false

        function errorMsg(code){
          switch(code){
            case "auth/user-not-found":
              return "Sorry we couldn't find that account"
            case "auth/wrong-password":
              return "The email or password is invalid"
            case "auth/network-request-failed":
              return "Network error, Check your internet connection"
            default:
              return "Something went wrong, try again"
          }
        }

        reject({message: errorMsg(error.code)})
        
      })
    })
    
  },
  logout({commit}, data){
    firebase.auth().signOut().then(() =>{
      commit('logout')
    })
  },
  setUser({commit}, data) {
    commit('setUser', data)
  }
}
