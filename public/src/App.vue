<template>
  <v-app id="app">
    <div id="nav">
      <v-toolbar dark color="primary">
        <v-toolbar-icon>
          <v-btn v-if="$route.name !== 'home'" @click="$router.go(-1)" icon>
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-btn v-else title="Home" flat icon to="/">
            <v-icon>home</v-icon>
          </v-btn>
        </v-toolbar-icon>
        <v-toolbar-title pa-3 v-ripple>
          <router-link pa-3 style="color: inherit;text-decoration: inherit;" to="/">ShareNotes</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn title="Notification" flat icon to="/notification">
            <v-icon v-if="notify">notifications</v-icon>
            <v-icon v-else>notifications_off</v-icon>
          </v-btn>
          <v-btn title="Upload" flat icon to="/upload">
            <v-icon>cloud_upload</v-icon>
          </v-btn>
          <v-btn title="Signout" flat icon @click="signOut" v-if="isSignedIn">
            <v-icon>exit_to_app</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
    <router-view :is-signed-in="isSignedIn" :key="$route.path"/>
  </v-app>
</template>

<script>
import firebase from "@/firebase";

export default {
  data() {
    return {
      notify: localStorage.notify,
      isSignedIn: firebase.auth().currentUser === null
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(u => {
      this.isSignedIn = !!u && u.currentUser !== null;
    });
  },
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