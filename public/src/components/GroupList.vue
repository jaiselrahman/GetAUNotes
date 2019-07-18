<template>
  <v-container grid-list-xl>
    <v-layout v-bind="binding">
      <v-flex ma-2 v-for="group in groups" :key="group.id">
        <router-link style="text-decoration: none" :to="basePath + '/' + group.id">
          <v-card>
            <v-layout row pl-3 pr-3>
              <v-card-title primary-title>{{ group.name }}</v-card-title>
              <v-spacer></v-spacer>
              <v-icon large>chevron_right</v-icon>
            </v-layout>
          </v-card>
        </router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "GroupList",
  props: {
    groups: Array,
    basePath: String
  },
  computed: {
    binding() {
      const binding = {};

      if (this.$vuetify.breakpoint.xs) {
        binding.column = true;
      } else {
        binding.class = "justify-space-around";
      }

      return binding;
    }
  }
};
</script>
