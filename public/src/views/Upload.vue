<template>
  <div>
    <v-layout justify-center column>
      <v-card-title primary-title>Select the subject to upload files</v-card-title>
      <select-group @group-selected="onGroupSelected"></select-group>
      <input ref="inputUpload" type="file" @change="onFileSelected" v-show="false" multiple>
      <v-flex md8 text-xs-center>
        <v-btn
          color="primary"
          full-width
          @click="$refs.inputUpload.click()"
          :disabled="!path"
        >Select Files</v-btn>
      </v-flex>
    </v-layout>
    <br>
    <v-list v-show="files.length > 0">
      <file-uploader v-for="file in files" :key="file.name" :file="file" :path="path"/>
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
      path: null
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
    onGroupSelected(grp) {
      if (grp === null) {
        this.path = null;
      } else {
        this.path = `${grp.department}/${grp.year}/${grp.regulation}/${
          grp.subject
        }`;
      }
    }
  }
};
</script>
