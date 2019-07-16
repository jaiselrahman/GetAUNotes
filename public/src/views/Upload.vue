<template>
  <div>
    Welcome to upload page
    <br>
    <v-btn round small color="primary" @click="signOut()">SignOut</v-btn>
    <br>
    <br>
    <select-group @group-selected="onGroupSelected"></select-group>
    <v-layout justify-center column>
      <input ref="inputUpload" type="file" @change="onFileSelected" v-show="false" multiple>
      <v-flex md8 text-xs-center>
        <v-btn color="primary" full-width @click="$refs.inputUpload.click()">Select Files</v-btn>
      </v-flex>
    </v-layout>

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
import SelectGroup from "@/components/SelectGroup";

export default {
  name: "upload",
  components: {
    FileUploader,
    SelectGroup
  },
  data() {
    return {
      files: [],
      group: String
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
    },
    onGroupSelected(g) {
      console.log(g);
    }
  }
};
</script>
