<template>
  <div>
    <vue-headful :title="title"></vue-headful>

    <v-container style="min-height: 100vh;">
      <v-row justify="center">
        <v-col cols="12" md="6">
          

          <!-- <transition name="fade"> -->

            <v-skeleton-loader
              class="mx-auto"
              v-if="!showUi"
              type="card"
            ></v-skeleton-loader>

            <v-card outlined min-height="300" tile v-else
              >
              <v-toolbar
                color="primary"
                dark flat
              >
                <v-btn icon @click.native="$router.back()">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn icon>
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </v-toolbar>
              <v-img :src="series.cover_image || require('@/assets/tsg.jpg')" width="100%" height="200">

              </v-img>

              <v-card-title class="" style="font-size: 18px;">
                {{series.title}}
              </v-card-title>

              <v-card-subtitle>
                By {{series.author}}
              </v-card-subtitle>

              <v-card-text>
                <v-chip
                  class="mr-2"
                  @click="''" small
                >
                  <v-icon left small>mdi-library-music</v-icon>
                  {{series.sermons ? series.sermons.length : 0}} tracks
                </v-chip>
                
                <v-subheader class="mt-5">All Tracks</v-subheader>
                <v-list dense>

                  <template v-for="(sermon,i) in series.sermons">
                    <!-- <v-card :key="i + 6473" flat>
                      <v-card-actions>
                        <span class="mr-3">{{sermon.track}} - Track {{sermon.track_number}}</span>
                        <span>({{sermon.size ? (sermon.size/1000000).toFixed(2) : '?'}} Mb)</span>
                        <v-spacer></v-spacer>
                        <v-icon @click="copyToClipboard(sermon.audio_file)" class="mr-4">mdi-share-variant</v-icon>
                        
                      </v-card-actions>
                    </v-card> -->
                    <v-divider :key="i"></v-divider>

                    <v-list-item :key="i + 6473">
                      <v-list-item-avatar>
                        <v-icon>mdi-music</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{sermon.track}} - Track {{sermon.track_number}}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          Track {{sermon.track_number}}
                          <span class="mx-1">|</span> 
                          <span>{{sermon.size ? (sermon.size/1000000).toFixed(2) : '?'}} Mb</span>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-btn icon @click="downloadFile(sermon)">
                          <v-icon>mdi-download</v-icon>
                        </v-btn>

                      </v-list-item-action>
                    </v-list-item>

                  </template>
                </v-list>
              </v-card-text>
            </v-card>
          <!-- </transition> -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    showUi: false,
    series: {},
  }),
  props: {
    id: {
      required: true,
    }
  },
  computed: {
    seriesId(){
      return this.$route.params.id
    },
    title(){
      return this.series.title + ' | TSG Media'
    }
  },
  methods: {
    initialize(){
      this.getSeries()
    },
    getSeries(){
      db.collection('series').doc(this.seriesId)
      .get().then(doc => {
        this.series = doc.data()
        
        this.showUi = true
      })

    },
    copyToClipboard(text) {
      if (window.clipboardData && window.clipboardData.setData) {
          // IE specific code path to prevent textarea being shown while dialog is visible.
          return clipboardData.setData("Text", text); 

      } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {

        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            // console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
            this.$eventBus.$emit('Snackbar', {
              show: true,
              message: 'Download link copied to clipboard',
              color: 'success'
            })
        }
      }
    },
    downloadFile(sermon){
      var el = document.createElement('a')
      el.setAttribute('href', sermon.audio_file)
      el.setAttribute('target', '_blank')
      el.click()

      this.$eventBus.$emit('Snackbar', {
        message: 'You download has started!',
        color: 'purple'
      })
    }
  },
  mounted(){
    this.initialize()
  },
  beforeDestroy(){
    document.title = 'Home | TSG Media'
  }
}

import { db } from "@/plugins/firebase";
</script>
