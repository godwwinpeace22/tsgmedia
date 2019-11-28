'use strict'
import {storage} from '../plugins/firebase'
export default {
  truncateText(text, length=18){
    return typeof text === 'string' ?
      text.length > length ?
      text.substr(0, length) + '...' :
      text :
      text
  },
  trigFileSelector(type='img'){
    type == 'video' ? 
    document.getElementById('video_selector').click() :
    document.getElementById('img_selector').click()
  },
  parseDate(timestamp, show_date=false){
    // show_date is used to control which type of date to return - full date or only time
    // USING CLIENT TIME. MAYBE USE SERVER TIME ?
    let d = new Date(timestamp)
    let now = Date.now()
    let diff = now - timestamp

    let one_sec = 1000
    let one_min = one_sec * 60
    let one_hour = one_min * 60
    let one_day = one_hour * 24

    let options = {hour:'numeric', minute:'numeric' };
    let options2 = {
      weekday: 'short',
      day: 'numeric',
      year: 'numeric', 
      month: 'short', 
      hour:'numeric', 
      minute:'numeric'
    }
  
    if(diff < 1000){
      return 'just now'
    }
    if(diff > one_sec && diff < one_min){
      return 'a few seconds ago'
    }
    if(diff > one_min && diff < one_hour){
      return Math.floor(diff / one_min) + ' minutes ago'
    }
    if(diff >= one_hour && diff < 2 * one_hour){
      return 'an hour ago'
    }
    if(diff > one_hour && diff < one_day){
      return Math.floor(diff/one_hour)  + ' hours ago'
    }
    if(diff > one_day && diff < one_day * 2){
      return 'yesterday, ' + d.toLocaleString("en-US",options)
    }
    if(diff >= one_day * 2 && diff < one_day * 3){
      return '2d ago at ' + d.toLocaleString("en-US", show_date ? options2 : options)
    }
    return d.toLocaleString("en-US", show_date ? options2 : options)
  },
  async fileUploader(files,preset){
    // console.log(files, preset)
    try {
      let clUrl = `https://api.cloudinary.com/v1_1/unplugged/upload`
      let formData = new FormData()
      let uploaded = []
      for(let file of files){
        formData.append('file', file)
        formData.append('upload_preset', 'z2dkl6nx')

        let response = await axios.post( clUrl,
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
        )

        uploaded.push(response.data.secure_url)
      }
      // eslint-disable-next-line
      console.log(uploaded)
      return uploaded
    } catch (error) {
      // eslint-disable-next-line
      console.log(error)
      alert('Image upload failed')
      throw new Error(error || error.response)
      
    }
  },
  /**
   * Upload files to storage
   * @param options file upload options
   * @returns String fd
   */
  upload(options){
    return new Promise((resolve, reject ) => {
      
      try {
        
        let {files, path, file_names=false } = options
        
        Promise.all(
          
          Array.from(files).map((file, index) => uploadOne(file,index))

        ).then((urls) => {

          resolve(urls)
          
        }).catch((error) => {

          reject(error)
          
        });
        
        function uploadOne(file,index) {
          
          return storage.ref(`${path}/${file_names ? file_names[index] : file.name}`).put(file)
          .then(async (snapshot) => {
            
            // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              
            // $store.dispatch('uploadProgress', {
            //   progress: Math.round(progress * 100) / 100,
            //   no_of_files: files.length,
            //   no_uploaded: index + 1,
            //   no_remaining: files.length - index -1
            // })
            return await snapshot.ref.getDownloadURL()

          }).catch((error) => {
            // console.log(error)
          });
        }

      } catch (error) {
        reject(error)
        // console.log(error)
      }
    })
  },
}

import axios from 'axios'