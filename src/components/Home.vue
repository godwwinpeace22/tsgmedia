<template>
  <div>
    <v-container style="min-height: 100vh;">

      <vue-headful :title="title"></vue-headful>

      <transition name="fade">
        <v-overlay v-if="!showUi">
          <v-progress-circular indeterminate size="64" :opacity="0.7"></v-progress-circular>
        </v-overlay>
        <v-row v-else>
          <v-col cols="12">
            <!-- <v-toolbar
              dense right
              floating flat
            >
            <v-spacer></v-spacer>
              <v-text-field
                hide-details outlined dense
                prepend-inner-icon="mdi-magnify"
                single-line
              ></v-text-field>

              <v-btn icon>
                <v-icon>mdi-filter-variant</v-icon>
              </v-btn>
            </v-toolbar> -->
          </v-col>
          <v-col v-for="(item, i) in series.slice(0,docs_per_page*page)" :key="i" cols="12" sm="4" md="3">

            <v-card outlined height="300" tile 
            
            >
              <v-img :src="item.cover_image || require('@/assets/tsg.jpg')"
              width="100%" height="150" class="linkify"
              @click="$router.push(`/series/${item.docId}`)">

              </v-img>

              <v-card-title class="linkify primary--text" style="font-size: 18px;"
                @click="$router.push(`/series/${item.docId}`)">
                {{$helpers.truncateText(item.title, 25)}}
              </v-card-title>

              <v-card-subtitle>
                By {{item.author}}
              </v-card-subtitle>

              <v-card-text>
                <v-chip
                  class="mr-2"
                  @click="''" small
                >
                  <v-icon left small>mdi-library-music</v-icon>
                  {{item.sermons ? item.sermons.length : 0}} tracks
                </v-chip>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12">
            <v-pagination v-if="series.length >= docs_per_page"
              v-model="page"
              :length="(series.length)/docs_per_page"
              circle
            ></v-pagination>
          </v-col>
        </v-row>
      </transition>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    showUi: false,
    series: [],
    page: 1,
    docs_per_page: 20,
  }),
  computed: {
    
    ...mapState([
      'auth',
    ]),
    title(){
      return 'Home | TSG Media'
    }
  },
  watch: {
    page(to,from){
      
    }
  },
  methods: {
    initialize(){

      this.getSeries()

    },
    getSeries(){
      try {
        
        db.collection('series')
        .orderBy('date_created','desc')
        .onSnapshot(docs => {
          let arr = []
          docs.forEach(doc => arr.push(doc.data()))
          this.series = arr
  
          this.showUi = true;
        })
      } catch (error) {
        // console.log(error)
      }

    }
    
  },
  mounted(){
    this.initialize()
  },
  components: {
    
  }
}

import { mapState } from 'vuex'
import { firebase, db } from "@/plugins/firebase";
</script>
<style >
  
  
</style>
