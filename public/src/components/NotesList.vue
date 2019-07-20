<template>
  <v-container grid-list-md>
    <v-layout v-bind="binding" row wrap>
      <v-flex sm6 md4 v-for="note in notes" :key="note.id" mb-2>
        <v-card>
          <v-card-title style="padding: 1em 1em 0.5em 1em">
            <div class="text-truncate">{{ note.name }}</div>
          </v-card-title>
          <v-card-text style="padding: 0.5em 1em 0.5em 1em">
            <v-layout row align-center>
              <v-chip fill-height small>{{ note.size }}</v-chip>
              <v-chip fill-height small>{{ note.type }}</v-chip>
              <v-spacer></v-spacer>
              <v-btn flat icon color="primary">
                <a style="text-decoration: none" :href="note.url">
                  <v-icon>cloud_download</v-icon>
                </a>
              </v-btn>
              <v-btn flat icon color="error" v-if="showDelete">
                <a style="text-decoration: none">
                  <v-icon>delete</v-icon>
                </a>
              </v-btn>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "NotesList",
  props: {
    notes: Array,
    showDelete: Boolean
  },
  computed: {
    binding() {
      const binding = {};

      if (this.$vuetify.breakpoint.xs) {
        binding.column = true;
      }

      return binding;
    }
  }
};
</script>
