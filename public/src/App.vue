<template>
  <v-app id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>&nbsp;
      <upload-btn :isSignedIn="isSignedIn"/>
    </div>
    <router-view/>
  </v-app>
</template>

<script>
import firebase from "@/firebase";

import UploadBtn from "./components/UploadBtn.vue";

export default {
  components: {
    UploadBtn
  },
  data() {
    return {
      isSignedIn: firebase.auth().currentUser === null
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(u => {
      this.isSignedIn = !!u && u.currentUser !== null;
    });
  }
};
</script>
