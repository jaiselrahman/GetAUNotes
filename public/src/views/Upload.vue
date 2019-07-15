<template>
  <div>
    Welcome to upload page
    <br>
    <v-btn round small color="primary" @click="signOut()">SignOut</v-btn>
    <br>
    <br>
    <input style="background:blue" ref="inputUpload" type="file" @change="onFileSelected">
    <v-btn color="primary" @click="$refs.inputUpload.click()">Selected File</v-btn>
    <br>
    <br>
    <v-list v-show="files.length > 0">
      <file-uploader
        v-for="file in files"
        :key="file.name"
        :file="file"
        path="/department/rev/year/sub"
      />
    </v-list>
  </div>
</template>

<script>
import firebase from "@/firebase";
import FileUploader from "@/components/FileUploader";

export default {
  name: "upload",
  components: {
    FileUploader
  },
  data() {
    return {
      files: []
    };
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/");
        });
    },
    onFileSelected(e) {
      this.files = [...this.files, ...e.target.files];
    }
  }
};
</script>
