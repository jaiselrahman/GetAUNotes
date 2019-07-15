<template>
  <v-card mt-1 mb-1>
    <v-layout align-center justify-center pa-1>
      <v-flex xs2 text-xs-center>{{ file.name }}</v-flex>
      <v-flex xs8>
        <v-progress-linear :value="progress"></v-progress-linear>
      </v-flex>

      <v-flex xs2 text-xs-center>
        <v-icon
          color="error"
          @click="cancel"
          v-if="status === UPLOAD_STATE.UPLOADING || status === UPLOAD_STATE.CANCELLED"
          :disabled="status === UPLOAD_STATE.CANCELLED"
        >remove_circle</v-icon>

        <v-progress-circular
          indeterminate
          color="error"
          v-else-if="status == UPLOAD_STATE.CANCELLING"
        ></v-progress-circular>

        <v-icon color="success" v-else-if="status === UPLOAD_STATE.SUCCESS">check_circle</v-icon>

        <v-icon
          color="error"
          v-else-if="status === UPLOAD_STATE.FAILED"
          title="Upload Failed! Try again later"
        >error_circle</v-icon>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import firebase from "@/firebase";

export default {
  name: "FileUpoader",
  props: {
    path: String,
    file: [File, Blob]
  },
  data() {
    return {
      progress: 0,
      uploadTask: null,
      UPLOAD_STATE: {
        UPLOADING: "uploading",
        CANCELLED: "cancelled",
        CANCELLING: "cancelling",
        SUCCESS: "success",
        FAILED: "failed"
      },
      status: ''
    };
  },
  mounted() {
    this.status = this.UPLOAD_STATE.UPLOADING
    const filePath = this.path + "/" + this.file.name;
    this.uploadTask = firebase
      .storage()
      .ref()
      .child(filePath)
      .put(this.file);

    this.uploadTask.on(
      "state_changed",
      s => {
        this.progress = (s.bytesTransferred / s.totalBytes) * 100;
      },
      e => {
        if (e.code === "storage/canceled") {
          this.status = this.UPLOAD_STATE.CANCELLED;
        } else {
          this.status = this.UPLOAD_STATE.FAILED;
          console.log(e);
        }
      },
      () => {
        this.status = this.UPLOAD_STATE.SUCCESS;
      }
    );
  },
  methods: {
    cancel() {
      this.status = this.UPLOAD_STATE.CANCELLING;
      this.uploadTask.cancel();
    }
  }
};
</script>
