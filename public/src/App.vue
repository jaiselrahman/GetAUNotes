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
          <router-link pa-3 style="color: inherit;text-decoration: inherit;" to="/">GetAUNotes</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn title="Notification" flat icon to="/notification">
            <v-icon v-if="notify">notifications</v-icon>
            <v-icon v-else>notifications_off</v-icon>
          </v-btn>
          <v-btn title="New Subject" flat icon to="/new-subject" v-if="$route.name === 'upload'">
            <v-icon>add</v-icon>
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

    <v-layout key="progress" v-show="$global.loading" justify-center align-center fill-height full-width>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-layout>

    <router-view
      v-show="!$global.loading"
      :is-signed-in="isSignedIn"
      :key="$route.path"
    />

    <v-snackbar
      v-model="showNotification"
      color="info"
      :timeout="3000"
      :bottom="true"
      :multi-line="true"
    >
      {{ notification.title }}
      <br>
      {{ notification.body }}
      <v-btn flat @click="showNotification = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import firebase from "@/firebase";

export default {
  data() {
    return {
      notify: localStorage.notify,
      isSignedIn: firebase.auth().currentUser === null,
      showNotification: false,
      notification: {
        title: "",
        body: ""
      }
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(u => {
      this.isSignedIn = !!u && u.currentUser !== null;
    });
    firebase.messaging().onMessage(event => {
      this.notification = {
        title: event.data.title,
        body: event.data.body
      };
      this.showNotification = true;
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