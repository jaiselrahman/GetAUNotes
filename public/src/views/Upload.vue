<template>
  <div>
    Welcome to upload page
    <br>
    <v-btn round small color="primary" @click="signOut()">SignOut</v-btn>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: "upload",
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/");
        });
    }
  }
};
</script>
