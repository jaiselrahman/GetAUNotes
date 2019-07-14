<template>
  <v-app id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/sign-in">SignIn</router-link>
    </div>
    <router-view/>
  </v-app>
</template>
