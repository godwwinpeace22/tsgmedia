<template>
  <div>

    <v-card :height="$bp.xsOnly ? '300' : 320" flat tile>
      <v-img
        src="https://res.cloudinary.com/unplugged/image/upload/v1586363911/tsgmedia/sermons-bgd.jpg"
        height="100%" width="100%">
        <v-row justify="center" style="background: rgba(0,0,0,.3); height: 320px;">
          <v-col cols="10" sm="10" md="8" class="text-center">
            <h1 class="mb-10 mt-12 pt-4 pt-sm-8 font-weight-bold white--text"
              :class="[{'display-2': $bp.mdAndUp, 'display-1': $bp.smAndUp, 'headline': $bp.xsOnly}]"
            >
              Download and Listen
            </h1>
            <v-text-field
              solo class="mb-sm-5 mx-auto d-block"
              name="search"
              @keyup.enter="search"
              append-icon="mdi-magnify"
              append-icon-cb="search"
              label="Find a sermon"
              v-model.trim="query" hide-details
            >
            </v-text-field>

          </v-col>
        </v-row>

      </v-img>
    </v-card>

    <v-card flat class="transparent pt-10" min-height="100vh">
      <v-card-text class="">
        <v-row justify="center">
          <v-col cols="12" md="10" lg="11">
            <v-row>
              <template v-if="!showUi">
                <v-col cols="12" sm="4" md="3" v-for="i in 8" :key="i + 'sk'">
                  <v-skeleton-loader
                    class="mx-auto"
                    type="card"
                  ></v-skeleton-loader>
                </v-col>
              </template>

              <template v-else>
                <v-col v-for="(item, i) in items" :key="i" cols="12" sm="4" md="3">

                  <v-card outlined height="300" tile 
                  
                  >
                    <v-img :src="item.cover_image || '/tsg.jpg'"
                    width="100%" height="150" class="linkify"
                    @click="$router.push(`/series/${item.docId}`)">

                    </v-img>

                    <v-list dense>
                      <v-list-item
                        :to="`/series/${item.docId}`"
                        :title="item.title"
                      >
                        <v-list-item-content>
                          <v-list-item-title
                            class="primary--text font-weight-bold"
                          >
                            {{item.title}}
                          </v-list-item-title>
                          <v-list-item-subtitle class="text-capitalize">
                            By {{item.author}}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>

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
                    :length="len"
                    circle
                  ></v-pagination>
                </v-col>
              </template>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: 'TSG Media'
    }
  },
  data: () => ({
    showUi: false,
    series: [],
    page: 1,
    docs_per_page: 200,
    query: ''
  }),
  computed: {
    
    ...mapState([
      'auth',
    ]),
    title(){
      return 'Home | TSG Media'
    },
    $bp () {
      return this.$vuetify.breakpoint
    },
    imgDimensions () {
      return this.$bp.xsOnly
        ? '300/300' : this.$bp.smOnly ? '600/320' : '1000/400'
    },
    items () {
      var q = this.query.toLowerCase()
      return this.series.filter(item => {
        return item.title.toLowerCase().includes(q) 
        || item.author.toLowerCase().includes(q)
      })
    },
    len () {
      return Math.round(this.series.length / this.docs_per_page)
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
    search () {

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
import { firebase, db } from "@/plugins/firebase"
</script>
<style >
  
  
</style>
