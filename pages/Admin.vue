<template>
  <div>
    <v-container style="min-height: 100vh;">
      <v-toolbar color="transparent" flat >
        <v-spacer></v-spacer>
        <v-btn color="success" @click="new_series_dialog = true; action = 'new'">
          <v-icon class="mr-1">mdi-plus</v-icon>
          New Series
        </v-btn>
      </v-toolbar>

      <v-row>
        
        <v-col cols="12" sm="6" md="4" v-for="item in series" :key="item.docId + 'a'">
          <v-card
            class="mx-auto"
            max-width="344"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">{{$helpers.parseDate(item.date_created, true)}}</div>
                <v-tooltip bottom>
                  <template v-slot:activator="{on}">
                    <v-list-item-title class="title mb-1" v-on="on">
                      {{item.title}}
                    </v-list-item-title>

                  </template>

                  <span>{{item.title}}</span>
                </v-tooltip>
                <v-list-item-subtitle>by {{item.author}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                tile
                size="80"
                color="grey"
              >
              <img :src="item.cover_image || '/assets/tsg.jpg'" alt="cover_image"/>
              </v-list-item-avatar>
            </v-list-item>

            <v-card-actions>
              <v-btn
                text class="text-capitalize"
                color="primary"
                @click="selected_series = item; new_series_dialog = true; action = 'edit'">
                <v-icon small class="mr-2">mdi-pencil</v-icon>
                Edit</v-btn>
              <v-btn text class="text-capitalize" color="primary" @click="selected_series = item; new_sermon_dialog = true;">
                <v-icon>mdi-plus</v-icon>
                Add item</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                icon
                @click="showTracks(item.docId)"
              >
                <v-icon>{{ show.find(a => a == item.docId) ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
            <div v-show="show.find(a => a == item.docId)">
              <v-divider></v-divider>
              <!-- <v-subheader>Understanding The New Birth</v-subheader> -->
              <v-card-text>
                <v-list dense two-line>

                  <template v-for="(sermon, i) in item.sermons">

                    <v-list-item :key="i + 6473"
                      >
                      <v-list-item-avatar>
                        <v-icon>mdi-music</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{sermon.track}}
                        </v-list-item-title>
                        <!-- <v-list-item-subtitle>
                          Length - 12:23
                        </v-list-item-subtitle> -->
                      </v-list-item-content>
                      <v-list-item-action>
                        
                        <!-- <v-icon>mdi-pencil</v-icon> -->
                        <v-btn icon>
                          <v-icon @click="deleteSermon(sermon, item.docId)">mdi-delete</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>

                    <v-divider :key="i"></v-divider>


                  </template>
                </v-list>
              </v-card-text>
            </div>
          </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      v-model="new_series_dialog"
      scrollable :fullscreen="$vuetify.breakpoint.xsOnly"
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition" >
      <v-card>
        <v-toolbar color="grey lighten-4 text-capitalize" flat>
          {{action}} Series
          <v-spacer></v-spacer>
          <v-btn text icon @click="new_series_dialog = false"
            :disabled="loading1">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="mt-3">
          <v-text-field
            name="title" outlined
            label="Title*"
            v-model="form1.title"
          ></v-text-field>

          <v-text-field
            name="author" outlined
            label="Author*"
            v-model.trim="form1.author"
          ></v-text-field>

          <v-text-field
            name="date" outlined
            label="Date" type="date"
            v-model.trim="form1.date"
          ></v-text-field>

          <v-textarea name="desc" cols="30" 
            label="Description" rows="10" 
            outlined v-model.trim="form1.description">
          </v-textarea>

          <v-file-input
            
            accept="image/png, image/jpeg, image/bmp"
            outlined v-model="cover_image"
            prepend-icon="" append-icon="mdi-image"
            label="Cover image" persistent-hint
            hint="Recommended cover image dimensions - 600 X 300"
          ></v-file-input>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="info" depressed 
            @click="saveSeries"
            :disabled="!!disabled1"
            :loading="loading1">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="new_sermon_dialog"
      scrollable :fullscreen="$vuetify.breakpoint.xsOnly"
      persistent :overlay="false"
      max-width="500px"
      transition="dialog-transition">
      <v-card>
        <v-toolbar color="grey lighten-4" flat>
          Add Sermon
          <v-spacer></v-spacer>
          <v-btn text icon @click="new_sermon_dialog = false"
            :disabled="loading2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="mt-3">
          <v-text-field
            name="track" outlined
            label="Track*"
            v-model="form2.track"
          ></v-text-field>

          <v-text-field
            name="track_number" outlined
            label="Track Number"
            v-model.trim="form2.track_number"
          ></v-text-field>

          <v-file-input
            
            accept="audio/mp3, audio/amr"
            outlined v-model="form2.audio_file"
            label="Audio file" append-icon="mdi-file-music"
            prepend-icon=""
          ></v-file-input>

          <!-- <audio :src="form2.audio_file"></audio> -->

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="info" depressed 
            @click="addSermon"
            :disabled="!!disabled2"
            :loading="loading2">Upload</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { firebase, db } from "@/plugins/firebase"

export default {
  head(){
    return {
      title: this.title
    }
  },
  data(){
    return {
      show: [],
      new_series_dialog: false,
      new_sermon_dialog: false,
      action: 'edit',
      loading1: false,
      loading2: false,
      form1: {
        title: '',
        description: '',
        author: '',
        date: '',
        cover_image: [],
        date_created: ''
      },
      form2: {
        track: '',
        track_number: '',
        audio_file: []
      },
      cover_image: null,
      rules: [
        value => !value || value.size < 2000000 || 'Cover image size should be less than 2 MB!',
      ],
      series: [],
      selected_series: {},
      defaultSeriesItem: {
        title: '',
        description: '',
        author: '',
        date: '',
        cover_image: '',
        date_created: ''
      }
    }
  },
  watch: {
    new_series_dialog(to, from) {
      if (to && this.action == 'edit') {
        Object.assign(this.form1, this.selected_series)
      }
      if (!to) {
        this.form1 = this.defaultSeriesItem
      }
    }
  },
  computed: {
    disabled1(){
      return !this.form1.title || 
      !this.form1.author
    },
    disabled2(){
      return !this.form2.track ||
      !this.form2.track_number ||
      !this.form2.audio_file
    },
    title(){
      return 'Admin - TSG Media'
    }
  },
  methods: {
    initialize(){
      this.getSeries()
    },
    async saveSeries(){

      this.loading1 = true
      const _this = this
      // Array.from([this.form1.cover_image]).map(file => console.log({file}))
      async function upload () {
        return _this.$helpers.fileUploader(
          [_this.cover_image],
          // path: `series/${this.form1.title.split(' ').join('-')}`,
          // file_name: ['cover_image']
        )
      }

      let uploaded = this.cover_image ? await upload() :
        [this.form1.cover_image]
      

      // save record to db
      let docRef = this.action == 'edit' ?
        db.collection('series').doc(this.selected_series.docId) :
        db.collection('series').doc()
        
      docRef.set({
        title: this.form1.title,
        description: this.form1.description,
        docId: docRef.id,
        author: this.form1.author,
        date: this.action == 'edit' ? this.selected_series.date : this.form1.date,
        cover_image: uploaded[0],
        date_created: this.action == 'edit' ? this.selected_series.date_created : Date.now(),
      }).then(d => {

        this.$eventBus.$emit('Snackbar', {
          message: 'Operation successful',
          show: true,
          color: 'success'
        })

        this.loading1 = false
        this.new_series_dialog = false
      }).catch(err => {

        // console.log(err)

        this.loading1 = false;
        this.$eventBus.$emit('Snackbar', {
          message: 'Something went wrong',
          show: true,
          color: 'error'
        })
      })
    },
    async addSermon(){
      this.loading2 = true
      // console.log(this.form2.audio_file)

      let uploaded = await this.$helpers.upload({
        files: [this.form2.audio_file],
        path: `series/${this.selected_series.title.split(' ').join('-')}/${this.form2.track.split(' ').join('-')}`
      })

      db.collection('series').doc(this.selected_series.docId)
      .update({
        sermons: firebase.firestore.FieldValue.arrayUnion({
          track: this.form2.track,
          track_number: this.form2.track_number,
          audio_file: uploaded[0],
          size: this.form2.audio_file.size,
          date_created: Date.now()
        })
      }).then(d => {

        this.$eventBus.$emit('Snackbar', {
          message: 'Sermon added',
          show: true,
          color: 'success'
        })

        this.loading2 = false
        this.new_sermon_dialog = false
      }).catch(err => {

        // console.log(err)

        this.loading2 = false;
        this.$eventBus.$emit('Snackbar', {
          message: 'Something went wrong',
          show: true,
          color: 'error'
        })
      })


    },
    showTracks(docId){
      this.show.find(a => a == docId) ? 
      this.show.splice(this.show.indexOf(docId,1)) : 
      this.show.push(docId)
      
    },
    
    getSeries(){
      db.collection('series')
      .orderBy('date_created','desc')
      .onSnapshot(docs => {
        let arr = []
        docs.forEach(doc => arr.push(doc.data()))
        this.series = arr
      })

    },
    deleteSermon(sermon, seriesId){
      let yes = confirm('Are you sure you want to delete this sermon ?')
      // console.log(seriesId)

      if(yes){

        db.collection('series').doc(seriesId)
        .update({
          sermons: firebase.firestore.FieldValue.arrayRemove(
            sermon
          )
        }).then(d => {

          this.$eventBus.$emit('Snackbar', {
            message: 'Sermon removed',
            show: true,
            color: 'success'
          })

        }).catch(err => {

          // console.log(err)

          // this.loading2 = false;
          this.$eventBus.$emit('Snackbar', {
            message: 'Operation failed',
            show: true,
            color: 'error'
          })
        })
      }
    }
  },
  mounted(){
    firebase.auth().onAuthStateChanged(user =>{
      if (user) {
        
        // this.$store.dispatch('setUser', user)
        this.initialize()
        
        let returnTo = this.$route.query.returnTo
        
        if(returnTo){
          this.$router.push(returnTo)
        }

      } else {
        this.$router.push('/login')
        // No user is signed in.
      }
    })
    
  }
}

</script>

<style>

</style>