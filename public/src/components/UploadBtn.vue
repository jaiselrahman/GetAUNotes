<template>
  <router-link v-if="isSignedIn" to="/upload">Upload</router-link>
  <router-link v-else to="/sign-in">SignIn</router-link>
</template>

<script>
export default {
  name: "uploadBtn",
  props: {
    isSignedIn: Boolean
  }
};
</script>
