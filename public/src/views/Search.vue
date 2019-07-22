<template>
  <v-layout justify-center pt-3>
    <v-flex sm8 md6>
      <v-text-field v-model="q" append-icon="search" @keyup.enter="search" label="Search" solo></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Search",
  props: {
    q: String,
    notes: Array
  },
  methods: {
    search() {
      if (!this.q) return;
    }
  }
};
</script>
