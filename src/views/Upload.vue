<template>
    <div  class="window-height window-width row justify-center items-center" :style="{backgroundSize: 'cover', backgroundImage: 'url(' + require('@/background.jpg') + ')' }"
    style="background: linear-gradient(135deg,  #151515  0%,#282828 100%)">
      <div class="column">
      <div class="row">
        <q-card square dark class="q-pa-md q-ma-none no-shadow bg-grey-10" style="width:60vw;">
          <q-card-section class="q-mt-xl q-mb-md">
            <p class="text-center text-weight-bolder text-white">Upload Your Music</p>
          </q-card-section>
          <q-card-section color="white">
            <q-file rounded outlined bottom-slots v-model="file" label="Music" counter max-files="12" bordercolor="white" @change="selectedFile" id="file">
              <template color="white" v-slot:before >
                <q-icon name="attachment" color="white"/>
              </template>

              <template v-slot:append color="white">
                <q-icon v-if="file !== null" name="close" @click.stop="file = null" class="cursor-pointer" color="white"/>
                <q-icon name="search" @click.stop color="white" />
              </template>

              <!-- <template v-slot:hint id="form">
                Field hint
              </template> -->
            </q-file>
          </q-card-section>
          <q-card-actions>
            <div class="row  items-center full-width">
              <div class="col-12">
                <q-btn outline rounded size="md" color="red-4" class="text-white full-width" label="Upload File" type="submit" @click="submitFile" style="width:50%"/>
              </div>
            </div>
          </q-card-actions>
          <q-card-section style="height:10%;">
            <p class="text-center text-caption text-weight-light text-grey">Created by AMG</p>
          </q-card-section>
          <q-card-section class="row justify-center full-width">
            <img
            src="@/logo.png"
            spinner-color="white"
            style="width:30%;"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>

    </div>
</template>
<script>
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';//'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
export default {
  data () {
    return {
      file : null,
      result : "Nothing",
      formData : null,
    }
  },
  methods : {
    selectedFile(){
      // 選択された File の情報を保存しておく
      this.file = this.$refs.file.files[0]
    },
    async submitFile(){
      if(this.file)
      {
        this.formData = new FormData();
        this.formData.append('file', this.file);

        let config = {
          headers: {
            'content-type': 'multipart/form-data',
          }
        };

        await axios.post(
          //"http://34.68.147.55:80/predict",
          "https://atsu-musicgenre.ddo.jp/predict",
          this.formData,
          config
        )
        .then(res => this.result = res.data.genre)
        .catch(err => this.result = err);

        //console.log(this.result)

        this.$router.push({name: 'result', params: {res: this.result}})

      } 
    }

  }
}
</script>

<style>
  .q-field--outlined .q-field__control:before {
    border: 1px solid rgba(255,255,255);
  }
  .q-field__native{
    color: white;
  }
  .q-field__label{
    color: white;
  }
  .q-field__messages{
    color: white;
  }
  .q-field__counter{
    color: white;
  }
</style>