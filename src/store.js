import Vue from 'vue'
import Vuex from 'vuex'
import $router from './router.js'
import {firebase} from './plugins/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {},
    this_hotel: {},
    properties: [],
    checkedInGuests: [],
    unread_notifications: [],
    pending_orders: [],
    hotel_settings: []
  },
  mutations: {
    setUser( state, data ) {
      state.auth = {
        loggedIn: true,
        user: data
      }
    },
    async logout(state) {
      await firebase.auth().signOut()
      state.auth = {}
      window.location.reload()
    },
    setHotels(state, data){
      state.this_hotel = data[0]
      state.properties = data
    },
    switchHotel(state, data){
      state.this_hotel = data
    },
    checkedInGuests(state, data){
      state.checkedInGuests = data
    },
    setUnreadNotifications(state, data){
      state.unread_notifications = data
    },
    setPendingOrders(state, data){
      state.pending_orders = data
    },
    setHotelSettings(state, data){
      state.hotel_settings = data
    }
  },
  actions: {
    login(context, data) {
      return new Promise((resolve, reject) =>{

        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(()=>{
          // console.log(result.user)
          
          firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
              // console.log(user)
              context.commit('setUser', user)
              resolve({message: `Welcome back ${user.displayName}!`})
            } else {
              // No user is signed in.
            }
          });
          
        }).catch(error=> {
          // console.log(error)
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
    },
    setHotels({commit}, data) {
      commit('setHotels', data)
    },
    switchHotel({commit}, data) {
      commit('switchHotel', data)
    },
    checkedInGuests({commit}, data) {
      commit('checkedInGuests', data)
    },
    setUnreadNotifications({commit}, data) {
      commit('setUnreadNotifications', data)
    },
    setPendingOrders({commit}, data) {
      commit('setPendingOrders', data)
    },
    setHotelSettings({commit}, data){
      commit('setHotelSettings', data)
    }
  },
  getters: {
    notification_settings(state){
      return state.hotel_settings.find(d => d.docId == 'notification_settings')
    },
    reservation_settings(state){
      return state.hotel_settings.find(d => d.docId == 'reservation_settings')
    }
  }
})
